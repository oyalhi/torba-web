import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { appConfig } from "../../../utils/app-config";
import { manageSubscriptionStatusChange } from "../../../utils/dexie/dexie-utils";
import { stripe } from "../../../utils/stripe/stripe-config";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

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

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", {
        status: 400,
        headers: corsHeaders,
      });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, {
      status: 400,
      headers: corsHeaders,
    });
  }

  if (!relevantEvents.has(event.type)) {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
      headers: corsHeaders,
    });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription;
        await manageSubscriptionStatusChange({
          subscriptionId: subscription.id,
          customerId: subscription.customer as string,
          isUpdateBilling: event.type === "customer.subscription.created",
        });
        break;

      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        if (checkoutSession.mode === "subscription") {
          const subscriptionId = checkoutSession.subscription;
          await manageSubscriptionStatusChange({
            subscriptionId: subscriptionId as string,
            customerId: checkoutSession.customer as string,
            isUpdateBilling: true,
          });
        }
        break;

      case "customer.created":
        console.log("🔔  Customer created event received.");
        break;

      case "checkout.session.expired":
        console.log("🔔  Checkout session expired event received.");
        break;

      default:
        throw new Error("Unhandled relevant event!");
    }
  } catch (error) {
    console.log(error);
    return new Response("Webhook handler failed. View your Next.js function logs.", {
      status: 400,
      headers: corsHeaders,
    });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: corsHeaders,
  });
}
