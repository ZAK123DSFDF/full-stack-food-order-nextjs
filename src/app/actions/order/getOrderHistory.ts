"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";

export const getOrderHistory = async () => {
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

    const customerId = decodedToken.user;

    if (!customerId) {
      throw new Error("User ID not found in token");
    }

    const customerExists = await prisma.user.findUnique({
      where: { id: customerId },
    });

    if (!customerExists) {
      throw new Error(`Customer with ID ${customerId} not found.`);
    }

    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        menu: { include: { restaurant: true } },
      },
    });

    if (!orders || orders.length === 0) {
      throw new Error(`No orders found for customer with ID ${customerId}.`);
    }

    return orders;
  } catch (error) {
    throw new Error("Error getting order history");
  }
};
