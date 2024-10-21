import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="landing flex flex-col items-center min-h-screen p-4">
      <Card className="p-48 text-center">
        <CardHeader>
          <CardTitle className="text-3xl text-indigo-700 italic underline">Welcome to Pathfinder</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-xl">Your Opportunities & Internships Hub</h1>
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
