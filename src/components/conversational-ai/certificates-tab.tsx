
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { award } from "lucide-react";

export function CertificatesTab() {
  // Mocked data for demonstration
  const certificates = [
    { 
      id: 1, 
      title: "Sustainability Expert", 
      issueDate: "2024-03-15",
      validUntil: "2025-03-15"
    },
    { 
      id: 2, 
      title: "Environmental Management", 
      issueDate: "2024-02-01",
      validUntil: "2025-02-01"
    }
  ];

  return (
    <div className="mt-6 grid gap-4">
      {certificates.map((certificate) => (
        <Card key={certificate.id}>
          <CardHeader className="flex flex-row items-center gap-2">
            <award className="h-4 w-4 text-yellow-500" />
            <CardTitle className="text-lg">{certificate.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</p>
              <p>Valid until: {new Date(certificate.validUntil).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
