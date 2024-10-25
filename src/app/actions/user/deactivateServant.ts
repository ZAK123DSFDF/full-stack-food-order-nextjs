"use server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { checkAbilities } from "@/casl/checkAbilities";
import { AllowedActions } from "@/utils/enum";
import { All } from "@/classes/All";
import { Users } from "@/classes/Users";
export const deactivateServant = async (id: any) => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      (await checkAbilities(ability, AllowedActions.ALL, All)) ||
      (await checkAbilities(ability, AllowedActions.UPDATE_USER, Users))
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
        throw new Error("Only servant users can be deactivated");
      }

      const updatedUser = await prisma.user.update({
        where: { id: idInt },
        data: { active: false },
      });

      return updatedUser;
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error) {
    throw new Error("error deactivating servant");
  }
};
