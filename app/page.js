import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/signup");
  }

  return (
    <div>
      <h1 className="text-2xl">Pathfinder</h1>
    </div>
  );
}
