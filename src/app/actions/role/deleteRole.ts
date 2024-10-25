"use server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { checkAbilities } from "@/casl/checkAbilities";
import { AllowedActions } from "@/utils/enum";
import { All } from "@/classes/All";
import { Role } from "@/classes/Role";
export const deleteRole = async (id: any) => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      (await checkAbilities(ability, AllowedActions.ALL, All)) ||
      (await checkAbilities(ability, AllowedActions.DELETE_ROLE, Role))
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
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error) {
    throw new Error("error deleting role");
  }
};
