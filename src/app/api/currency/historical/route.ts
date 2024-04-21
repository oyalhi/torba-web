import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "../../../../utils/app-config";
import { validateToken } from "../../../../utils/auth/validate-token";

const apiKey = process.env.FAST_FOREX_API_KEY!;
const baseUrl = process.env.FAST_FOREX_API_BASE_URL!;

export interface Currency {
  code: string;
  name: string;
}

export interface CurrencyHistoricalResponse {
  date: string;
  base: string;
  results: {
    [currencyCode: string]: number;
  };
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

  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!date || !from || !to) {
    return new Response(JSON.stringify({ error: "Missing query parameters" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  searchParams.set("api_key", apiKey);

  const response = await fetch(`${baseUrl}/historical?${searchParams.toString()}`, {
    method: "GET",
  });

  const responseJson: CurrencyHistoricalResponse = await response.json();
  return NextResponse.json(responseJson, { headers: corsHeaders });
}
