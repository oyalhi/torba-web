import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const dexieRequestObject = {
    grant_type: "client_credentials",
    scopes: ["ACCESS_DB"],
    client_id: process.env.NEXT_PUBLIC_DEXIE_CLOUD_CLIENT_ID!,
    client_secret: process.env.NEXT_PUBLIC_DEXIE_CLOUD_CLIENT_SECRET!,
    claims: {
      sub: "omer@yalhi.com",
      email: "omer@yalhi.com",
      name: "omer@yalhi.com",
    },
  };

  const token = request.nextUrl.searchParams.get("token");
  console.log({ token });

  let isValidToken = false;

  try {
    const response = await fetch("https://zr6vo0wn9.dexie.cloud/token/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: "http://localhost:3000",
      },
    });

    if (response.ok) {
      // If the Content-Type is application/json, parse it as JSON
      const contentType = response.headers.get("Content-Type") || "";

      if (contentType.includes("application/json")) {
        const responseJson = await response.json();
        isValidToken = true;
        console.log("success:", responseJson);
      } else {
        const responseText = await response.text();
        console.log("Response not JSON:", responseText);
      }
    } else {
      const errorText = await response.text();
      console.error("Error response:", errorText);
    }
  } catch (error) {
    console.error("error:", error);
  }

  if (!isValidToken) {
    return new Response(
      JSON.stringify({
        error: "Invalid token",
      }),
      {
        status: 401,
      }
    );
  }

  try {
    const response = await fetch("https://zr6vo0wn9.dexie.cloud/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dexieRequestObject),
    });
    const responseJson = await response.json();
    console.log("success:", responseJson);
  } catch (error) {
    console.error("error:", error);
  }

  return new Response(
    JSON.stringify({
      params: Object.fromEntries(request.nextUrl.searchParams.entries()),
    })
  );
}
