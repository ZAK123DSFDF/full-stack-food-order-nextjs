"use server";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { checkAbilities } from "@/casl/checkAbilities";
import { AllowedActions } from "@/utils/enum";
import { Orders } from "@/classes/Orders";
import { All } from "@/classes/All";
export const updateOrder = async ({ id, status }: any) => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      (await checkAbilities(ability, AllowedActions.ALL, All)) ||
      (await checkAbilities(ability, AllowedActions.UPDATE_ORDERS, Orders))
    ) {
      const restaurantId = token.restaurantId;
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
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error) {
    throw new Error("error updating the order");
  }
};
