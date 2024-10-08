import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import Create from "./components/create";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/signup");
  }

  return (
    <div>
      <Create />
    </div>
  );
}
