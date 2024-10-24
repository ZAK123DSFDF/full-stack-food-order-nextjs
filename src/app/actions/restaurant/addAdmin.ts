"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
import * as bcrypt from "bcrypt";
export const addAdmin = async ({
  name,
  email,
  password,
  phoneNumber,
  location,
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
    const UserSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      phoneNumber: z.string(),
      location: z.string().optional(),
    });
    const parsed = UserSchema.safeParse({
      name,
      email,
      password,
      phoneNumber,
      location,
    });
    if (!parsed.success) {
      throw new Error(
        parsed.error.errors
          .map((err) => `${err.path}: ${err.message}`)
          .join(", ")
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        location,
        role: "ADMIN",
        restaurantId,
      },
    });
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        users: {
          connect: { id: newUser.id },
        },
      },
    });
    return newUser;
  } catch (error) {
    throw new Error("error in adding Admin");
  }
};
