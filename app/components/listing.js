import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export default function Listing({ listing }) {
  const tags = JSON.parse(listing.tags);
  const date = JSON.parse(listing.dateRange);

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
            </div>
            {tags.length > 0 && (
              <div className="space-x-1 space-y-1">
                <h1 className=" font-bold">Tags</h1>
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
            <div className="space-y-1">
              <h1 className="font-bold">Dates</h1>
              <p className="text-sm">
                {formatDate(date.from)} {`\u2192`} {formatDate(date.to)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
