"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { lucia } from "@/lib/auth";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { isValidEmail } from "@/lib/utils";
import { userTable } from "@/db/schema";

export async function signup(formData) {
  const email = formData.get("email");

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  const password = formData.get("password");
  if (!password || typeof password !== "string" || password.length < 6) {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  try {
    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
    
    const userId = generateIdFromEntropySize(10);

    await db.insert(userTable).values({
      id: userId,
      email: email,
      password_hash: passwordHash,
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true }
  } catch (e) {
    console.log(e);
    
    return { error: "Something went wrong."}
  }
}
