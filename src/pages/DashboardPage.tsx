
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { CreatorDashboard } from "@/components/dashboard/creator-dashboard";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !profile) {
      navigate("/auth");
    }
  }, [loading, profile, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) return null;

  return profile.user_type === "learner" ? (
    <LearnerDashboard>
      <DashboardContent />
    </LearnerDashboard>
  ) : (
    <CreatorDashboard />
  );
}
