import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "@/db";
import { emailVerificationCode } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(email) {
  return /.+@.+/.test(email);
}

export async function generateEmailVerificationCode(userId, email) {
  await db
    .delete(emailVerificationCode)
    .where(eq(emailVerificationCode.user_id, userId));

  const code = generateRandomString(8, alphabet("0-9"));

  await db.insert(emailVerificationCode).values({
    user_id: userId,
    email: email,
    code: code,
    expires_at: createDate(new TimeSpan(15, "m")),
  });

  return code;
}

export async function sendVerificationCode(email, code) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${url}/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send verification code/");
    }

    return data;
  } catch (e) {
    console.log(e);

    return { error: "Failed to send verification code." };
  }
}

export async function verifyVerificationCode(user, code) {
  const databaseCode = await db
    .select(emailVerificationCode)
    .where(eq(emailVerificationCode.user_id, user.id));

  if (!databaseCode || databaseCode.code !== code) {
    return false;
  }

  await db
    .delete(emailVerificationCode)
    .where(eq(emailVerificationCode.user_id, user.id));

  if (!isWithinExpirationDate(databaseCode.expires_at)) {
    return false;
  }
  if (databaseCode.email !== user.email) {
    return false;
  }

  return true;
}
