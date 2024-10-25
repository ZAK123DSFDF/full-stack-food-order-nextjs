"use server";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { checkAbilities } from "@/casl/checkAbilities";
import { AllowedActions } from "@/utils/enum";
import { createOrderCus } from "@/classes/createOrder";

export const createOrder = async ({ menuId, count, toppings }: any) => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      await checkAbilities(ability, AllowedActions.CREATE_ORDER, createOrderCus)
    ) {
      const customerId = token?.user;
      const customer = await prisma.user.findUnique({
        where: { id: customerId },
      });
      if (!customer) {
        throw new Error("Customer not found");
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
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error: any) {
    console.error("Error creating order:", error.message);
    throw new Error(
      error.message || "An unknown error occurred while creating the order"
    );
  }
};
