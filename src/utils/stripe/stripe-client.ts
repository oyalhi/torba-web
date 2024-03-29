import { loadStripe, Stripe } from "@stripe/stripe-js";
import { appConfig } from "../app-config";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(appConfig.stripe.publishableKey);
  }

  return stripePromise;
};
