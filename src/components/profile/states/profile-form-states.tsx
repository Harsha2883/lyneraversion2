
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileErrorProps {
  error: string;
  onRetry: () => void;
}

export function ProfileFormError({ error, onRetry }: ProfileErrorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">{error}</p>
          <Button 
            onClick={onRetry}
            className="mt-4"
          >
            Retry Loading
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileFormLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading profile data...</p>
        </div>
      </CardContent>
    </Card>
  );
}
