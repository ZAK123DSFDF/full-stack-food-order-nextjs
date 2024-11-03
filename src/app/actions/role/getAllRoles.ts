"use server";
import { prisma } from "../../../lib/prisma.ts";
import { verifyToken } from "../../../utils/verifyToken.ts";
import { decodedToken } from "../../../utils/decodeToken.ts";
import { defineAbilitiesFor } from "../../../casl/abilities.ts";
import { checkAbilities } from "../../../casl/checkAbilities.ts";
import { AllowedActions } from "../../../utils/enum.ts";
import { All } from "../../../classes/All.ts";
import { Role } from "../../../classes/Role.ts";
export const getAllRoles = async (
  providedToken?: string,
  globalSearch?: string,
  name?: string,
  createdAt?: string,
  active?: string,
  sortBy?: string,
  sortOrder?: string
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
      (await checkAbilities(ability, AllowedActions.GET_ROLES, Role))
    ) {
      const restaurantId = token.restaurantId;
      const restaurantExists = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurantExists) {
        throw new Error(`Restaurant with ID ${restaurantId} not found.`);
      }
      const filters: any = { restaurantId };

      if (globalSearch) {
        const isDate = !isNaN(Date.parse(globalSearch));

        filters.OR = [
          {
            name: {
              contains: globalSearch,
              mode: "insensitive",
            },
          },
        ];

        if (isDate) {
          filters.OR.push({
            createdAt: {
              equals: new Date(globalSearch),
            },
          });
        }
      } else {
        if (name) {
          filters.name = {
            contains: name,
            mode: "insensitive",
          };
        }

        if (createdAt) {
          const date = new Date(createdAt);
          if (!isNaN(date.getTime())) {
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));

            filters.createdAt = {
              gte: startOfDay,
              lte: endOfDay,
            };
          }
        }
        if (active === "true" || active === "false") {
          const isActive = active === "true";
          filters.active = isActive;
        }
      }
      const orderBy: { [key: string]: "asc" | "desc" } = {};
      if (sortBy) {
        orderBy[sortBy] = sortOrder === "desc" ? "desc" : "asc";
      } else {
        orderBy["name"] = "asc";
      }

      const roles = await prisma.servantRole.findMany({
        where: {
          restaurantId: filters.restaurantId,
          OR: filters.OR,
          name: filters.name,
          createdAt: filters.createdAt,
          active: filters.active,
        },
        orderBy: orderBy,
      });
      return roles;
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error) {
    throw new Error("error getting roles");
  }
};
