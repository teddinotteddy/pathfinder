import { Button } from "@/components/ui/button";
import { logout } from "./actions";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

export default async function Account() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Account</h1>
      <Button type="submit" action={logout}>
        Logout
      </Button>
    </div>
  );
}
