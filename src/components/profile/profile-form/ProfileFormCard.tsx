
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileFormCardProps {
  children: React.ReactNode;
}

export function ProfileFormCard({ children }: ProfileFormCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}
