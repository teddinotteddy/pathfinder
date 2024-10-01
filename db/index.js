import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: "libsql://pathfinder-teddinotteddy.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
