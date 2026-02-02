import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import { Download, LoaderIcon, FileText } from "lucide-react"
import credit from "@/assets/sidebaricon/credit.png"
import { useState } from "react";
import { UsegetPayment } from "@/hooks/getPaymenthook";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type User = any;

const userData: ColumnDef<User>[] = [
  {
    accessorKey: 'user',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-4">
        <h1>User</h1>
      </div>
    ),
    cell: ({ row }) => {
      const u = row.original.user;
      const displayName = u ? (u.firstName || u.nickName ? `${u.firstName || ''} ${u.lastName || ''}`.trim() : u.email) : 'Unknown';
      const email = u?.email || '';
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center cursor-pointer">
            <span className="font-semibold text-[14px] text-[#666373]">
              {displayName}
            </span>
            <span className="text-[12px] text-[#666373]">
              {email}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'trip',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-">
        <h1>Trip</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col justify-center cursor-pointer">
            <span className="font-semibold text-[14px] text-[#666373]">
              {row.original.trip?.title ?? '—'}
            </span>
            <span className="text-[12px] text-[#666373]">
              ID: {row.original.trip?.id ?? '—'}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'amount',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div >
        <h1>Amount</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex cursor-pointer">
          <span className="font-semibold text-[14px] text-[#666373] text-center">
            {row.original.currency ? `${row.original.currency} ` : ''}{row.original.amount ? Number(row.original.amount).toFixed(2) : '0.00'}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-2">
        <h1>Status</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <Button
          className='rounded-full bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] hover:bg-[#35FF62]/20 px-8 py-5'
        >
          {row.original.status}
        </Button>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div>
        <h1>Date</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col justify-center cursor-pointer">
            <span className="font-semibold text-[14px] text-[#666373]">
              {row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : '—'}
            </span>
            <span className="text-[12px] text-[#666373]">
              Due: {row.original.trip?.end_date ? new Date(row.original.trip.end_date).toLocaleDateString() : '—'}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'method',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-4">
        <h1>Method</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="flex justify-center gap-2 cursor-pointer">
            <img src={credit} alt="credit" />
            <span className="font-semibold text-[14px] text-[#666373]">
              {row.original.method || row.original.Paymentmethod}
            </span>
          </div>
        </div>
      )
    }
  },
]

const PaymentStatus = () => {
  const { data: paymentData, isLoading, isError } = UsegetPayment();
  const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
  const [exportLoading, setExportLoading] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'csv' | null>(null);

  // Function to export payment data to PDF
  const handleExportToPDF = () => {
    if (!paymentData?.tripPayments?.length) {
      alert("No payment data to export");
      return;
    }

    setExportLoading(true);
    setExportType('pdf');

    try {
      const doc = new jsPDF("landscape", "pt", "a4");
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text("Payment Report", doc.internal.pageSize.width / 2, 40, {
        align: "center",
      });

      // Add export info
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Exported: ${new Date().toLocaleDateString()} | Total Records: ${paymentData.tripPayments.length}`,
        doc.internal.pageSize.width / 2,
        60,
        { align: "center" }
      );

      // Prepare table data
      const tableData = paymentData.tripPayments.map(
        (payment: any, index: number) => {
          const user = payment.user;
          const displayName = user
            ? user.firstName || user.nickName
              ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
              : user.email
            : "Unknown";
          const email = user?.email || "";
          const tripTitle = payment.trip?.title ?? "—";
          const amount = payment.currency
            ? `${payment.currency} ${Number(payment.amount).toFixed(2)}`
            : Number(payment.amount).toFixed(2);
          const status = payment.status || "—";
          const date = payment.createdAt
            ? new Date(payment.createdAt).toLocaleDateString()
            : "—";
          const method = payment.method || payment.Paymentmethod || "—";

          return [
            (index + 1).toString(),
            displayName,
            email,
            tripTitle,
            amount,
            status,
            date,
            method,
          ];
        }
      );

      // Define table columns
      const tableColumns = [
        "#",
        "User Name",
        "Email",
        "Trip Title",
        "Amount",
        "Status",
        "Date",
        "Payment Method",
      ];

      // Add autoTable
      autoTable(doc, {
        head: [tableColumns],
        body: tableData,
        startY: 80,
        theme: "striped",
        headStyles: {
          fillColor: [102, 99, 115], // #666373 color
          textColor: 255,
          fontSize: 10,
          fontStyle: "bold",
          halign: "center",
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [80, 80, 80],
          halign: "left",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { left: 20, right: 20 },
        styles: {
          overflow: "linebreak",
          cellPadding: 5,
        },
      });

      // Save the PDF
      doc.save(`payment-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setExportLoading(false);
      setExportType(null);
    }
  };

  // Function to export as CSV
  const handleExportToCSV = () => {
    if (!paymentData?.tripPayments?.length) {
      alert("No payment data to export");
      return;
    }

    setExportLoading(true);
    setExportType('csv');

    try {
      const headers = [
        "User Name",
        "Email",
        "Trip Title",
        "Amount",
        "Status",
        "Payment Date",
        "Due Date",
        "Payment Method",
      ];

      const csvData = paymentData.tripPayments.map((payment: any) => {
        const user = payment.user;
        const displayName = user
          ? user.firstName || user.nickName
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : user.email
          : "Unknown";
        
        return [
          `"${displayName}"`,
          `"${user?.email || ""}"`,
          `"${payment.trip?.title || "—"}"`,
          payment.currency ? `${payment.currency} ${Number(payment.amount).toFixed(2)}` : Number(payment.amount).toFixed(2),
          payment.status || "—",
          payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "—",
          payment.trip?.end_date ? new Date(payment.trip.end_date).toLocaleDateString() : "—",
          payment.method || payment.Paymentmethod || "—",
        ];
      });

      const csvContent = [
        headers.join(","),
        ...csvData.map((row: any) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `payments-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating CSV:", error);
      alert("Failed to generate CSV. Please try again.");
    } finally {
      setExportLoading(false);
      setExportType(null);
    }
  };

  if (isError) {
    return <div>Error loading membership data.</div>;
  }
  
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <LoaderIcon className="animate-spin" />
      </div>
    )
  }
  
 return (
  <div>
    {/* Export Buttons - Placed above the TableHeader */}
    <div className="flex justify-end gap-2 mb-3">
      <Button
        onClick={handleExportToPDF}
        disabled={exportLoading || !paymentData?.tripPayments?.length}
        className="bg-black  text-white"
      >
        {exportLoading && exportType === 'pdf' ? (
          <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        Export PDF
      </Button>
      
      <Button
        onClick={handleExportToCSV}
        disabled={exportLoading || !paymentData?.tripPayments?.length}
        variant="outline"
        className="border-black text-black hover:bg-[#666373]/10"
      >
        {exportLoading && exportType === 'csv' ? (
          <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <FileText className="h-4 w-4 mr-2" />
        )}
        Export CSV
      </Button>
    </div>

    <TableHeader
      showSearch
      showFilter={false}
      showSort
      showColumns
      columnsMenuItems={columnsMenu?.items ?? []}
      onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
    />
    
    <div className="bg-white rounded-[25px] mt-3">
      <ReusableTable data={paymentData?.tripPayments ?? []} columns={userData} onExposeColumns={(payload) => setColumnsMenu(payload)} />
    </div>
  </div>
)
}

export default PaymentStatus