"use client";

import { Button } from "@/components/ui/button";
import { Cross2Icon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransition } from "react";
import { removeTodo } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function Item({ listing, user }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      const response = await removeTodo(listing.id, user.id);

      if (response.error) {
        console.error(response.error);
      } else {
        toast({
          title: "Success",
          description: "Removed listing from to-do's.",
        });

        router.refresh();
      }
    });
  };

  const openListing = async () => {
    router.push(`/listings/${listing.id}`);
  };

  return (
    <div className="relative group">
      <Button
        size="icon"
        variant="destructive"
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleClick}
        disabled={isPending}
      >
        <Cross2Icon className="w-6 h-6" />
      </Button>
      <Button
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={openListing}
      >
        <OpenInNewWindowIcon className="w-6 h-6" />
      </Button>
      <Card className="group-hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{listing.title}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
