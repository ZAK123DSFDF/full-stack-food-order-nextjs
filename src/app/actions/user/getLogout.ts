"use server";
import { cookies } from "next/headers";
export const getLogout = async () => {
  try {
    cookies().delete("token");
    return "logout successful";
  } catch (error) {
    throw new Error("error in logout");
  }
};
