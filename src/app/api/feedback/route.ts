import { messages } from "mailgun-js";
import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "../../../utils/app-config";
import { mailgunClient } from "../../../utils/mailgun-config";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": appConfig.clientUrl,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  let requestBody: { appId?: string; feedback?: string; currentUserId?: string };

  try {
    requestBody = await request.json();
    if (!requestBody.appId || !requestBody.feedback || !requestBody.currentUserId) {
      throw new Error("appId, currentUserId and feedback are required");
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "appId, currentUserId and feedback are required" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const { feedbackEmail, adminEmail } = appConfig.mailgun;

  const sendData: messages.SendData = {
    from: adminEmail,
    text: JSON.stringify(requestBody, null, 2),
    subject: `New feedback received for ${requestBody.appId}`,
    to: feedbackEmail,
  };

  console.log("sending email");

  const sendEmailPromise = new Promise((resolve, reject) => {
    mailgunClient.messages().send(sendData, (error, body) => {
      if (body) {
        resolve(body);
      }

      if (error) {
        reject(error);
      }
    });
  });

  await sendEmailPromise;

  return new Response(JSON.stringify({ message: "ok" }), {
    status: 200,
    headers: corsHeaders,
  });
}
