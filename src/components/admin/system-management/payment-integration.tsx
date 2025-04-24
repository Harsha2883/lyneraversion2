
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Edit, 
  Save, 
  CheckCircle, 
  XCircle,
  DollarSign,
  RefreshCcw,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface PaymentProvider {
  id: string;
  name: string;
  type: "credit" | "digital" | "crypto";
  status: "active" | "inactive" | "pending";
  transactionFee: string;
  supportsSubscriptions: boolean;
  supportedCurrencies: string[];
  dateAdded: string;
  lastUpdated: string;
}

interface Transaction {
  id: string;
  date: string;
  provider: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed" | "refunded";
  userId: string;
  userName: string;
}

// Mock data for payment providers
const mockPaymentProviders: PaymentProvider[] = [
  {
    id: "stripe",
    name: "Stripe",
    type: "credit",
    status: "active",
    transactionFee: "2.9% + $0.30",
    supportsSubscriptions: true,
    supportedCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
    dateAdded: "2023-08-15",
    lastUpdated: "2024-03-22"
  },
  {
    id: "paypal",
    name: "PayPal",
    type: "digital",
    status: "active",
    transactionFee: "3.49% + $0.49",
    supportsSubscriptions: true,
    supportedCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD", "JPY"],
    dateAdded: "2023-09-10",
    lastUpdated: "2024-02-15"
  },
  {
    id: "coinbase",
    name: "Coinbase Commerce",
    type: "crypto",
    status: "inactive",
    transactionFee: "1%",
    supportsSubscriptions: false,
    supportedCurrencies: ["BTC", "ETH", "USDC", "DAI"],
    dateAdded: "2023-11-05",
    lastUpdated: "2024-01-20"
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    type: "digital",
    status: "pending",
    transactionFee: "2.5%",
    supportsSubscriptions: true,
    supportedCurrencies: ["USD", "EUR", "GBP", "CAD"],
    dateAdded: "2024-02-10",
    lastUpdated: "2024-02-10"
  }
];

// Mock data for recent transactions
const mockTransactions: Transaction[] = [
  {
    id: "txn_1234",
    date: "2024-04-22",
    provider: "Stripe",
    amount: 49.99,
    currency: "USD",
    status: "completed",
    userId: "user_567",
    userName: "John Smith"
  },
  {
    id: "txn_1235",
    date: "2024-04-21",
    provider: "PayPal",
    amount: 29.99,
    currency: "USD",
    status: "completed",
    userId: "user_892",
    userName: "Emily Johnson"
  },
  {
    id: "txn_1236",
    date: "2024-04-21",
    provider: "Stripe",
    amount: 99.00,
    currency: "EUR",
    status: "completed",
    userId: "user_345",
    userName: "Michael Brown"
  },
  {
    id: "txn_1237",
    date: "2024-04-20",
    provider: "Stripe",
    amount: 49.99,
    currency: "USD",
    status: "failed",
    userId: "user_456",
    userName: "Sarah Wilson"
  },
  {
    id: "txn_1238",
    date: "2024-04-20",
    provider: "PayPal",
    amount: 19.99,
    currency: "USD",
    status: "refunded",
    userId: "user_678",
    userName: "David Martinez"
  }
];

