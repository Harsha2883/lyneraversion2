
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreatorsTab } from "./tabs/creators-tab";
import { LearnersTab } from "./tabs/learners-tab";
import { InternalSystemTab } from "./tabs/internal-system-tab";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

export function MasterAdminTabs() {
  const [activeTab, setActiveTab] = useState("creators");
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="creators" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6 grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="creators">Creators</TabsTrigger>
        <TabsTrigger value="learners">Learners</TabsTrigger>
        <TabsTrigger value="system">Internal System</TabsTrigger>
      </TabsList>
      
      <TabsContent value="creators">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Management
            </CardTitle>
            <CardDescription>
              Review, approve, and manage courses submitted by creators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{5}</div>
                  <p className="text-sm text-muted-foreground">Courses pending review</p>
                </div>
                <Button onClick={() => navigate("/admin/courses")}>
                  Manage Courses
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
