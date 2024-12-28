"use server"

import { prisma } from "../../../lib/prisma.ts"
import sharp from "sharp"
import { uploadToCloudinary } from "../../../lib/cloudinary.ts"
import { z } from "zod"
import { verifyToken } from "@/utils/verifyToken.ts"
import { decodedToken } from "@/utils/decodeToken.ts"
import { defineAbilitiesFor } from "@/casl/abilities.ts"
import { checkAbilities } from "@/casl/checkAbilities.ts"
import { AllowedActions } from "@/utils/enum.ts"
import { All } from "@/classes/All.ts"
import { Menu } from "@/classes/Menu.ts"

export const createMenu = async (formData: FormData) => {
  try {
    await verifyToken()
    const token = await decodedToken()
    const ability = await defineAbilitiesFor(token)
    if (
      (await checkAbilities(ability, AllowedActions.ALL, All)) ||
      (await checkAbilities(ability, AllowedActions.ADD_MENU, Menu))
    ) {
      const restaurantId = token.restaurantId
      const restaurantExists = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
      })

      if (!restaurantExists) {
        throw new Error(`Restaurant with ID ${restaurantId} not found.`)
      }
      const name = formData.get("name")?.toString()
      const price = formData.get("price")?.toString()
      const toppings = formData.getAll("toppings").map((top) => top.toString())
      const files = formData.getAll("menuPic")
      const MenuSchema = z.object({
        name: z.string().min(1, "Name is required"),
        price: z.preprocess(
          (val) => parseFloat(val as string),
          z.number().positive()
        ),
        toppings: z.array(z.string()).optional(),
      })

      const parsed = MenuSchema.safeParse({ name, price, toppings })
      if (!parsed.success) {
        throw new Error(
          parsed.error.errors
            .map((err) => `${err.path}: ${err.message}`)
            .join(", ")
        )
      }
      const menuPics: string[] = []
      for (const file of files) {
        const arrayBuffer = await (file as File).arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const processedBuffer = await sharp(buffer)
          .resize({ width: 800 })
          .webp({ quality: 80 })
          .toBuffer()
        const cloudinaryResponse = await uploadToCloudinary(
          processedBuffer,
          (file as File).name.split(".")[0]
        )
        menuPics.push(cloudinaryResponse.secure_url)
      }
      const menu = await prisma.menu.create({
        data: {
          restaurantId,
          name: parsed.data.name,
          price: parsed.data.price,
          toppings: parsed.data.toppings || [],
          Picture: menuPics,
        },
      })

      return menu
    } else {
      throw new Error("you are not authorize to do this action")
    }
  } catch (error) {
    console.error("Error creating menu:", error)
    throw new Error("An error occurred while creating the menu")
  }
}
