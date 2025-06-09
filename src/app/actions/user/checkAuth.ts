"use server";
import { cookies } from "next/headers";
import jwt, {JwtPayload} from "jsonwebtoken";

export const checkAuth = async () => {
  const tokenCookie = cookies().get("token");
  if (!tokenCookie) {
    return { isAuthenticated: false };
  }

  const token = tokenCookie.value;
  const decoded:any = jwt.decode(token);
  if (!decoded) {
    return { isAuthenticated: false };
  }
  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp && currentTime > decoded.exp) {
    // Optional: Clear expired token
    cookies().delete("token");
    return { isAuthenticated: false };
  }
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
