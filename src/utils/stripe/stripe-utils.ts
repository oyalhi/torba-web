import Stripe from "stripe";
import { stripe } from "./stripe-config";

export async function getStripeCustomerByEmail(email: string) {
  const customers = await stripe.customers.list({ email });
  return customers.data[0];
}

export async function createStripeCustomer(data: { email: string; metadata: { sub: string; name: string } }) {
  const newCustomer = await stripe.customers.create(data);
  if (!newCustomer) {
    throw new Error("Failed to create Stripe customer");
  }
  return newCustomer;
}

export async function getCustomerById(customerId: string) {
  return stripe.customers.retrieve(customerId);
}

export async function getOrCreateStripeCustomer(data: { email: string; metadata: { sub: string; name: string } }) {
  return getStripeCustomerByEmail(data.email) ?? createStripeCustomer(data);
}

interface ProductWithPrices extends Stripe.Product {
  prices: Stripe.Price[];
}

export async function getProductsWithPrices() {
  const products = await stripe.products.list({
    active: true,
  });

  const productsWithPrices: ProductWithPrices[] = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({
        active: true,
        product: product.id,
      });

      return {
        ...product,
        prices: prices.data,
      };
    })
  );

  const intervals = Array.from(
    new Set(
      productsWithPrices.flatMap((product) =>
        product.prices.filter((p) => p.recurring != null).map((price) => price.recurring!.interval)
      )
    )
  );

  return { productsWithPrices, intervals };
}

export async function getCustomerSubscriptionsWithProducts({ customerId }: { customerId: string }) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
  });

  const customerSubscriptions = subscriptions.data.filter((s) => s.customer === customerId);

  if (customerSubscriptions.length > 1) {
    throw new Error("More than one subscription found for customer");
  }

  const subscription = customerSubscriptions[0];

  if (!subscription) {
    return { subscription: null, subscribedProduct: null };
  }

  const productsWithPrices = await Promise.all(
    subscription.items.data.map(async (item) => {
      const price = await stripe.prices.retrieve(item.price.id);
      const product = await stripe.products.retrieve(price.product as string);

      return {
        ...product,
        prices: [price],
      };
    })
  );

  if (productsWithPrices.length > 1) {
    throw new Error("More than one product found for subscription");
  }

  return { subscription, subscribedProduct: productsWithPrices[0] };
}
