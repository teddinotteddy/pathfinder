import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey().notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  email_verified: integer("email_verified", { mode: "boolean" })
    .default(0)
    .notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export const emailVerificationCode = sqliteTable("email_verification_code", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code"),
  user_id: text("user_id").unique().notNull(),
  email: text("email").notNull(),
  expires_at: integer("expires_at", { mode: "timestamp" }).notNull(),
});