export function PaymentIntegration() {
  const [activeTab, setActiveTab] = useState("providers");
  const [isEditingStripeModeActive, setIsEditingStripeModeActive] = useState(false);
  const [isEditingPayPalModeActive, setIsEditingPayPalModeActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  
  const handleSaveStripeConfig = () => {
    setIsEditingStripeModeActive(false);
    toast.success("Stripe configuration updated successfully");
  };
  
  const handleSavePayPalConfig = () => {
    setIsEditingPayPalModeActive(false);
    toast.success("PayPal configuration updated successfully");
  };
  
  const handleTestConnection = (provider: string) => {
    toast.success(`Test connection to ${provider} successful`);
  };
  
  const handleToggleProvider = (provider: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast.success(`${provider} is now ${newStatus}`);
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    return statusFilter === "all" || transaction.status === statusFilter;
  });

  return (
    <Card className="flex-1">
      <CardHeader className="pb-3">
        <CardTitle>Payment Integration Management</CardTitle>
        <CardDescription>
          Configure and manage payment providers and view transaction history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="providers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid grid-cols-2 w-full max-w-[400px]">
            <TabsTrigger value="providers">Payment Providers</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="providers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stripe Configuration */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Stripe
                    </CardTitle>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <CardDescription>Credit card and direct debit payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!isEditingStripeModeActive ? (
                      <>
                        <div className="space-y-1">
                          <Label>API Key</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">••••••••••••••••</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setIsEditingStripeModeActive(true)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label>Webhook Secret</Label>
                          <div className="text-muted-foreground">••••••••••••••••</div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label>Enable Subscriptions</Label>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex items-center space-x-2">
                            <Button onClick={() => handleTestConnection("Stripe")}>
                              Test Connection
                            </Button>
                            <Button variant="outline" onClick={() => handleToggleProvider("Stripe", "active")}>
                              Deactivate
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="stripe-api-key">API Key</Label>
                          <Input 
                            id="stripe-api-key" 
                            placeholder="sk_test_..." 
                            defaultValue="" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="stripe-webhook-secret">Webhook Secret</Label>
                          <Input 
                            id="stripe-webhook-secret" 
                            placeholder="whsec_..." 
                            defaultValue="" 
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="stripe-subscriptions">Enable Subscriptions</Label>
                          <Switch id="stripe-subscriptions" defaultChecked />
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex items-center space-x-2">
                            <Button onClick={handleSaveStripeConfig}>
                              <Save className="h-4 w-4 mr-2" /> Save
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setIsEditingStripeModeActive(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* PayPal Configuration */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      PayPal
                    </CardTitle>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <CardDescription>PayPal and credit card payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!isEditingPayPalModeActive ? (
                      <>
                        <div className="space-y-1">
                          <Label>Client ID</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">••••••••••••••••</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setIsEditingPayPalModeActive(true)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label>Client Secret</Label>
                          <div className="text-muted-foreground">••••••••••••••••</div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label>Sandbox Mode</Label>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex items-center space-x-2">
                            <Button onClick={() => handleTestConnection("PayPal")}>
                              Test Connection
                            </Button>
                            <Button variant="outline" onClick={() => handleToggleProvider("PayPal", "active")}>
                              Deactivate
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="paypal-client-id">Client ID</Label>
                          <Input 
                            id="paypal-client-id" 
                            placeholder="Client ID" 
                            defaultValue="" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="paypal-client-secret">Client Secret</Label>
                          <Input 
                            id="paypal-client-secret" 
                            placeholder="Client Secret" 
                            defaultValue="" 
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="paypal-sandbox">Sandbox Mode</Label>
                          <Switch id="paypal-sandbox" defaultChecked />
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex items-center space-x-2">
                            <Button onClick={handleSavePayPalConfig}>
                              <Save className="h-4 w-4 mr-2" /> Save
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setIsEditingPayPalModeActive(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">All Payment Providers</CardTitle>
                <CardDescription>Overview of all configured payment integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Provider</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Transaction Fee</TableHead>
                        <TableHead>Subscriptions</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPaymentProviders.map((provider) => (
                        <TableRow key={provider.id}>
                          <TableCell className="font-medium">{provider.name}</TableCell>
                          <TableCell className="capitalize">{provider.type}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                provider.status === "active" ? "default" : 
                                provider.status === "pending" ? "outline" : "secondary"
                              }
                              className="capitalize"
                            >
                              {provider.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{provider.transactionFee}</TableCell>
                          <TableCell>
                            {provider.supportsSubscriptions ? 
                              <CheckCircle className="h-4 w-4 text-green-500" /> : 
                              <XCircle className="h-4 w-4 text-muted-foreground" />}
                          </TableCell>
                          <TableCell>{new Date(provider.lastUpdated).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Configure</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last updated: April 24, 2024, 10:30 AM</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline">Export</Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                <CardDescription>Overview of recent payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            No transactions found matching your criteria
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">
                              {transaction.id}
                            </TableCell>
                            <TableCell>
                              {new Date(transaction.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{transaction.provider}</TableCell>
                            <TableCell>{transaction.currency} {transaction.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{transaction.userName}</div>
                                <div className="text-xs text-muted-foreground">{transaction.userId}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  transaction.status === "completed" ? "default" : 
                                  transaction.status === "pending" ? "outline" : 
                                  transaction.status === "refunded" ? "secondary" : "destructive"
                                }
                                className="capitalize"
                              >
                                {transaction.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                Details <ExternalLink className="h-3 w-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {statusFilter === "failed" && (
                  <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div className="text-sm">
                      <span className="font-medium">Failed transactions detected.</span> We recommend checking your payment provider settings or contacting support.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Transaction Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
                    <div className="text-muted-foreground mb-1">Total Revenue (Month)</div>
                    <div className="text-2xl font-bold">$2,845.99</div>
                    <div className="text-sm text-green-600">↑ 12.5% from last month</div>
                  </div>
                  
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
                    <div className="text-muted-foreground mb-1">Success Rate</div>
                    <div className="text-2xl font-bold">97.8%</div>
                    <div className="text-sm text-green-600">↑ 1.2% from last month</div>
                  </div>
                  
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
                    <div className="text-muted-foreground mb-1">Average Transaction</div>
                    <div className="text-2xl font-bold">$49.85</div>
                    <div className="text-sm text-yellow-600">↓ 2.3% from last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
