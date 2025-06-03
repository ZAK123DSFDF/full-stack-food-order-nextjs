"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const checkAuth = async () => {
  const tokenCookie = cookies().get("token");
  const rememberMeCookie = cookies().get("rememberMe");
  if (!tokenCookie) {
    return { isAuthenticated: false };
  }
  const rememberMe = rememberMeCookie ? JSON.parse(rememberMeCookie.value) : false;
  if (!rememberMe) {
    // Delete token and rememberMe cookies
    cookies().delete("token");
    cookies().delete("rememberMe");

    return { isAuthenticated: false };
  }
  const token = tokenCookie.value;
  const decoded = jwt.decode(token);

  if (decoded) {
    return {
      isAuthenticated: true,
      id: (decoded as any).user,
      email: (decoded as any).email,
      role: (decoded as any).role,
    };
  }

  return { isAuthenticated: false };
};
