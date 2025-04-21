
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function BillingHistory() {
  const transactions = [
    {
      id: "inv_001",
      date: "2024-04-15",
      amount: "$29.99",
      description: "Monthly Premium Subscription",
      invoice: "#INV-2024-001",
    },
    {
      id: "inv_002",
      date: "2024-03-15",
      amount: "$29.99",
      description: "Monthly Premium Subscription",
      invoice: "#INV-2024-002",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
                <p className="text-sm text-muted-foreground">
                  Invoice: {transaction.invoice}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">{transaction.amount}</p>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
