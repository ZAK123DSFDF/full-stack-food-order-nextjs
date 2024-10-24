"use server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { cookies } from "next/headers";
import sharp from "sharp";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import * as bcrypt from "bcrypt";
export const createRestaurant = async (formData: any) => {
  try {
    const tokenCookie = cookies().get("token");
    const token = tokenCookie?.value;
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const password = formData.get("password").toString();
    const location = formData.get("location").toString();
    const phoneNumber = formData.get("phoneNumber").toString();
    const restaurantName = formData.get("restaurantName").toString();
    const restaurantLocation = formData.get("restaurantLocation").toString();
    const restaurantPic = formData.get("restaurantPic");
    const arrayBuffer = await (restaurantPic as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const processedBuffer = await sharp(buffer)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toBuffer();
    const cloudinaryResponse = await uploadToCloudinary(
      processedBuffer,
      (restaurantPic as File).name.split(".")[0]
    );
    const UserSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      phoneNumber: z.string().min(1, "Phone number is required"),
      location: z.string().min(1, "location is required").optional(),
    });
    const RestaurantSchema = z.object({
      restaurantName: z.string().min(1, "Name is required"),
      restaurantLocation: z.string().min(1, "Location is required"),
    });
    const userParsed = UserSchema.safeParse({
      name,
      email,
      password,
      phoneNumber,
      location,
    });
    if (!userParsed.success) {
      throw new Error(
        userParsed.error.errors
          .map((err) => `${err.path}: ${err.message}`)
          .join(", ")
      );
    }
    const restaurantParsed = RestaurantSchema.safeParse({
      restaurantName,
      restaurantLocation,
    });
    if (!restaurantParsed.success) {
      throw new Error(
        restaurantParsed.error.errors
          .map((err) => `${err.path}: ${err.message}`)
          .join(", ")
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("user already exist");
    }
    let userId: any;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        location,
        role: "ADMIN",
      },
    });
    userId = newUser.id;
    const restaurant = await prisma.restaurant.create({
      data: {
        name: restaurantName,
        location: restaurantLocation,
        users: {
          connect: { id: userId },
        },
        Picture: cloudinaryResponse.secure_url,
      },
    });

    return restaurant;
  } catch (error) {
    throw new Error("error creating restaurant");
  }
};
