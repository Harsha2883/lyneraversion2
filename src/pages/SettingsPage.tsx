
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { SettingsContent } from "@/components/settings/settings-content";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function SettingsPage() {
  return (
    <LearnerDashboard>
      <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
        <DashboardHeader 
          title="Settings"
          description="Manage your account settings and preferences"
        />
        <div className="mt-6">
          <SettingsContent />
        </div>
      </div>
    </LearnerDashboard>
  );
}
