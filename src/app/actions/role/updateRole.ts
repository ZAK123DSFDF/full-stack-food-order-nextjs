"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
export const updateRole = async ({ name, allowedActions, id }: any) => {
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
    const updateServantRoleSchema = z.object({
      name: z.string().min(1).optional(),
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
            "GET_ROLES",
            "GET_USERS",
          ])
        )
        .optional(),
    });
    const parsed = updateServantRoleSchema.safeParse({
      name,
      allowedActions,
      id,
    });
    if (!parsed.success) {
      throw new Error(
        parsed.error.errors
          .map((err) => `${err.path}: ${err.message}`)
          .join(", ")
      );
    }
    const newAllowedActions = parsed.data.allowedActions
      ? parsed.data.allowedActions
      : existingRole.allowedActions;
    const updatedRole = await prisma.servantRole.update({
      where: { id: idInt },
      data: {
        name: parsed.data.name || existingRole.name,
        allowedActions: newAllowedActions,
      },
    });

    return updatedRole;
  } catch (error) {
    throw new Error("error in updating role");
  }
};
