import { validateRequest } from "@/lib/validate-request";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function Header() {
  const { user } = await validateRequest();

  return (
    <div className="pb-2">
      <div className="flex justify-between">
        <Link href="/" className="pb-2">
          <Button
            variant="ghost"
            className="text-3xl font-bold p-4 text-indigo-700 hover:text-indigo-700"
          >
            Pathfinder
          </Button>
        </Link>
        {!user ? (
          <div className="space-x-2">
            <Link href="/login">
              <Button className="text-lg p-4" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="text-lg p-4">Signup</Button>
            </Link>
          </div>
        ) : (
          <div className="space-x-2">
            <Link href="/todo">
              <Button className="text-lg p-4" variant="outline">
                Todo
              </Button>
            </Link>
            <Link href="/account">
              <Button className="text-lg p-4">Account</Button>
            </Link>
          </div>
        )}
      </div>
      <Separator />
    </div>
  );
}
