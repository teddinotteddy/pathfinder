"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";
import { verify } from "@node-rs/argon2";

export async function login(formData) {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  const password = formData.get("password");

  if (!password || typeof password !== "string") {
    return new Response(null, {
      status: 400,
    });
  }

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (!user) {
    return { error: "Invalid email or password." };
  }

  try {
    const validPassword = await verify(user[0].password_hash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return { error: "Invalid email or password." };
    }

    const session = await lucia.createSession(user[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong." };
  }
}
