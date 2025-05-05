
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrivacyPolicy } from "./privacy-policy";
import { BillingHistory } from "./billing-history";
import { PaymentsTab } from "./payments-tab";
import { PlansTab } from "./plans-tab";
import { CodeOfConductTab } from "./code-of-conduct";
import { SubscriptionManagement } from "./subscription-management";

export function SettingsContent() {
  return (
    <Tabs defaultValue="subscriptions" className="space-y-6">
      <TabsList className="grid grid-cols-6 w-full max-w-2xl">
        <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
        <TabsTrigger value="billing">Billing History</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="plans">Plans</TabsTrigger>
        <TabsTrigger value="conduct">Code of Conduct</TabsTrigger>
      </TabsList>

      <TabsContent value="subscriptions" className="space-y-4">
        <SubscriptionManagement />
      </TabsContent>

      <TabsContent value="privacy" className="space-y-4">
        <PrivacyPolicy />
      </TabsContent>

      <TabsContent value="billing" className="space-y-4">
        <BillingHistory />
      </TabsContent>

      <TabsContent value="payments" className="space-y-4">
        <PaymentsTab />
      </TabsContent>

      <TabsContent value="plans" className="space-y-4">
        <PlansTab />
      </TabsContent>

      <TabsContent value="conduct" className="space-y-4">
        <CodeOfConductTab />
      </TabsContent>
    </Tabs>
  );
}
