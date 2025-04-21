
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { ELibraryContent } from "@/components/e-library/e-library-content";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function ELibraryPage() {
  return (
    <LearnerDashboard>
      <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
        <DashboardHeader 
          title="E-Library"
          description="Access a wide range of educational resources"
        />
        
        <div className="mt-6">
          <ELibraryContent />
        </div>
      </div>
    </LearnerDashboard>
  );
}
