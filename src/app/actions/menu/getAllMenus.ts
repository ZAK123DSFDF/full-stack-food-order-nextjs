"use server";

import { prisma } from "@/lib/prisma.ts";

export const getAllMenus = async () => {
  try {

    return await prisma.menu.findMany({
      include: { restaurant: true },
    });
  } catch (error) {
    throw new Error("error in fetching menus");
  }
};
