
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export function CertificatesTab() {
  // Mocked data for demonstration
  const certificates = [
    { 
      id: 1, 
      title: "Introduction to Sustainability", 
      issueDate: "2023-12-15", 
      organization: "EcoLearn Academy" 
    },
    { 
      id: 2, 
      title: "Carbon Footprint Reduction", 
      issueDate: "2024-02-20", 
      organization: "Global Green Initiative" 
    }
  ];

  return (
    <div className="mt-6 grid gap-4">
      {certificates.map((certificate) => (
        <Card key={certificate.id}>
          <CardHeader className="flex flex-row items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">{certificate.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Issued: {certificate.issueDate}</p>
              <p className="text-muted-foreground">
                Issued by: {certificate.organization}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
