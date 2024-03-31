import { jwtDecode } from "jwt-decode";
import { appConfig } from "../app-config";

export interface DexieUserToken {
  email: string;
  email_verified: boolean;
  scopes: string[];
  name: string;
  rl: string;
  userType: string;
  origin: string;
  license: string;
  sub: string;
  iat: number;
  nbf: number;
  exp: number;
  aud: string[];
  iss: string;
}

export async function validateToken(authHeader: string) {
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    throw new Error("No token provided");
  }

  let isValidToken = false;

  try {
    const response = await fetch(`${appConfig.dexie.dbUrl}/token/validate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: appConfig.clientUrl,
      },
    });

    if (response.ok) {
      const contentType = response.headers.get("Content-Type") || "";

      if (contentType.includes("application/json")) {
        const responseJson = await response.json();
        isValidToken = true;
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
    throw new Error("Invalid token");
  }

  const decoded = jwtDecode<DexieUserToken>(token);
  return decoded;
}
