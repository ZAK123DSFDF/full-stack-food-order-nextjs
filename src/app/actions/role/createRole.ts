"use server";
import { cookies } from "next/headers";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
export const createRole = async ({ name, allowedActions }: any) => {
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
    const ServantRoleSchema = z.object({
      name: z.string().min(1, "Role name is required"),
      allowedActions: z
        .array(
          z.enum([
            "SEE_ORDERS",
            "UPDATE_ORDERS",
            "ADD_MENU",
            "ADD_ROLE",
            "UPDATE_ROLE",
            "DELETE_ROLE",
            "ADD_USER",
            "UPDATE_USER",
            "DELETE_USER",
          ])
        )
        .nonempty("At least one allowed action is required"),
    });
    const parsed = ServantRoleSchema.safeParse({ name, allowedActions });
    if (!parsed.success) {
      throw new Error(
        parsed.error.errors
          .map((err) => `${err.path}: ${err.message}`)
          .join(", ")
      );
    }
    const newServantRole = await prisma.servantRole.create({
      data: {
        restaurantId,
        name,
        allowedActions,
        active: true,
      },
    });

    return newServantRole;
  } catch (error) {
    throw new Error("error in creating role");
  }
};
