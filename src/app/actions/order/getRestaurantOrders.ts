"use server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { checkAbilities } from "@/casl/checkAbilities";
import { AllowedActions } from "@/utils/enum";
import { All } from "@/classes/All";
import { Orders } from "@/classes/Orders";
export const getRestaurantOrders = async (
  globalSearch: string,
  orderStatus: string,
  menuName: string,
  count: string,
  price: string,
  createdAt: string,
  customerName: string,
  customerEmail: string,
  customerPhoneNumber: string,
  customerLocation: string,
  sortBy: string,
  sortOrder: string
) => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      (await checkAbilities(ability, AllowedActions.ALL, All)) ||
      (await checkAbilities(ability, AllowedActions.SEE_ORDERS, Orders))
    ) {
      const restaurantId = token.restaurantId;
      const restaurantExists = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurantExists) {
        throw new Error(`Restaurant with ID ${restaurantId} not found.`);
      }
      const whereClause: any = {
        menu: {
          restaurantId: restaurantId,
        },
      };

      if (globalSearch) {
        whereClause.OR = [
          {
            menu: {
              name: { contains: globalSearch, mode: "insensitive" },
            },
          },
          {
            customer: {
              OR: [
                { name: { contains: globalSearch, mode: "insensitive" } },
                { email: { contains: globalSearch, mode: "insensitive" } },
                {
                  phoneNumber: { contains: globalSearch, mode: "insensitive" },
                },
                { location: { contains: globalSearch, mode: "insensitive" } },
              ],
            },
          },
        ];

        const numericSearch = Number(globalSearch);
        if (!isNaN(numericSearch)) {
          whereClause.OR.push(
            { menu: { price: numericSearch } },
            { count: numericSearch }
          );
        }
        const isDate = !isNaN(Date.parse(globalSearch));
        if (isDate) {
          whereClause.OR.push({
            createdAt: {
              equals: new Date(globalSearch),
            },
          });
        }
      }

      if (orderStatus) {
        const validOrder = ["READY", "PREPARING", "DELIVERED"];
        if (validOrder.includes(orderStatus)) {
          whereClause.orderStatus = orderStatus;
        }
      }

      if (menuName) {
        whereClause.menu.name = {
          contains: menuName,
          mode: "insensitive",
        };
      }

      if (
        customerName ||
        customerEmail ||
        customerPhoneNumber ||
        customerLocation
      ) {
        whereClause.customer = {};

        if (customerName) {
          whereClause.customer.name = {
            contains: customerName,
            mode: "insensitive",
          };
        }

        if (customerEmail) {
          whereClause.customer.email = {
            contains: customerEmail,
            mode: "insensitive",
          };
        }

        if (customerPhoneNumber) {
          whereClause.customer.phoneNumber = {
            contains: customerPhoneNumber,
            mode: "insensitive",
          };
        }

        if (customerLocation) {
          whereClause.customer.location = {
            contains: customerLocation,
            mode: "insensitive",
          };
        }
      }

      if (count && !isNaN(Number(count))) {
        whereClause.count = Number(count);
      }

      if (price && !isNaN(Number(price))) {
        whereClause.menu.price = Number(price);
      }
      if (createdAt) {
        const date = new Date(createdAt);
        if (!isNaN(date.getTime())) {
          const startOfDay = new Date(date.setHours(0, 0, 0, 0));
          const endOfDay = new Date(date.setHours(23, 59, 59, 999));

          whereClause.createdAt = {
            gte: startOfDay,
            lte: endOfDay,
          };
        }
      }
      const orderBy: any = {};
      if (sortBy) {
        const sortDirection = sortOrder === "desc" ? "desc" : "asc";

        switch (sortBy) {
          case "menuname":
            orderBy.menu = { name: sortDirection };
            break;
          case "menuprice":
            orderBy.menu = { price: sortDirection };
            break;
          case "count":
            orderBy.count = sortDirection;
            break;
          case "customerphoneNumber":
            orderBy.customer = { phoneNumber: sortDirection };
            break;
          case "customername":
            orderBy.customer = { name: sortDirection };
            break;
          case "customeremail":
            orderBy.customer = { email: sortDirection };
            break;
          case "customerlocation":
            orderBy.customer = { location: sortDirection };
            break;
          case "createdAt":
            orderBy.createdAt = sortDirection;
            break;
          default:
            orderBy.createdAt = "asc";
        }
      } else {
        orderBy.createdAt = "asc";
      }

      const orders = await prisma.order.findMany({
        where: { ...whereClause, OR: whereClause.OR },
        orderBy: orderBy,
        include: {
          menu: true,
          customer: true,
        },
      });
      orders.forEach((order) => {
        if (order.menu.restaurantId !== restaurantId) {
          throw new Error("You can only get orders from your restaurant");
        }
      });

      if (orders.length === 0) {
        throw new Error("Order not found");
      }
      console.log("Orders found:", orders);
      return orders;
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error: any) {
    console.error("Error in getRestaurantOrders:", error);
    throw new Error(`Error getting restaurant orders: ${error?.message}`);
  }
};
