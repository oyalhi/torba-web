import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "../../../utils/app-config";
import { DexieUserToken, validateToken } from "../../../utils/auth/validate-token";
import { manageSubscriptionStatusChange } from "../../../utils/dexie/dexie-utils";
import {
  getCustomerSubscriptionsWithProducts,
  getOrCreateStripeCustomer,
  getProductsWithPrices,
} from "../../../utils/stripe/stripe-utils";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": appConfig.clientUrl,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: corsHeaders,
  });
}

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
    return new Response(JSON.stringify({ error: message }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  const productsWithPrices = await getProductsWithPrices();

  const customer = await getOrCreateStripeCustomer({
    email: decoded.email,
    metadata: {
      sub: decoded.sub,
      name: decoded.name,
    },
  });

  const { subscribedProduct, subscription } = await getCustomerSubscriptionsWithProducts({ customerId: customer?.id });

  manageSubscriptionStatusChange({ customerId: customer.id, isUpdateBilling: false, subscriptionId: "" });

  return new Response(JSON.stringify({ ...productsWithPrices, subscribedProduct, subscription, customer }), {
    headers: corsHeaders,
  });
}
