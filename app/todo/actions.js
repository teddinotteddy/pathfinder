"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/schema";
import { getTodos } from "../actions";

export async function removeTodo(listingId, userId) {
  try {
    let currentTodos = await getTodos(userId);

    if (typeof currentTodos === "string") {
      currentTodos = JSON.parse(currentTodos);
    }

    const updatedTodos = currentTodos.filter((todoId) => todoId !== listingId);

    await db
      .update(userTable)
      .set({ todo: updatedTodos })
      .where(eq(userTable.id, userId));

    return { success: true, message: "Todo removed successfully." };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong while removing the todo." };
  }
}
