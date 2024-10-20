import { getListing, getTodos } from "../actions";
import { validateRequest } from "@/lib/validate-request";
import Item from "./item";
import { redirect } from "next/navigation";

export default async function Todo() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  let todos = await getTodos(user.id);

  if (typeof todos === "string") {
    todos = JSON.parse(todos);
  }

  const listings = await Promise.all(
    todos.map(async (todo) => {
      const listing = await getListing(todo);

      return listing;
    }),
  );

  return (
    <div className="todo flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold text-center text-indigo-700 mt-14">
        To-Do
      </h1>
      <div className="space-y-2 pt-2">
        {listings.length === 0 ? (
          <p className="text-center text-muted-foreground">No to-do's</p>
        ) : (
          listings.map((listing) => (
            <Item key={listing.id} listing={listing} user={user} />
          ))
        )}
      </div>
    </div>
  );
}
