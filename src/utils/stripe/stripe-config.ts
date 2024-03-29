import Stripe from "stripe";
import { appConfig } from "../app-config";

export const stripe = new Stripe(appConfig.stripe.secretKey, {
  // https://github.com/stripe/stripe-node#configuration
  // https://stripe.com/docs/api/versioning
  // @ts-ignore
  apiVersion: null,
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: "Torba Split Cose",
    version: "0.0.0",
    url: "https://github.com/oyalhi/torba-web",
  },
});
