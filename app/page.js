import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { getListings } from "./actions";
import Listing from "./components/listing";
import Create from "./components/create";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/landing");
  }

  const { listings } = await getListings();

  return (
    <div className="homepage">
      <div className="flex flex-col items-center min-h-screen p-4">
        <div className="w-full max-w-2xl mt-14">
          <Create />
          <h1 className="text-4xl font-bold text-center text-indigo-700 pt-4">
            Listings
          </h1>
          <div className="mt-8 space-y-4">
            {listings.map((listing) => (
              <Listing key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
