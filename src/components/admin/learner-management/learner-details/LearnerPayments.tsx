
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "../../shared/utils/format-utils";
import { DataTable, DataTableColumn } from "../../shared/components/data-table/DataTable";
import type { Payment } from "../../types/learner.types";

interface LearnerPaymentsProps {
  payments: Payment[];
}

export function LearnerPayments({ payments }: LearnerPaymentsProps) {
  const columns: DataTableColumn<Payment>[] = [
    {
      header: "Date",
      accessor: (payment: Payment) => formatDate(payment.date)
    },
    {
      header: "Amount",
      accessor: (payment: Payment) => formatCurrency(payment.amount)
    },
    {
      header: "Course",
      accessor: (payment: Payment) => payment.courseName || "N/A"
    },
    {
      header: "Payment Method",
      accessor: "method" as keyof Payment
    },
    {
      header: "Status",
      accessor: (payment: Payment) => (
        <Badge 
          variant={
            payment.status === "completed" ? "default" : 
            payment.status === "pending" ? "outline" : "destructive"
          }
          className="capitalize"
        >
          {payment.status}
        </Badge>
      )
    }
  ];

  return (
    <Card>
      <DataTable
        columns={columns}
        data={payments}
        keyField="id"
        emptyMessage="No payment history found"
      />
    </Card>
  );
}
