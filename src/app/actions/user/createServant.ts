"use server";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { verifyToken } from "@/utils/verifyToken";
import { decodedToken } from "@/utils/decodeToken";
import { defineAbilitiesFor } from "@/casl/abilities";
import { checkAbilities } from "@/casl/checkAbilities";
import { AllowedActions } from "@/utils/enum";
import { All } from "@/classes/All";
import { Users } from "@/classes/Users";
export const createServant = async ({
  name,
  email,
  password,
  phoneNumber,
  location,
  servantRoleId,
}: any) => {
  try {
    await verifyToken();
    const token = await decodedToken();
    const ability = await defineAbilitiesFor(token);
    if (
      (await checkAbilities(ability, AllowedActions.ALL, All)) ||
      (await checkAbilities(ability, AllowedActions.ADD_USER, Users))
    ) {
      const restaurantId = token.restaurantId;
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
    } else {
      throw new Error("you are not authorize to do this action");
    }
  } catch (error) {
    throw new Error("error creating servant");
  }
};
