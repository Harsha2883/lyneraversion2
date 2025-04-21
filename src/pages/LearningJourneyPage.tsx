
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LearningJourneyContent } from "@/components/learning-journey/learning-journey-content";

export default function LearningJourneyPage() {
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

  return (
    <LearnerDashboard>
      <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
        <DashboardHeader 
          title="Learning Journey"
          description="Track your progress and discover recommended courses based on your learning patterns"
        />
        <LearningJourneyContent />
      </div>
    </LearnerDashboard>
  );
}
