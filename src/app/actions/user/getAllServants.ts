"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
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
  } catch (error) {
    throw new Error("error getting servants");
  }
};
