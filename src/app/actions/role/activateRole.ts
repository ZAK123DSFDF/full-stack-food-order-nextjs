"use server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { checkAbilities } from "@/casl/checkAbilities";
import { AllowedActions } from "@/utils/enum";
import { All } from "@/classes/All";
import { Role } from "@/classes/Role";
export const activateRole = async (id: any) => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      (await checkAbilities(ability, AllowedActions.ALL, All)) ||
      (await checkAbilities(ability, AllowedActions.UPDATE_ROLE, Role))
    ) {
      const restaurantId = token.restaurantId;
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
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error) {
    throw new Error("Error in activating Role");
  }
};
