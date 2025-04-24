
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Server, Activity, Shield, Users, Settings, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function InternalSystemTab() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Internal System Management</CardTitle>
        <CardDescription>
          Monitor system health, manage configurations, and control access permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid grid-cols-4 max-w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Server className="h-4 w-4 mr-2" />
                    System Load
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32%</div>
                  <div className="mt-2">
                    <Progress value={32} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Average over last 24 hours
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Database className="h-4 w-4 mr-2" />
                    Database Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="font-medium">Healthy</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Latest backup: 4 hours ago
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Storage: 68% used
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Activity className="h-4 w-4 mr-2" />
                    API Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.4M</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    +15% from last week
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Average response: 120ms
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <div>
                      <div className="font-medium">High CPU usage detected</div>
                      <div className="text-xs text-muted-foreground">Today, 14:32 - Server ID: srv-0542</div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      View
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="font-medium">Failed login attempts threshold reached</div>
                      <div className="text-xs text-muted-foreground">Today, 10:15 - IP: 192.168.1.105</div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Investigate
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Scheduled maintenance</div>
                      <div className="text-xs text-muted-foreground">Tomorrow, 02:00 - 04:00 UTC</div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-2">
              <Button>System Settings</Button>
              <Button variant="outline">Generate Report</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="servers">
            <div className="text-center py-8 text-muted-foreground">
              Server management content would go here
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="text-center py-8 text-muted-foreground">
              Security management content would go here
            </div>
          </TabsContent>
          
          <TabsContent value="logs">
            <div className="text-center py-8 text-muted-foreground">
              System logs content would go here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
