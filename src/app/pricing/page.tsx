import { getProductsWithPrices } from "../../utils/stripe/stripe-utils";

export default async function PricingPage() {
  const { productsWithPrices, intervals } = await getProductsWithPrices();

  const isSingleProductNoInterval = productsWithPrices.length === 1 && intervals.length === 0;
  const isSingleProductSingleInterval = productsWithPrices.length === 1 && intervals.length === 1;
  const isSingleProductMultipleIntervals = productsWithPrices.length === 1 && intervals.length > 1;
  const areMultipleProductsSingleInterval = productsWithPrices.length > 1 && intervals.length === 1;
  const areMultipleProductsMultipleIntervals = productsWithPrices.length > 1 && intervals.length > 1;

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
          {productsWithPrices.map((product) => (
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
