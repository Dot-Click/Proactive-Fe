import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react"
import credit from "@/assets/sidebaricon/credit.png"
import { useState } from "react";

type User = {
  User: string;
  trip: string;
  Amount: string;
  Date: string;
  Status: string;
  Paymentmethod: string
};

const data: User[] = [
  { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'Credit card' },
  { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'Debit card' },
  { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'PayPal' },
  { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'Google Pay' },
  { User: 'Sarah L.', trip: 'Wild Weekend Barcelona', Amount: '€299', Date: '2024-11-20', Status: 'Paid', Paymentmethod: 'Apple Pay' },
]

const userData: ColumnDef<User>[] = [
  {
    accessorKey: 'User',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-4">
        <h1>User</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center cursor-pointer">
            <span className="font-semibold text-[14px] text-[#666373]">
              {row.original.User}
            </span>
            <span className="text-[12px] text-[#666373]">
              sarah.l@email.com
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'Trip',
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
              {row.original.trip}
            </span>
            <span className="text-[12px] text-[#666373]">
              ID: trip-001
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'Amount',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div >
        <h1>Amount</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-3 cursor-pointer">
          <span className="font-semibold text-[14px] text-[#666373] text-center">
            {row.original.Amount}
          </span>
        </div>
      )
    }
  },
  { 
    accessorKey: 'Status',
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
          {row.original.Status}
        </Button>
      )
    }
  },
  {   
    accessorKey: 'Date',
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
              {row.original.Date}
            </span>
            <span className="text-[12px] text-[#666373]">
              Due: 2024-11-25
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'Paymentmethod',
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
              {row.original.Paymentmethod}
            </span>
          </div>
        </div>
      )
    }
  },
]

const PaymentStatus = () => {
const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
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
        <ReusableTable data={data} columns={userData} onExposeColumns={(payload) => setColumnsMenu(payload)} />
      </div>

    </div>
  )
}

export default PaymentStatus