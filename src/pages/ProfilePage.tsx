
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfilePage() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth page if not authenticated and not loading
    if (!loading && !session) {
      console.log("No active session on profile page, redirecting to auth");
      navigate("/auth");
    }
  }, [session, loading, navigate]);

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
