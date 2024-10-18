import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="landing flex flex-col items-center min-h-screen p-4">
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
