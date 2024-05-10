"use server";

import { db } from "@/app/_lib/prisma";

export const searchForRestaurants = async (search: string) => {
  const restaurant = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return restaurant;
};
