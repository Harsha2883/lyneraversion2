
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Receipt } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const taxIdSchema = z.object({
  tax_id: z.string().min(1, "Tax ID is required"),
});

export function BillingHistory() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taxInfo, setTaxInfo] = useState(null);

  const form = useForm({
    resolver: zodResolver(taxIdSchema),
    defaultValues: {
      tax_id: "",
    },
  });

  useEffect(() => {
    if (user) {
      fetchTransactions();
      fetchTaxInfo();
    }
  }, [user]);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load transactions");
      return;
    }
    setTransactions(data || []);
  };

  const fetchTaxInfo = async () => {
    const { data, error } = await supabase
      .from("billing_info")
      .select("*")
      .maybeSingle();

    if (!error && data) {
      setTaxInfo(data);
      form.setValue("tax_id", data.tax_id || "");
    }
  };

  const onSubmitTaxId = async (values) => {
    const { error } = await supabase
      .from("billing_info")
      .upsert({ 
        user_id: user.id,
        tax_id: values.tax_id,
      });

    if (error) {
      toast.error("Failed to save tax ID");
      return;
    }

    toast.success("Tax ID saved successfully");
    setIsDialogOpen(false);
    fetchTaxInfo();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Billing History</CardTitle>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          <Receipt className="h-4 w-4 mr-2" />
          Tax ID
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">
                  {transaction.amount} {transaction.currency}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Invoice: #{transaction.invoice_number}
                </p>
              </div>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tax ID Information</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitTaxId)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="tax_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your tax ID" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
