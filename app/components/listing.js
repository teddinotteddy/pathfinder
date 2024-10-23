"use client";

import { useTransition } from "react";
import { addTodo, deleteListing as deleteListingAction } from "../actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Listing({ listing, todos, page, userId }) {
  const { toast } = useToast();

  if (page !== true) {
    page = false;
  }

  const tags = JSON.parse(listing.tags);
  const date = JSON.parse(listing.dateRange);
  const deadline = JSON.parse(listing.deadline);

  const isInTodos = todos.includes(listing.id);

  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  let deleteable = false;

  if (listing.userId === userId) {
    deleteable = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData(event.target);

      try {
        await addTodo(formData);

        toast({
          title: "Success",
          description: "To-do item added successfully!",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add to-do item.",
          variant: "destructive",
        });
      }
    });
  };

  const handleDeleteListing = (event) => {
    event.preventDefault();

    startDeleteTransition(async () => {
      const formData = new FormData(event.target);

      try {
        await deleteListingAction(formData);

        toast({
          title: "Success",
          description: "Listing item deleted successfully.",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete listing.",
          variant: "destructive",
        });
      }
    });
  };

  const formattedDeadline =
    formatDate(deadline) === "12/31/1969"
      ? "No deadline"
      : formatDate(deadline);

  return (
    <div>
      <Card className="max-w-screen-md">
        <CardHeader>
          <CardTitle>{listing.title}</CardTitle>
          <CardDescription>{listing.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="space-y-1">
              <h1 className="font-bold">Location</h1>
              <p className="text-sm">{listing.location}</p>
            </div>
            <div className="space-y-1">
              <h1 className="font-bold">Contact</h1>
              <p className="text-sm">{listing.email}</p>
              <p className="text-sm">{listing.phone}</p>
              <p className="text-sm">{listing.website}</p>
            </div>
            {tags.length > 0 && (
              <div className="space-x-1 space-y-1">
                <h1 className="font-bold">Tags</h1>
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <div className="space-y-1">
              <h1 className="font-bold">Age Requirement</h1>
              <p className="text-sm">{listing.age}</p>
            </div>
            <div className="space-y-1 pb-2">
              <h1 className="font-bold">Date / Deadline</h1>
              <p className="text-sm">
                {formatDate(date.from)} {`\u2192`} {formatDate(date.to)}
              </p>
              <p className="text-sm">{formattedDeadline}</p>
            </div>
            <div className="flex justify-between">
              {!page && (
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="id" value={listing.id} />
                  <Button disabled={isInTodos || isPending}>
                    {isPending
                      ? "Adding..."
                      : isInTodos
                        ? "Added"
                        : "Add to To-Do"}
                  </Button>
                </form>
              )}
              {deleteable && (
                <form onSubmit={handleDeleteListing}>
                  <input type="hidden" name="id" value={listing.id} />
                  <Button variant="destructive" disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
