"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
export const deleteRole = async (id: any) => {
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
    const existingRole = await prisma.servantRole.findUnique({
      where: { id: idInt },
    });

    if (!existingRole) {
      throw new Error(`Servant role with ID ${idInt} not found.`);
    }
    if (restaurantId !== existingRole.restaurantId) {
      throw new Error("you can only edit your own restaurant");
    }
    await prisma.servantRole.delete({
      where: { id: idInt },
    });
    return { message: `Servant role with ID ${idInt} has been deleted.` };
  } catch (error) {
    throw new Error("error deleting role");
  }
};
