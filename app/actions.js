"use server";

import { db } from "@/db";
import { listingTable } from "@/db/schema";
import { count } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { validateRequest } from "@/lib/validate-request";

export async function createListing(formData) {
  const { user } = await validateRequest();

  if (!user) {
    return { error: "You must be logged in to create a listing." };
  }

  const id = generateIdFromEntropySize(10);

  const title = formData.get("title");
  const description = formData.get("description");
  const tags = formData.get("tags");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const age = formData.get("age");
  const dateRange = formData.get("dateRange");
  const location = formData.get("location");

  try {
    await db.insert(listingTable).values({
      id: id,
      userId: user.id,
      title: title,
      description: description,
      location: location,
      tags: tags,
      email: email,
      phone: phone,
      age: age,
      dateRange: dateRange,
    });

    return { success: true };
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong." };
  }
}

export async function getListings() {
  const { user } = await validateRequest();

  if (!user) {
    return { error: "You must be logged in to view listings." };
  }

  try {
    const listings = await db
      .select()
      .from(listingTable)
      .orderBy(listingTable.createdAt, "desc");

    return { listings };
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong while fetching listings." };
  }
}
