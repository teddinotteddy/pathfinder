import { getListing, getTodos } from "@/app/actions";
import { validateRequest } from "@/lib/validate-request";

import Listing from "@/app/components/listing";

export default async function ListingPage({ params }) {
  const { user } = await validateRequest();

  const listingObject = await getListing(params.slug);
  const todos = await getTodos(user.id);

  return (
    <div className="listing-page flex flex-col items-center min-h-screen p-4">
      <div className="mt-14">
        <Listing listing={listingObject} todos={todos} page={true} />
      </div>
    </div>
  );
}
