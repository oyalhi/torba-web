import z from "zod";

const mailgunDomain = process.env.MAILGUN_DOMAIN;

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
  mailgun: {
    adminEmail: process.env.ADMIN_EMAIL ?? "",
    apiKey: process.env.MAILGUN_API_KEY ?? "",
    domain: mailgunDomain ?? "",
    feedbackEmail: process.env.FEEDBACK_EMAIL ?? "",
  },
};

const appConfigSchema = z.object({
  demoUrl: z.string(),
  clientUrl: z.string(),
  siteUrl: z.string(),
  stripe: z.object({
    publishableKey: z.string(),
  }),
  mailgun: z.object({
    adminEmail: z.string().email(),
    apiKey: z.string(),
    domain: z.string(),
    feedbackEmail: z.string().email(),
  }),
});

appConfigSchema.parse(appConfig);
