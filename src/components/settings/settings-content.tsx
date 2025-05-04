import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountTab } from "./account-tab"
import { SecurityTab } from "./security-tab"

// Import our new component
import { SubscriptionManagement } from "./subscription-management";
import { PaymentsTab } from "./payments-tab";
import { PlansTab } from "./plans-tab";

export function SettingsContent() {
  return (
    <Tabs defaultValue="account" className="space-y-4">
      <TabsList className="grid grid-cols-4 max-w-md gap-4">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-4">
        <AccountTab />
      </TabsContent>
      <TabsContent value="subscriptions" className="space-y-4">
        <SubscriptionManagement />
        <PlansTab />
      </TabsContent>
      <TabsContent value="payments" className="space-y-4">
        <PaymentsTab />
      </TabsContent>
      <TabsContent value="security" className="space-y-4">
        <SecurityTab />
      </TabsContent>
    </Tabs>
  )
}
