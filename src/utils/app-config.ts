import z from "zod";

export const appConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
    secretKey: process.env.STRIPE_SECRET_KEY ?? "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  },
  dexie: {
    dbUrl: process.env.NEXT_PUBLIC_DEXIE_CLOUD_DB_URL ?? "",
  },
  clientUrl: process.env.NEXT_PUBLIC_CLIENT_URL ?? "",
};

const appConfigSchema = z.object({
  clientUrl: z.string(),
  dexie: z.object({
    dbUrl: z.string(),
  }),
  siteUrl: z.string(),
  stripe: z.object({
    publishableKey: z.string(),
  }),
});

appConfigSchema.parse(appConfig);
