import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "./verifyToken.ts";

export async function decodedToken(providedToken?: string) {
  try {
    let decodedToken;
    if (providedToken) {
      decodedToken = jwt.decode(providedToken) as JwtPayload | null;
    } else {
      const token = await verifyToken();
      decodedToken = jwt.decode(token) as JwtPayload | null;
    }

    if (!decodedToken || typeof decodedToken === "string") {
      throw new Error("Invalid token");
    }
    return decodedToken;
  } catch (error) {
    throw new Error("expired or invalid token");
  }
}
