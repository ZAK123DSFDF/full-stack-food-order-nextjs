"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
import * as bcrypt from "bcrypt";
export const createServant = async ({
  name,
  email,
  password,
  phoneNumber,
  location,
  servantRoleId,
}: any) => {
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
    const servantRoleIdInt = parseInt(servantRoleId, 10);
    if (isNaN(servantRoleIdInt)) {
      throw new Error("Invalid servantRoleId format");
    }
    const SignupSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      location: z.string(),
      phoneNumber: z.string(),
      servantRoleId: z.number(),
    });
    const parsed = SignupSchema.safeParse({
      name,
      email,
      password,
      phoneNumber,
      location,
      servantRoleId: servantRoleIdInt,
    });
    if (!parsed.success) {
      throw new Error(
        parsed.error.errors
          .map((err) => `${err.path}: ${err.message}`)
          .join(", ")
      );
    }
    const existUser = await prisma.user.findUnique({ where: { email } });
    if (existUser) {
      throw new Error("Email already exists");
    }
    if (servantRoleIdInt) {
      const existingServantRole = await prisma.servantRole.findUnique({
        where: { id: servantRoleIdInt },
      });
      if (!existingServantRole) {
        throw new Error("Invalid servant role ID.");
      }
      if (!existingServantRole.active) {
        throw new Error("Servant role is not active.");
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phoneNumber,
        role: "SERVANT",
        servantRole: {
          connect: { id: servantRoleIdInt },
        },
        restaurant: {
          connect: { id: restaurantId },
        },
      },
    });

    return user;
  } catch (error) {
    throw new Error("error creating servant");
  }
};
