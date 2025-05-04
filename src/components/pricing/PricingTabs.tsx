
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearnerPlans } from './LearnerPlans';
import { CreatorPlans } from './CreatorPlans';
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useAuth } from "@/hooks/useAuth";

export function PricingTabs() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Set the active tab based on user profile
  useEffect(() => {
    if (profile?.user_type) {
      setActiveTab(profile.user_type);
    } else {
      setActiveTab("learner"); // Default to learner if no profile
    }
  }, [profile]);

  // Don't render until we know which tab to show
  if (!activeTab) return null;

  return (
    <Tabs value={activeTab} className="max-w-5xl mx-auto">
      {/* Only show the tabs list if no profile (allow switching for non-logged in users) */}
      {!profile && (
        <TabsList className="grid grid-cols-2 w-[300px] mx-auto mb-8">
          <TabsTrigger value="learner" onClick={() => setActiveTab("learner")}>Learner</TabsTrigger>
          <TabsTrigger value="creator" onClick={() => setActiveTab("creator")}>Creator</TabsTrigger>
        </TabsList>
      )}

      <TabsContent value="learner">
        <ErrorBoundary>
          <LearnerPlans />
        </ErrorBoundary>
      </TabsContent>

      <TabsContent value="creator">
        <ErrorBoundary>
          <CreatorPlans />
        </ErrorBoundary>
      </TabsContent>
    </Tabs>
  );
}
