
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function MarketplacePage() {
  return (
    <LearnerDashboard>
      <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
        <DashboardHeader 
          title="Explore Courses" 
          description="Browse and enroll in new learning opportunities"
        />
        
        <div className="mt-6">
          {/* TODO: Add course marketplace content */}
          <p className="text-muted-foreground">Course marketplace coming soon...</p>
        </div>
      </div>
    </LearnerDashboard>
  );
}
