import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { appConfig } from "../../../utils/app-config";
import { DexieUserToken, validateToken } from "../../../utils/auth/validate-token";
import { stripe } from "../../../utils/stripe/stripe-config";
import { getOrCreateStripeCustomer, getProductsWithPrices } from "../../../utils/stripe/stripe-utils";

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

  let requestBody: { priceId?: string; redirectUrl?: string };

  try {
    requestBody = await request.json();
    if (!requestBody.priceId || !requestBody.redirectUrl) {
      throw new Error("priceId and redirectUrl are required");
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "priceId and redirectUrl are required" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const { priceId, redirectUrl } = requestBody;

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

  const productsWithPrices = await getProductsWithPrices();

  const price = productsWithPrices.productsWithPrices
    .flatMap((product) => product.prices)
    .find((p) => p.id === priceId);

  if (!price) {
    return new Response(JSON.stringify({ error: "Price not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let params: Stripe.Checkout.SessionCreateParams = {
    allow_promotion_codes: true,
    billing_address_collection: "required",
    customer: customer.id,
    customer_update: {
      address: "auto",
    },
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    cancel_url: `${redirectUrl}?canceled=true`,
    success_url: `${redirectUrl}?success=true`,
    mode: price.type === "recurring" ? "subscription" : "payment",
  };

  let session;
  try {
    session = await stripe.checkout.sessions.create(params);
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: message, url: redirectUrl }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  return new Response(JSON.stringify({ url: session.url }), {
    headers: corsHeaders,
  });
}
