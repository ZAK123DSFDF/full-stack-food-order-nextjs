import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "./verifyToken";

export async function decodedToken() {
  try {
    const token = await verifyToken();
    const decodedToken = jwt.decode(token) as JwtPayload | null;

    if (!decodedToken || typeof decodedToken === "string") {
      throw new Error("Invalid token");
    }
    return decodedToken;
  } catch (error) {
    throw new Error("expired or invalid token");
  }
}
