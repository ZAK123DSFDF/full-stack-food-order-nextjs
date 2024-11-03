"use server";
import { prisma } from "../../../lib/prisma.ts";
import { verifyToken } from "../../../utils/verifyToken.ts";
import { decodedToken } from "../../../utils/decodeToken.ts";
import { defineAbilitiesFor } from "../../../casl/abilities.ts";
import { AllowedActions } from "../../../utils/enum.ts";
import { OrderHistory } from "../../../classes/OrderHistory.ts";
import { checkAbilities } from "../../../casl/checkAbilities.ts";

export const getOrderHistory = async (providedToken?: string) => {
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
