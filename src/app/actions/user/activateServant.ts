"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
export const activateServant = async (id: any) => {
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
    if (isNaN(idInt)) {
      throw new Error("Invalid servantRoleId format");
    }
    const user = await prisma.user.findUnique({
      where: { id: idInt },
    });
    if (restaurantId !== user?.restaurantId) {
      throw new Error("you can only edit your restaurant");
    }
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role !== "SERVANT") {
      throw new Error("Only servant users can be activated");
    }
    const updatedUser = await prisma.user.update({
      where: { id: idInt },
      data: { active: true },
    });
    return updatedUser;
  } catch (error) {
    throw new Error("error activating servant");
  }
};
