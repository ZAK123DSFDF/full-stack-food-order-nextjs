"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
export const getAllRoles = async (
  globalSearch: string,
  name: string,
  createdAt: string,
  active: string,
  sortBy: string,
  sortOrder: string
) => {
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
  } catch (error) {
    throw new Error("error getting roles");
  }
};
