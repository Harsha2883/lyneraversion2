
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearnerPlans } from './LearnerPlans';
import { CreatorPlans } from './CreatorPlans';
import { ErrorBoundary } from "@/components/ui/error-boundary";

export function PricingTabs() {
  return (
    <Tabs defaultValue="learner" className="max-w-5xl mx-auto">
      <TabsList className="grid grid-cols-2 w-[300px] mx-auto mb-8">
        <TabsTrigger value="learner">Learner</TabsTrigger>
        <TabsTrigger value="creator">Creator</TabsTrigger>
      </TabsList>

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
