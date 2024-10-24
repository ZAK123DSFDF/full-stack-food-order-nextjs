"use server";

import { cookies } from "next/headers";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
export const getLogin = async ({ email, password }: any) => {
  try {
    if (!email || !password) {
      throw new Error("email not found");
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { servantRole: true },
    });

    if (!user) {
      throw new Error("user not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const payload: any = {
      user: user.id,
      email: user.email,
      role: user.role,
    };

    if (user.restaurantId) {
      payload.restaurantId = user.restaurantId;
    }

    if (user.role === "SERVANT" && user.servantRoleId) {
      payload.servantRoleId = user.servantRoleId;
    }
    const token = jwt.sign(payload, process.env.SECRET as string);

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
    });

    return {
      user,
      token,
      restaurantId: user.restaurantId || null,
      servantRoleId: user.role === "SERVANT" ? user.servantRoleId : null,
    };
  } catch (error) {
    throw new Error("Error in signing in: ");
  }
};
