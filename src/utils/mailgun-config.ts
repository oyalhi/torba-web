import mg from "mailgun-js";

import { appConfig } from "./app-config";

const { apiKey, domain } = appConfig.mailgun;

export const mailgunClient = mg({ apiKey, domain });
