
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreatorsTab } from "./tabs/creators-tab";
import { LearnersTab } from "./tabs/learners-tab";
import { InternalSystemTab } from "./tabs/internal-system-tab";

export function MasterAdminTabs() {
  const [activeTab, setActiveTab] = useState("creators");

  return (
    <Tabs defaultValue="creators" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6 grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="creators">Creators</TabsTrigger>
        <TabsTrigger value="learners">Learners</TabsTrigger>
        <TabsTrigger value="system">Internal System</TabsTrigger>
      </TabsList>
      
      <TabsContent value="creators">
        <CreatorsTab />
      </TabsContent>
      
      <TabsContent value="learners">
        <LearnersTab />
      </TabsContent>
      
      <TabsContent value="system">
        <InternalSystemTab />
      </TabsContent>
    </Tabs>
  );
}
