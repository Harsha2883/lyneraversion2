
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemUsersManagement } from "./system-users-management";
import { PaymentIntegration } from "./payment-integration";
import { SystemAuditLogs } from "./system-audit-logs";

export function SystemManagement() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Internal System Management</CardTitle>
        <CardDescription>
          Manage users, roles, payment integrations, and monitor system activity
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2 h-auto sm:h-10">
            <TabsTrigger value="users">User & Role Management</TabsTrigger>
            <TabsTrigger value="payments">Payment Integration</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-0 space-y-6">
            <SystemUsersManagement />
          </TabsContent>
          
          <TabsContent value="payments" className="mt-0 space-y-6">
            <PaymentIntegration />
          </TabsContent>
          
          <TabsContent value="audit" className="mt-0 space-y-6">
            <SystemAuditLogs />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
