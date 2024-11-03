"use server";
import { All } from "../classes/All.ts";

import { OrderHistory } from "../classes/OrderHistory.ts";
import { AllowedActions } from "../utils/enum.ts";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { prisma } from "../lib/prisma.ts";
import { Orders } from "../classes/Orders.ts";
import { Menu } from "../classes/Menu.ts";
import { Role } from "../classes/Role.ts";
import { Users } from "../classes/Users.ts";
import { createOrderCus } from "../classes/createOrder.ts";
export async function defineAbilitiesFor(user: any) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (user.role === "CUSTOMER") {
    can(AllowedActions.ORDER_HISTORY, OrderHistory);
    can(AllowedActions.CREATE_ORDER, createOrderCus);
  } else if (user.role === "ADMIN") {
    can(AllowedActions.ALL, All);
  } else if (user.role === "SERVANT") {
    const servantRole = await prisma.servantRole.findUnique({
      where: { id: user.servantRoleId },
      select: { allowedActions: true },
    });
    if (!servantRole) {
      throw new Error("Role is not found");
    }

    const userCheck = await prisma.user.findUnique({
      where: { id: user.user },
    });

    if (servantRole.allowedActions.length > 0) {
      servantRole.allowedActions.forEach((action) => {
        switch (action) {
          case "SEE_ORDERS":
            if (userCheck?.active) {
              can(AllowedActions.SEE_ORDERS, Orders);
            } else {
              cannot(AllowedActions.SEE_ORDERS, Orders);
            }
            break;
          case "UPDATE_ORDERS":
            if (userCheck?.active) {
              can(AllowedActions.UPDATE_ORDERS, Orders);
            } else {
              cannot(AllowedActions.UPDATE_ORDERS, Orders);
            }

            break;

          case "ADD_MENU":
            if (userCheck?.active) {
              can(AllowedActions.ADD_MENU, Menu);
            } else {
              cannot(AllowedActions.ADD_MENU, Menu);
            }

            break;
          case "ADD_ROLE":
            if (userCheck?.active) {
              can(AllowedActions.ADD_ROLE, Role);
            } else {
              cannot(AllowedActions.ADD_ROLE, Role);
            }

            break;
          case "UPDATE_ROLE":
            if (userCheck?.active) {
              can(AllowedActions.UPDATE_ROLE, Role);
            } else {
              cannot(AllowedActions.UPDATE_ROLE, Role);
            }
            break;
          case "DELETE_ROLE":
            if (userCheck?.active) {
              can(AllowedActions.DELETE_ROLE, Role);
            } else {
              cannot(AllowedActions.DELETE_ROLE, Role);
            }

            break;
          case "ADD_USER":
            if (userCheck?.active) {
              can(AllowedActions.ADD_USER, Users);
            } else {
              cannot(AllowedActions.ADD_USER, Users);
            }

            break;
          case "UPDATE_USER":
            if (userCheck?.active) {
              can(AllowedActions.UPDATE_USER, Users);
            } else {
              cannot(AllowedActions.UPDATE_USER, Users);
            }
            break;
          case "DELETE_USER":
            if (userCheck?.active) {
              can(AllowedActions.DELETE_USER, Users);
            } else {
              cannot(AllowedActions.DELETE_USER, Users);
            }

            break;
          case "GET_USERS":
            if (userCheck?.active) {
              can(AllowedActions.GET_USERS, Users);
            } else {
              cannot(AllowedActions.GET_USERS, Users);
            }
          case "GET_ROLES":
            if (userCheck?.active) {
              can(AllowedActions.GET_ROLES, Role);
            } else {
              cannot(AllowedActions.GET_ROLES, Role);
            }

            break;
          default:
            console.log(`Unknown action: ${action}`);
            break;
        }
      });
    }
  }

  return build();
}
