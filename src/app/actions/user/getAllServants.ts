"use server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { checkAbilities } from "@/casl/checkAbilities";
import { AllowedActions } from "@/utils/enum";
import { All } from "@/classes/All";
import { Users } from "@/classes/Users";
export const getAllServants = async (
  globalSearch: any,
  name: any,
  phoneNumber: any,
  email: any,
  location: any,
  active: any,
  sortBy: any,
  sortOrder: any
) => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      (await checkAbilities(ability, AllowedActions.ALL, All)) ||
      (await checkAbilities(ability, AllowedActions.GET_USERS, Users))
    ) {
      const restaurantId = token.restaurantId;
      const restaurantExists = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurantExists) {
        throw new Error(`Restaurant with ID ${restaurantId} not found.`);
      }
      const whereCondition: any = {
        role: "SERVANT",
        restaurantId,
      };
      if (globalSearch) {
        whereCondition.OR = [
          { name: { contains: globalSearch, mode: "insensitive" } },
          { phoneNumber: { contains: globalSearch, mode: "insensitive" } },
          { email: { contains: globalSearch, mode: "insensitive" } },
          { location: { contains: globalSearch, mode: "insensitive" } },
        ];
      }
      if (name) {
        whereCondition.name = { contains: name, mode: "insensitive" };
      }
      if (phoneNumber) {
        whereCondition.phoneNumber = {
          contains: phoneNumber,
          mode: "insensitive",
        };
      }
      if (email) {
        whereCondition.email = { contains: email, mode: "insensitive" };
      }
      if (location) {
        whereCondition.location = { contains: location, mode: "insensitive" };
      }
      if (active === "true" || active === "false") {
        whereCondition.active = active === "true";
      }
      const orderBy: { [key: string]: "asc" | "desc" } = {};
      if (sortBy) {
        orderBy[sortBy] = sortOrder;
      }
      const servants = await prisma.user.findMany({
        where: whereCondition,
        orderBy: orderBy,
      });

      return servants;
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error) {
    throw new Error("error getting servants");
  }
};
