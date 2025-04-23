
import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { CertificateFormValues } from "./types";

interface CertificateSettingsProps {
  control: Control<CertificateFormValues>;
}

export function CertificateSettings({ control }: CertificateSettingsProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Certificate Settings</h4>
      
      <FormField
        control={control}
        name="minGradeToIssue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimum Grade to Issue Certificate</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  {...field}
                  className="w-20"
                  aria-describedby="grade-error"
                />
                <span className="ml-2">%</span>
              </div>
            </FormControl>
            <FormDescription>
              Learners must achieve this minimum grade to receive a certificate
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="enableBlockchain"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <FormLabel className="text-base">Enable Blockchain Certificate</FormLabel>
              </div>
              <FormDescription>
                Issue tamper-proof blockchain-verified certificates
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
