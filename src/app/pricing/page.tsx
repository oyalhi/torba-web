import Stripe from "stripe";

interface ProductWithPrices extends Stripe.Product {
  prices: Stripe.Price[];
}

export default async function PricingPage() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  const products = await stripe.products.list({
    active: true,
  });

  const productWithPrices: ProductWithPrices[] = await Promise.all(
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

  const subscriptions = await stripe.subscriptions.list({
    status: "active",
  });

  console.log(
    "subscriptions:",
    subscriptions.data.map((s) => s.customer)
  );

  const intervals = Array.from(
    new Set(productWithPrices.flatMap((product) => product.prices.map((price) => price.recurring?.interval)))
  );

  const isSingleProductNoInterval = productWithPrices.length === 1 && intervals.length === 0;
  const isSingleProductSingleInterval = productWithPrices.length === 1 && intervals.length === 1;
  const isSingleProductMultipleIntervals = productWithPrices.length === 1 && intervals.length > 1;
  const areMultipleProductsSingleInterval = productWithPrices.length > 1 && intervals.length === 1;
  const areMultipleProductsMultipleIntervals = productWithPrices.length > 1 && intervals.length > 1;

  return (
    <main style={{ width: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Pricing</h1>
      {isSingleProductNoInterval && (
        <div>
          <p>Single product, no interval</p>
          <p>Product: not implemented</p>
        </div>
      )}
      {isSingleProductSingleInterval && (
        <div>
          <p>Single product, single interval</p>
          <p>Product: not implemented</p>
        </div>
      )}
      {isSingleProductMultipleIntervals && (
        <div>
          {/* <p>Single product, multiple intervals</p> */}
          {productWithPrices.map((product) => (
            <div
              key={product.id}
              style={{
                padding: "4px 8px",
                display: "flex",
                gap: 8,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <h2 style={{ padding: "4px 8px" }}>{product.name}</h2>
              <ul style={{ display: "flex", gap: 8, cursor: "pointer" }}>
                {product.prices
                  .sort((a, b) => ((a.recurring?.interval ?? "") < (b.recurring?.interval ?? "") ? -1 : 1))
                  .map((price) => {
                    const priceString = new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: price.currency,
                      minimumFractionDigits: 0,
                    }).format((price?.unit_amount || 0) / 100);
                    return (
                      <li
                        key={price.id}
                        style={{ border: "1px solid darkgray", borderRadius: "8px", padding: "4px 8px" }}>
                        {priceString} /{price.recurring?.interval}
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      )}
      {areMultipleProductsSingleInterval && (
        <div>
          <p>Multiple products, single interval</p>
          <p>Product: not implemented</p>
        </div>
      )}
      {areMultipleProductsMultipleIntervals && (
        <div>
          <p>Multiple products, multiple intervals</p>
          <p>Product: not implemented</p>
        </div>
      )}
    </main>
  );
}
