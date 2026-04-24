"use server";

import { addLocationSchema, locationType } from "@/lib/formTypes";
import prismaClient from "@/lib/prisma";
import { cookies } from "next/headers";

export const storeLocation = async (input: locationType) => {
  try {
    const { category, aliases, lat, long, name, description } =
      addLocationSchema.parse(input);
    const isValid = await isAdmin();
    if (!isValid) {
      throw new Error("Invalid User");
    }

    await prismaClient.locations.create({
      data: {
        category,
        aliases: aliases
          .split(",")
          .slice(0, 5)
          .map((tag) => tag.trim().toLowerCase()),
        lat,
        long,
        description,
        name,
      },
    });
    return {
      message: "Successfully Added",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error && error.message,
    };
  }
};

export const isAdmin = async () => {
  interface admin {
    email: string;
    username: string;
  }
  let data: undefined | string | admin = await getCookie("_a");

  if (!data) return false;
  data = JSON.parse(data) as admin;
  if (data?.username || data.email) return false;
  return true;
};

const getCookie = async (name: string) => {
  return (await cookies()).get(name)?.value;
};
const setCookie = async (name: string, value: string) => {
  (await cookies()).set(name, value, {
    maxAge: 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
  });
};
