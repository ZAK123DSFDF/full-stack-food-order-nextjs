"use server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { AllowedActions } from "@/utils/enum";
import { OrderHistory } from "@/classes/OrderHistory";
import { checkAbilities } from "@/casl/checkAbilities";

export const getOrderHistory = async () => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      await checkAbilities(ability, AllowedActions.ORDER_HISTORY, OrderHistory)
    ) {
      const customerId = token.user;
      const customerExists = await prisma.user.findUnique({
        where: { id: customerId },
      });

      if (!customerExists) {
        throw new Error(`Customer with ID ${customerId} not found.`);
      }
      if (!customerId) {
        throw new Error("User ID not found in token");
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
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error) {
    throw new Error("Error getting order history");
  }
};
