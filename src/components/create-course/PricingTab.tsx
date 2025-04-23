
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, BadgeDollarSign, BadgePercent } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const pricingFormSchema = z.object({
  pricingType: z.enum(["free", "paid", "subscription"], {
    required_error: "Please select a pricing type.",
  }),
  price: z.string().optional().refine((val) => {
    if (val === undefined) return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, "Price must be a valid number"),
});

type PricingFormValues = z.infer<typeof pricingFormSchema>;

export function PricingTab() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: {
      pricingType: "free",
      price: "",
    },
  });

  const onSubmit = async (data: PricingFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting course with pricing:", data);
      toast.success("Course submitted for admin approval");
      // Here you would typically make an API call to submit the course
    } catch (error) {
      toast.error("Failed to submit course");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchPricingType = form.watch("pricingType");

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6 bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pricingType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Pricing Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="free" className="sr-only" />
                          </FormControl>
                          <div className="border-2 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                            <DollarSign className="w-6 h-6 mb-2 text-muted-foreground" />
                            <h3 className="font-medium">Free</h3>
                            <p className="text-sm text-muted-foreground">
                              Offer your course for free
                            </p>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="paid" className="sr-only" />
                          </FormControl>
                          <div className="border-2 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                            <BadgeDollarSign className="w-6 h-6 mb-2 text-muted-foreground" />
                            <h3 className="font-medium">Set Price</h3>
                            <p className="text-sm text-muted-foreground">
                              Set a fixed price
                            </p>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="subscription" className="sr-only" />
                          </FormControl>
                          <div className="border-2 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                            <BadgePercent className="w-6 h-6 mb-2 text-muted-foreground" />
                            <h3 className="font-medium">Subscription</h3>
                            <p className="text-sm text-muted-foreground">
                              For subscribers only
                            </p>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {watchPricingType === "paid" && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="Enter price"
                          type="number"
                          min="0"
                          step="0.01"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Set the price for your course (minimum $0)
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit for Approval"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
