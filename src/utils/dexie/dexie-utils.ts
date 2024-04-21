import { jwtDecode } from "jwt-decode";
import Stripe from "stripe";
import { DexieUserToken } from "../auth/validate-token";
import { getCustomerById, getCustomerSubscriptionsWithProducts } from "../stripe/stripe-utils";
export type DexieUserType = "eval" | "prod" | "client";
export interface DexieUser {
  userId: string;
  type: DexieUserType;
  created: string;
  updated: string;
  evalDaysLeft: number;
  maxAllowedEvalDaysLeft: number;
  deactivated: boolean | null;
  lastLogin: string;
  data: any;
}

export async function manageSubscriptionStatusChange({
  customerId,
  isUpdateBilling,
  subscriptionId,
}: {
  subscriptionId: string;
  customerId: string;
  isUpdateBilling: boolean;
}) {
  // get customer from stripe
  const customer = (await getCustomerById(customerId)) as Stripe.Customer | undefined;

  if (!customer || !customer.email) {
    throw new Error("Failed to get Stripe customer or customer email is missing");
  }

  // get customers subscriptions from stripe
  const subscriptions = await getCustomerSubscriptionsWithProducts({ customerId });
  const isSubscribed = !!subscriptions.subscribedProduct;
  const dexieUser = await getDexieUser({ email: customer.email });

  if (!dexieUser) {
    throw new Error("Failed to get Dexie user");
  }

  const isProdUser = dexieUser.type === "prod";

  let newType: DexieUserType | undefined = undefined;

  if (isSubscribed && isProdUser) {
    // do nothing
  } else if (!isSubscribed && !isProdUser) {
    // do nothing
  } else if (isSubscribed && !isProdUser) {
    // convert to prod user
    newType = "prod";
  } else if (!isSubscribed && isProdUser) {
    newType = "eval";
  }

  if (!newType) return;

  const accessToken = await getDexieToken();

  try {
    const response = await fetch(`${process.env.DEXIE_CLOUD_DB_URL}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          userId: dexieUser.userId,
          type: newType,
          data: {
            stripeCustomerId: customer.id,
          },
        },
      ]),
    });

    if (response.ok) {
      console.log("Successfully updated user type");
    } else {
      const errorText = await response.text();
      console.error("Error updating user type:", errorText);
    }
  } catch (error) {
    console.error("error:", error);
  }
}

export async function getDexieUser({ email }: { email: string }) {
  const accessToken = await getDexieToken();

  try {
    const response = await fetch(`${process.env.DEXIE_CLOUD_DB_URL}/users/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const dexieUser: DexieUser = await response.json();
    return dexieUser;
  } catch (error) {
    console.error("error:", error);
  }
}

let cachedAccessToken: string | undefined = undefined;

export async function getDexieToken() {
  if (!isTokenExpired(cachedAccessToken)) {
    return cachedAccessToken;
  }

  const dexieRequestObject = {
    grant_type: "client_credentials",
    scopes: ["ACCESS_DB", "GLOBAL_READ", "GLOBAL_WRITE"],
    client_id: process.env.DEXIE_CLOUD_CLIENT_ID!,
    client_secret: process.env.DEXIE_CLOUD_CLIENT_SECRET!,
  };

  let accessToken: string = "";

  try {
    const response = await fetch(`${process.env.DEXIE_CLOUD_DB_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dexieRequestObject),
    });
    const responseJson = await response.json();
    accessToken = responseJson.accessToken;
  } catch (error) {
    console.error("error:", error);
  }

  if (!accessToken) {
    throw new Error("Failed to get access token");
  }

  cachedAccessToken = accessToken;
  return accessToken;
}

export function isTokenExpired(token?: string): boolean {
  if (!token) return true; // Treat missing token as expired token

  try {
    const decoded: DexieUserToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp <= currentTime; // Returns true if the token has expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat decoding errors as expired token for safety
  }
}
