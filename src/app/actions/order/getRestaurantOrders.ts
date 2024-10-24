"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
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

    console.log("Orders found:", orders);
    return orders;
  } catch (error) {
    throw new Error("error getting restaurant orders");
  }
};
