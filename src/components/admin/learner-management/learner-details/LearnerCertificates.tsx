
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DataTable } from "../../shared/components/data-table/DataTable";
import { formatDate } from "../../shared/utils/format-utils";
import type { Certificate } from "../../types/learner.types";

interface LearnerCertificatesProps {
  certificates: Certificate[];
}

export function LearnerCertificates({ certificates }: LearnerCertificatesProps) {
  const handleDownloadCertificate = (id: string) => {
    // In a real app, this would download the certificate
    console.log(`Downloading certificate ${id}`);
  };

  const columns = [
    {
      header: "Certificate",
      accessor: "name"
    },
    {
      header: "Course",
      accessor: "courseName"
    },
    {
      header: "Issue Date",
      accessor: (cert: Certificate) => formatDate(cert.issueDate)
    },
    {
      header: "Expiry",
      accessor: (cert: Certificate) => cert.expiryDate ? formatDate(cert.expiryDate) : "Never"
    },
    {
      header: "Actions",
      accessor: (cert: Certificate) => (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => handleDownloadCertificate(cert.id)}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      ),
      className: "text-right"
    }
  ];

  return (
    <Card>
      <DataTable
        columns={columns}
        data={certificates}
        keyField="id"
        emptyMessage="No certificates earned yet"
      />
    </Card>
  );
}
