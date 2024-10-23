"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { listingTable, userTable } from "@/db/schema";
import { generateIdFromEntropySize } from "lucia";
import { validateRequest } from "@/lib/validate-request";
import { revalidatePath } from "next/cache";

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
  const website = formData.get("website");
  const dateRange = formData.get("dateRange");
  const deadline = formData.get("deadline");
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
      website: website,
      dateRange: dateRange,
      deadline: deadline,
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

export async function getListing(id) {
  try {
    const listing = await db
      .select()
      .from(listingTable)
      .where(eq(listingTable.id, id));

    return listing[0];
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong while fetching listing." };
  }
}

export async function deleteListing(formData) {
  const id = formData.get("id");

  try {
    await db.delete(listingTable).where(eq(listingTable.id, id));

    revalidatePath("/");

    return { success: true };
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong while deleting the listing." };
  }
}

export async function addTodo(formData) {
  const { user } = await validateRequest();

  if (!user) {
    return { error: "You must be logged in to add a todo." };
  }

  const id = formData.get("id");

  try {
    const currentTodo = await db
      .select({
        todo: userTable.todo,
      })
      .from(userTable)
      .where(eq(userTable.id, user.id));

    let todoList = currentTodo[0]?.todo;

    if (typeof todoList === "string") {
      todoList = JSON.parse(todoList);
    }

    todoList.push(id);

    await db
      .update(userTable)
      .set({ todo: JSON.stringify(todoList) })
      .where(eq(userTable.id, user.id));

    revalidatePath("/");

    return { success: true };
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong while adding to your todo list." };
  }
}

export async function getTodos(userId) {
  try {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    return user[0].todo;
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong while fetching todos." };
  }
}
