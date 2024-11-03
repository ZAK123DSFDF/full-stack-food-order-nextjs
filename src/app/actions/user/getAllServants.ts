"use server";
import { prisma } from "../../../lib/prisma.ts";
import { verifyToken } from "../../../utils/verifyToken.ts";
import { decodedToken } from "../../../utils/decodeToken.ts";
import { defineAbilitiesFor } from "../../../casl/abilities.ts";
import { checkAbilities } from "../../../casl/checkAbilities.ts";
import { AllowedActions } from "../../../utils/enum.ts";
import { All } from "../../../classes/All.ts";
import { Users } from "../../../classes/Users.ts";
export const getAllServants = async (
  providedToken?: string,
  globalSearch?: any,
  name?: any,
  phoneNumber?: any,
  email?: any,
  location?: any,
  active?: any,
  sortBy?: any,
  sortOrder?: any
) => {
  try {
    let token;
    let ability;
    if (providedToken) {
      token = await decodedToken(providedToken);
      ability = await defineAbilitiesFor(token);
    } else {
      await verifyToken();
      token = await decodedToken();
      ability = await defineAbilitiesFor(token);
    }
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
