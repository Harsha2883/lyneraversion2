
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrivacyPolicy } from "./privacy-policy";
import { BillingHistory } from "./billing-history";
import { PaymentsTab } from "./payments-tab";
import { PlansTab } from "./plans-tab";

export function SettingsContent() {
  return (
    <Tabs defaultValue="privacy" className="space-y-6">
      <TabsList className="grid grid-cols-4 w-full max-w-2xl">
        <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
        <TabsTrigger value="billing">Billing History</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="plans">Plans</TabsTrigger>
      </TabsList>

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
    </Tabs>
  );
}
