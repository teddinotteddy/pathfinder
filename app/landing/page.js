import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="landing flex flex-col items-center min-h-screen p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-700">Pathfinder</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground max-w-screen-md">
            If you're looking for volunteering and internship opportunities,
            Pathfinder is your catalog. If you're looking for volunteers or
            bright people willing to learn, Pathfinder is your catalog.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
