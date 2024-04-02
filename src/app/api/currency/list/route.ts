import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "../../../../utils/app-config";
import { validateToken } from "../../../../utils/auth/validate-token";

const apiKey = process.env.FAST_FOREX_API_KEY!;
const baseUrl = process.env.FAST_FOREX_API_BASE_URL!;

export interface Currency {
  code: string;
  name: string;
}

export interface CurrencyListResponse {
  currencies: Currency[];
}

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

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization") ?? "";
    await validateToken(authHeader);
  } catch (error) {
    let message = "An unknown error occurred";
    if (typeof error === "string") {
      message = error;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return new Response(JSON.stringify({ error: message }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  const response = await fetch(`${baseUrl}/currencies?api_key=${apiKey}`, {
    method: "GET",
  });

  const responseJson: CurrencyListResponse = await response.json();
  return Response.json(responseJson.currencies, { headers: corsHeaders });
}
