"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
export const updateOrder = async ({ id, status }: any) => {
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
    const idInt = parseInt(id, 10);
    const OrderStatusSchema = z.enum(["PREPARING", "READY", "DELIVERED"]);
    const parsed = OrderStatusSchema.safeParse(status);
    if (!parsed.success) {
      throw new Error(
        parsed.error.errors
          .map((err) => `${err.path}: ${err.message}`)
          .join(", ")
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: idInt },
      include: { menu: true },
    });
    if (restaurantId !== order?.menu.restaurantId) {
      throw new Error("you can only edit your restaurant");
    }
    if (!order) {
      throw new Error("Order not found");
    }
    const updatedOrder = await prisma.order.update({
      where: { id: idInt },
      data: { orderStatus: parsed.data },
    });

    return updatedOrder;
  } catch (error) {
    throw new Error("error updating the order");
  }
};
