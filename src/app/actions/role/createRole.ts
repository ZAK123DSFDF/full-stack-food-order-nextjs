"use server";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { checkAbilities } from "@/casl/checkAbilities";
import { AllowedActions } from "@/utils/enum";
import { All } from "@/classes/All";
import { Role } from "@/classes/Role";
export const createRole = async ({ name, allowedActions }: any) => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      (await checkAbilities(ability, AllowedActions.ALL, All)) ||
      (await checkAbilities(ability, AllowedActions.ADD_ROLE, Role))
    ) {
      const restaurantId = token.restaurantId;
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
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error) {
    throw new Error("error in creating role");
  }
};
