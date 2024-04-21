import z from "zod";

export const appConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  },
  clientUrl: process.env.NEXT_PUBLIC_CLIENT_URL ?? "",
};

const appConfigSchema = z.object({
  clientUrl: z.string(),
  siteUrl: z.string(),
  stripe: z.object({
    publishableKey: z.string(),
  }),
});

appConfigSchema.parse(appConfig);
