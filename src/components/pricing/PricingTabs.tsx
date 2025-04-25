
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearnerPlans } from './LearnerPlans';
import { CreatorPlans } from './CreatorPlans';

export function PricingTabs() {
  return (
    <Tabs defaultValue="learner" className="max-w-5xl mx-auto">
      <TabsList className="grid grid-cols-2 w-[300px] mx-auto mb-8">
        <TabsTrigger value="learner">Learner</TabsTrigger>
        <TabsTrigger value="creator">Creator</TabsTrigger>
      </TabsList>

      <TabsContent value="learner">
        <LearnerPlans />
      </TabsContent>

      <TabsContent value="creator">
        <CreatorPlans />
      </TabsContent>
    </Tabs>
  );
}
