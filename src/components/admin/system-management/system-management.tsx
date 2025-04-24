
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemUsersManagement } from "./users/SystemUsersManagement";
import { PaymentIntegration } from "./payment/PaymentIntegration";
import { SystemAuditLogs } from "./audit/SystemAuditLogs";
import { RoleManagement } from "./roles/RoleManagement";
import { CarbonFootprintManagement } from "./carbon/CarbonFootprintManagement";

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
          <TabsList className="mb-6 grid grid-cols-1 sm:grid-cols-5 gap-2 h-auto sm:h-10">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="roles">Role Management</TabsTrigger>
            <TabsTrigger value="payments">Payment Integration</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="carbon">Carbon Footprint</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-0 space-y-6">
            <SystemUsersManagement />
          </TabsContent>
          
          <TabsContent value="roles" className="mt-0 space-y-6">
            <RoleManagement />
          </TabsContent>
          
          <TabsContent value="payments" className="mt-0 space-y-6">
            <PaymentIntegration />
          </TabsContent>
          
          <TabsContent value="audit" className="mt-0 space-y-6">
            <SystemAuditLogs />
          </TabsContent>
          
          <TabsContent value="carbon" className="mt-0 space-y-6">
            <CarbonFootprintManagement />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
