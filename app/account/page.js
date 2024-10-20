import { logout } from "./actions";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Account() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="account flex flex-col items-center min-h-screen">
      <Card className="w-full max-w-2xl mt-14">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <h1>{user.email}</h1>
            </div>
            <form action={logout}>
              <Button type="submit">Logout</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
