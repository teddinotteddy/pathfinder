import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { getListings, getTodos } from "./actions";
import Create from "./components/create";
import Search from "./components/search";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/landing");
  }

  const { listings } = await getListings();
  let todos = await getTodos(user.id);

  if (typeof todos === "string") {
    todos = JSON.parse(todos);
  }

  return (
    <div className="homepage">
      <div className="flex flex-col items-center min-h-screen p-4">
        <div className="w-full max-w-2xl mt-14">
          <Create />
          <h1 className="text-4xl font-bold text-center text-indigo-700 pt-4">
            Listings
          </h1>
          <Search listings={listings} todos={todos} userId={user.id} />
        </div>
      </div>
    </div>
  );
}
