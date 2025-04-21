
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfilePage() {
  return (
    <LearnerDashboard>
      <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
        <DashboardHeader 
          title="Profile"
          description="Manage your personal information"
        />
        <div className="mt-6">
          <ProfileForm />
        </div>
      </div>
    </LearnerDashboard>
  );
}
