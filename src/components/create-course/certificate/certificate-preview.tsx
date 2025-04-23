
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { CertificateFormValues } from "./types";

interface CertificatePreviewProps {
  values: CertificateFormValues;
  logoFile: File | null;
  signatureFile: File | null;
}

export function CertificatePreview({ values, logoFile, signatureFile }: CertificatePreviewProps) {
  const getTemplatePreviewUrl = () => {
    switch (values.templateId) {
      case "lynera-1":
        return "/placeholder.svg";
      case "lynera-2":
        return "/placeholder.svg";
      case "iicsr-1":
        return "/placeholder.svg";
      case "actd-pro":
        return "/placeholder.svg";
      case "eahea-standard":
        return "/placeholder.svg";
      case "mepsc-official":
        return "/placeholder.svg";
      default:
        return "/placeholder.svg";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4" />
        <h4 className="text-md font-medium">Certificate Preview</h4>
      </div>
      
      <Card className="relative overflow-hidden bg-white">
        <div className="aspect-[1.414/1] w-full relative">
          <img
            src={getTemplatePreviewUrl()}
            alt="Certificate template preview"
            className="absolute inset-0 w-full h-full object-contain"
          />
          
          {/* Logo overlay */}
          {logoFile && (
            <div className="absolute top-4 right-4 h-16 w-16">
              <img
                src={URL.createObjectURL(logoFile)}
                alt="Organization logo"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          {/* Signature overlay */}
          {signatureFile && (
            <div className="absolute bottom-8 right-8 h-12 w-32">
              <img
                src={URL.createObjectURL(signatureFile)}
                alt="Authorizing signature"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          {/* Blockchain badge */}
          {values.enableBlockchain && (
            <div className="absolute bottom-4 left-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">
              Blockchain Verified
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
