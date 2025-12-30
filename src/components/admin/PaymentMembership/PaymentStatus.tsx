import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import { Download, LoaderIcon } from "lucide-react"
import credit from "@/assets/sidebaricon/credit.png"
import { useState } from "react";
import { UsegetPayment } from "@/hooks/getPaymenthook";

type User = any;

// const data: User[] = [
//   { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'Credit card' },
//   { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'Debit card' },
//   { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'PayPal' },
//   { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'Google Pay' },
//   { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'Apple Pay' },
// ]

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
      <TableHeader
        showSearch
        showFilter={false}
        showSort
        searchPlaceholder="Search Status"
        showAddButton={true}
        addButtonLabel="Export"
        addButtonIcon={<Download />}
        url=""
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