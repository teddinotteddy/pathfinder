import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey().notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});
