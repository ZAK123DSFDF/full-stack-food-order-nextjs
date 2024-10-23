"use server";
import { cookies } from "next/headers";
export const createUser = async ({
  name,
  email,
  password,
  location,
  phoneNumber,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/create`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({ name, email, password, location, phoneNumber }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to check");
  }
  const userResData = await response.json();
  if (userResData) {
    cookies().set({
      name: "token",
      value: userResData.token,
      httpOnly: true,
    });
  }
  return userResData;
};
