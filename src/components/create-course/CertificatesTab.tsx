
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateSelection } from "./certificate/template-selection";
import { CertificateBranding } from "./certificate/certificate-branding";
import { CertificateSettings } from "./certificate/certificate-settings";
import { CertificatePreview } from "./certificate/certificate-preview";
import { certificateFormSchema, type CertificateFormValues } from "./certificate/types";
import { toast } from "sonner";

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
    toast.success("Certificate settings saved successfully");
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <TemplateSelection
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={(template) => {
                  setSelectedTemplate(template);
                  form.setValue("templateType", template);
                }}
                control={form.control}
              />

              <CertificateBranding
                logoFile={logoFile}
                signatureFile={signatureFile}
                onLogoUpload={handleLogoUpload}
                onSignatureUpload={handleSignatureUpload}
                control={form.control}
              />

              <CertificateSettings control={form.control} />

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button">Cancel</Button>
                <Button type="submit">Save Certificate Settings</Button>
              </div>
            </div>

            <div className="lg:sticky lg:top-6">
              <CertificatePreview 
                values={form.getValues()} 
                logoFile={logoFile}
                signatureFile={signatureFile}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
