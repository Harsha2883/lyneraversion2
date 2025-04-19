
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function RecentActivity() {
  // Mocked data for demonstration
  const activities = [
    {
      id: 1,
      title: "Completed ESG Reporting module",
      type: "course",
      date: "Today",
      time: "10:30 AM",
    },
    {
      id: 2,
      title: "Scored 92% on Carbon Assessment",
      type: "assessment",
      date: "Yesterday",
      time: "4:15 PM",
    },
    {
      id: 3,
      title: "Started Supply Chain Management course",
      type: "course",
      date: "Apr 18",
      time: "9:45 AM",
    },
    {
      id: 4,
      title: "Earned Sustainable Business Badge",
      type: "achievement",
      date: "Apr 15",
      time: "2:30 PM",
    },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mt-0.5 min-w-10 rounded-full border border-primary/20 bg-primary/10 p-1 text-center text-xs">
                {activity.date}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
