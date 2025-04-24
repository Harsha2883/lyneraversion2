
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCarbonFootprint } from "./UserCarbonFootprint";
import { CarbonSettings } from "./CarbonSettings";
import { CarbonOffsetProjects } from "./CarbonOffsetProjects";

export function CarbonFootprintManagement() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Carbon Footprint Management</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor and manage the ecological impact of the platform and users
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Offset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4 tonnes</div>
            <p className="text-xs text-muted-foreground">+2.3 tonnes this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Offset Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 forest, 2 solar, 2 wind</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Of users participated</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="users">User Footprints</TabsTrigger>
          <TabsTrigger value="projects">Offset Projects</TabsTrigger>
          <TabsTrigger value="settings">Carbon Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-6">
          <UserCarbonFootprint />
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-6">
          <CarbonOffsetProjects />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <CarbonSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
