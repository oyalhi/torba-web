import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "../../../utils/app-config";
import { DexieUserToken, validateToken } from "../../../utils/auth/validate-token";
import { stripe } from "../../../utils/stripe/stripe-config";
import { getOrCreateStripeCustomer } from "../../../utils/stripe/stripe-utils";

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

export async function POST(request: NextRequest) {
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

  const customer = await getOrCreateStripeCustomer({
    email: decoded.email,
    metadata: {
      sub: decoded.sub,
      name: decoded.name,
    },
  });

  if (!customer) {
    return new Response(JSON.stringify({ error: "Failed to get or create Stripe customer" }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${appConfig.clientUrl}/account?success=true`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: corsHeaders,
  });
}
