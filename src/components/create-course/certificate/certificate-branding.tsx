
import { FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { CertificateFormValues } from "./types";

interface CertificateBrandingProps {
  logoFile: File | null;
  signatureFile: File | null;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSignatureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control: Control<CertificateFormValues>;
}

export function CertificateBranding({
  logoFile,
  signatureFile,
  onLogoUpload,
  onSignatureUpload,
  control
}: CertificateBrandingProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Certificate Branding</h4>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="logo-upload">Organization Logo</Label>
          <div className="mt-2 flex items-center gap-4">
            <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
              {logoFile ? (
                <img 
                  src={URL.createObjectURL(logoFile)} 
                  alt="Logo preview" 
                  className="max-h-full max-w-full object-contain" 
                />
              ) : (
                <FileText className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={onLogoUpload}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Recommended size: 200x200px, PNG or JPEG
              </p>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="signature-upload">Authorizing Signature</Label>
          <div className="mt-2 flex items-center gap-4">
            <div className="h-16 w-32 rounded-md border flex items-center justify-center bg-muted">
              {signatureFile ? (
                <img 
                  src={URL.createObjectURL(signatureFile)} 
                  alt="Signature preview" 
                  className="max-h-full max-w-full object-contain" 
                />
              ) : (
                <FileText className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <Input
                id="signature-upload"
                type="file"
                accept="image/*"
                onChange={onSignatureUpload}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Recommended size: 300x100px, transparent PNG
              </p>
            </div>
          </div>
        </div>
      </div>

      <FormField
        control={control}
        name="coBranding"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Co-brand with Lynera</FormLabel>
              <FormDescription>
                Display your organization logo alongside the Lynera logo
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
