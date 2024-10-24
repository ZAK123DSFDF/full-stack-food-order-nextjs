"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
export const getSingleRole = async (id: any) => {
  try {
    const tokenCookie = cookies().get("token");
    if (!tokenCookie) {
      return { isAuthenticated: false };
    }
    const token = tokenCookie.value;
    const decodedToken = jwt.decode(token) as JwtPayload | null;
    if (!decodedToken || typeof decodedToken === "string") {
      throw new Error("Invalid token");
    }
    const restaurantId = decodedToken.restaurantId;
    const restaurantExists = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurantExists) {
      throw new Error(`Restaurant with ID ${restaurantId} not found.`);
    }
    const idInt = parseInt(id, 10);
    const role = await prisma.servantRole.findFirst({
      where: {
        id: idInt,
        restaurantId,
      },
    });

    if (!role) {
      throw new Error("Role not found in this restaurant");
    }

    return role;
  } catch (error) {
    throw new Error("error getting single error");
  }
};
