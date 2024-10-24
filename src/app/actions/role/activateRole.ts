"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
export const activateRole = async (id: any) => {
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
    const role = await prisma.servantRole.findUnique({
      where: { id: idInt },
      select: {
        id: true,
        restaurantId: true,
        active: true,
      },
    });
    if (restaurantId !== role?.restaurantId) {
      throw new Error("you cannot update other restaurant role");
    }
    if (!role) {
      throw new Error("Servant role not found");
    }
    if (role.active) {
      throw new Error("Servant role is already active");
    }

    const updatedRole = await prisma.servantRole.update({
      where: { id: idInt },
      data: { active: true },
    });
    return updatedRole;
  } catch (error) {
    throw new Error("Error in activating Role");
  }
};
