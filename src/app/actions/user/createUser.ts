"use server";
import { cookies } from "next/headers";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
export const createUser = async ({
  name,
  email,
  password,
  location,
  phoneNumber,
}: any) => {
  try {
    const SignupSchema = z.object({
      name: z.string().min(1, "Name is required").optional(),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      location: z.string(),
      phoneNumber: z.string(),
      servantRole: z.array(z.string()).optional(),
    });

    const parsed = SignupSchema.safeParse({
      name,
      email,
      password,
      location,
      phoneNumber,
    });

    if (!parsed.success) {
      const errorMessages = parsed.error.errors
        .map((err) => `${err.path.join(".")} - ${err.message}`)
        .join(", ");
      throw new Error(errorMessages);
    }

    const existUser = await prisma.user.findUnique({ where: { email } });
    if (existUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phoneNumber,
      },
    });

    const token = jwt.sign(
      {
        user: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.secret as string
    );

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
    });

    return { user, token };
  } catch (error) {
    console.error(error);
    throw new Error("Error signing up");
  }
};
