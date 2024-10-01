"use server";

import { validateRequest } from "@/lib/validate-request";
import { lucia } from "@/lib/auth";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function emailVerification(formData) {
  const { user } = await validateRequest();

  if (!user) {
    return { error: 401 };
  }

  const code = formData.get("code");
  if (typeof code !== "string") {
    return { error: 400 };
  }

  const validCode = await verifyVerificationCode(user, code);
  if (!validCode) {
    return { error: 400 };
  }

  await lucia.invalidateUserSessions(user.id);
  await db
    .update(userTable)
    .set({ email_verified: true })
    .where(eq(userTable.id, user.id));

  const session = await lucia.createSession(user[0].id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return { success: true };
}
