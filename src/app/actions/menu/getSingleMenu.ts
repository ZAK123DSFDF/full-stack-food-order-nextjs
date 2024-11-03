"use server";
import { prisma } from "../../../lib/prisma.ts";

export const getSingleMenu = async (id: any) => {
  try {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new Error("Invalid menu ID");
    }

    const menu = await prisma.menu.findUnique({ where: { id: numericId } });
    return menu;
  } catch (error) {
    throw new Error("Failed to get single menu");
  }
};
