"use server";

import { prisma } from "@/lib/prisma.ts";

export const getAllMenus = async () => {
  try {
    const menus = await prisma.menu.findMany({
      include: { restaurant: true },
    });
    return menus;
  } catch (error) {
    throw new Error("error in fetching menus");
  }
};
