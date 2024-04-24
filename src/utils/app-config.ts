import z from "zod";

export const appConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  },
  clientUrl: process.env.NEXT_PUBLIC_CLIENT_URL ?? "",
  legal: {
    privacyPolicyUrl: process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL ?? "",
  },
  demoUrl: process.env.NEXT_PUBLIC_DEMO_URL ?? "",
};

const appConfigSchema = z.object({
  demoUrl: z.string(),
  clientUrl: z.string(),
  siteUrl: z.string(),
  stripe: z.object({
    publishableKey: z.string(),
  }),
});

appConfigSchema.parse(appConfig);
