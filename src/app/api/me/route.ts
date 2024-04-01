import { NextRequest } from "next/server";
import { DexieUserToken, validateToken } from "../../../utils/auth/validate-token";
import { getOrCreateStripeCustomer } from "../../../utils/stripe/stripe-utils";

export async function GET(request: NextRequest) {
  let decoded: DexieUserToken;

  try {
    const authHeader = request.headers.get("Authorization") ?? "";
    decoded = await validateToken(authHeader);
  } catch (error) {
    let message = "An unknown error occurred";
    if (typeof error === "string") {
      message = error;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return new Response(JSON.stringify({ error: message }), { status: 401 });
  }

  // get stripe customer by email
  const stripeCustomer = await getOrCreateStripeCustomer({
    email: decoded.email,
    metadata: {
      sub: decoded.sub,
      name: decoded.name,
    },
  });

  const dexieRequestObject = {
    grant_type: "client_credentials",
    scopes: ["ACCESS_DB"],
    client_id: process.env.NEXT_PUBLIC_DEXIE_CLOUD_CLIENT_ID!,
    client_secret: process.env.NEXT_PUBLIC_DEXIE_CLOUD_CLIENT_SECRET!,
    claims: {
      sub: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    },
  };

  try {
    const response = await fetch(`${process.env.DEXIE_CLOUD_DB_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dexieRequestObject),
    });
    const responseJson = await response.json();
    return new Response(JSON.stringify(responseJson), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("error:", error);
  }
}
