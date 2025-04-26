import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentsTab } from "./payments-tab";
import { PlansTab } from "./plans-tab";
import { PrivacyPolicy } from "./privacy-policy";
import { CodeOfConductTab } from "./code-of-conduct";
import { BillingHistory } from "./billing-history";
import { CheckSubscription } from "./check-subscription";

export function SettingsContent() {
  return (
    <Tabs defaultValue="plans" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="conduct">Code of Conduct</TabsTrigger>
        </TabsList>
        
        <CheckSubscription />
      </div>
      
      <TabsContent value="plans" className="space-y-4">
        <PlansTab />
      </TabsContent>
      
      <TabsContent value="payments" className="space-y-4">
        <PaymentsTab />
      </TabsContent>
      
      <TabsContent value="billing" className="space-y-4">
        <BillingHistory />
      </TabsContent>
      
      <TabsContent value="privacy" className="space-y-4">
        <PrivacyPolicy />
      </TabsContent>
      
      <TabsContent value="conduct" className="space-y-4">
        <CodeOfConductTab />
      </TabsContent>
    </Tabs>
  );
}
