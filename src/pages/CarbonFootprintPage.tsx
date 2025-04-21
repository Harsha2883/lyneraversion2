
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CarbonFootprint } from "@/components/dashboard/carbon-footprint";
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";

export default function CarbonFootprintPage() {
  return (
    <LearnerDashboard>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <DashboardHeader 
          title="Carbon Footprint"
          description="Track and offset your learning carbon footprint"
        />
        <div className="mt-6">
          <CarbonFootprint />
        </div>
      </div>
    </LearnerDashboard>
  );
}
