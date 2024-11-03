"use server";
import jwt from "jsonwebtoken";

export async function verifyToken() {
  try {
    const { cookies } = await import("next/headers");
    const tokenCookie = cookies().get("token");
    const token = tokenCookie?.value;
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const verified = jwt.verify(token, process.env.secret as string);
    if (!verified) {
      throw new Error("User is not authenticated");
    }
    return token;
  } catch (error: any) {
    console.error("Error in auth:", error);
    throw new Error(`Error auth: ${error?.message}`);
  }
}
