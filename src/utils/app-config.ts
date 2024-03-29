import z from "zod";

export const appConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  },
};

const appConfigSchema = z.object({
  siteUrl: z.string(),
  stripe: z.object({
    secretKey: z.string(),
    publishableKey: z.string(),
  }),
});

appConfigSchema.parse(appConfig);
