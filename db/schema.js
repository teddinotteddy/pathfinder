import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey().notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  todo: text("todo", { mode: "json" }).default(sql`(json_array())`),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export const listingTable = sqliteTable("listing", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  tags: text("tags").default(sql`(json_array())`),
  location: text("location").notNull(),
  email: text("email"),
  phone: text("phone"),
  age: text("age").notNull(),
  dateRange: text("dateRange", { mode: "json" }).notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
});
