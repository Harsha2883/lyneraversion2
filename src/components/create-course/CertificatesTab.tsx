
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Book, BookText, Upload, Shield, FileText } from "lucide-react";

const certificateFormSchema = z.object({
  templateType: z.enum(["standard", "premium"]),
  templateId: z.string(),
  enableBlockchain: z.boolean(),
  minGradeToIssue: z.string(),
  coBranding: z.boolean(),
});

type CertificateFormValues = z.infer<typeof certificateFormSchema>;

export function CertificatesTab() {
  const [selectedTemplate, setSelectedTemplate] = useState<"standard" | "premium">("standard");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      templateType: "standard",
      templateId: "lynera-1",
      enableBlockchain: false,
      minGradeToIssue: "70",
      coBranding: false,
    },
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSignatureFile(file);
    }
  };

  const onSubmit = (data: CertificateFormValues) => {
    console.log("Certificate data:", data, { logoFile, signatureFile });
    // Here you would handle the submission, including the logo and signature files
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-medium">Certificate Management</h3>
        <p className="text-sm text-muted-foreground">
          Configure the certificates that will be issued to learners who complete this course.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-md font-medium">Template Selection</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`p-4 cursor-pointer ${selectedTemplate === "standard" ? "ring-2 ring-primary" : ""}`}
                onClick={() => {
                  setSelectedTemplate("standard");
                  form.setValue("templateType", "standard");
                }}
              >
                <div className="flex items-center gap-2">
                  <BookText className="h-5 w-5 text-primary" />
                  <div className="font-medium">Lynera Standard Templates</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  IICSR/Lynera format certificates - included with all courses
                </p>
              </Card>

              <Card 
                className={`p-4 cursor-pointer ${selectedTemplate === "premium" ? "ring-2 ring-primary" : ""}`}
                onClick={() => {
                  setSelectedTemplate("premium");
                  form.setValue("templateType", "premium");
                }}
              >
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  <div className="font-medium">Premium Templates</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Premium templates from ACTD, EAHEA, MEPSC (paid options)
                </p>
              </Card>
            </div>

            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedTemplate === "standard" ? (
                        <>
                          <SelectItem value="lynera-1">Lynera Standard 1</SelectItem>
                          <SelectItem value="lynera-2">Lynera Standard 2</SelectItem>
                          <SelectItem value="iicsr-1">IICSR Certificate</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="actd-pro">ACTD Professional</SelectItem>
                          <SelectItem value="eahea-standard">EAHEA Standard</SelectItem>
                          <SelectItem value="mepsc-official">MEPSC Official</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {selectedTemplate === "premium" && 
                      "Premium templates require additional payment for each certificate issued."
                    }
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

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
                      onChange={handleLogoUpload}
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
                      onChange={handleSignatureUpload}
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
              control={form.control}
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

          <div className="space-y-4">
            <h4 className="text-md font-medium">Certificate Settings</h4>
            
            <FormField
              control={form.control}
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
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Learners must achieve this minimum grade to receive a certificate
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
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

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button">Cancel</Button>
            <Button type="submit">Save Certificate Settings</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
