
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Coins } from "lucide-react";

interface JourneyStats {
  certificatesAwarded: number;
  coursesConducted: number;
  tokensGenerated: number;
}

// Mock data - replace with real data from API
const mockStats: JourneyStats = {
  certificatesAwarded: 150,
  coursesConducted: 12,
  tokensGenerated: 5000
};

export function CreatorJourneyContent() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Creator Journey</h1>
      <p className="text-muted-foreground">
        Track your impact and progress as a course creator
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Certificates Awarded</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.certificatesAwarded}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Courses Conducted</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.coursesConducted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tokens Generated</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.tokensGenerated}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
