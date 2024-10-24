"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export const createOrder = async ({ menuId, count, toppings }: any) => {
  try {
    const tokenCookie = cookies().get("token");
    if (!tokenCookie) {
      throw new Error("User is not authenticated");
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
    const menuIdInt = parseInt(menuId, 10);
    if (isNaN(menuIdInt)) {
      throw new Error("Invalid menu ID format");
    }

    const OrderSchema = z.object({
      menuId: z.number().nonnegative("Invalid menu ID"),
      count: z.number().min(1, "Count must be at least 1").optional(),
      toppings: z.array(z.string()).optional(),
    });

    const parsed = OrderSchema.safeParse({
      menuId: menuIdInt,
      count,
      toppings,
    });
    if (!parsed.success) {
      const errorMessages = parsed.error.errors
        .map((err) => `${err.path.join(".")} - ${err.message}`)
        .join(", ");
      throw new Error(`Validation error: ${errorMessages}`);
    }

    const customer = await prisma.user.findUnique({
      where: { id: customerId },
    });
    if (!customer) {
      throw new Error("Customer not found");
    }

    const menu = await prisma.menu.findUnique({
      where: { id: menuIdInt },
    });
    if (!menu) {
      throw new Error("Menu item not found");
    }

    if (toppings && toppings.length > 0) {
      const invalidToppings = toppings.filter(
        (topping: any) => !menu.toppings.includes(topping)
      );
      if (invalidToppings.length > 0) {
        throw new Error(
          `Invalid toppings: ${invalidToppings.join(
            ", "
          )}. Only removal is allowed.`
        );
      }
    }

    const order = await prisma.order.create({
      data: {
        customerId,
        menuId: menuIdInt,
        count,
        toppings,
      },
    });

    return order;
  } catch (error: any) {
    console.error("Error creating order:", error.message);
    throw new Error(
      error.message || "An unknown error occurred while creating the order"
    );
  }
};
