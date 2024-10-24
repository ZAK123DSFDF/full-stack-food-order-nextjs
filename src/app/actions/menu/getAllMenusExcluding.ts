"use server";
import { prisma } from "../../../lib/prisma";
export const getAllMenusExcluding = async (id: any) => {
  try {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new Error("Invalid menu ID");
    }
    const menus = await prisma.menu.findMany({
      where: {
        id: {
          not: numericId,
        },
      },
      include: { restaurant: true },
    });

    return menus;
  } catch (error) {
    throw new Error("failed to get menus");
  }
};
