import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

type User = {
  TripName: string;
  Category: string;
  Dates: string;
  Participants: number;
  Status: string;
};

const data: User[] = [
  { TripName: 'Wild Weekend Barcelona', Category: 'Weekend', Dates: '10–12 Sep 2025', Participants: 5, Status: 'Open' },
  { TripName: 'Wild Weekend Barcelona', Category: 'Weekend', Dates: '10–12 Sep 2025', Participants: 5, Status: 'Open' },
  { TripName: 'Wild Weekend Barcelona', Category: 'Weekend', Dates: '10–12 Sep 2025', Participants: 5, Status: 'Open' },
  { TripName: 'Wild Weekend Barcelona', Category: 'Weekend', Dates: '10–12 Sep 2025', Participants: 5, Status: 'Open' },
  { TripName: 'Wild Weekend Barcelona', Category: 'Weekend', Dates: '10–12 Sep 2025', Participants: 5, Status: 'Open' },

]

const userData: ColumnDef<User>[] = [
  {
    accessorKey: 'Trip Name',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-6">
        <h1>Trip Name</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#3b3745] text-nowrap">
              {row.original.TripName}
            </span>
            <span className="text-xs text-[#8a8698]">Barcelona, Spain</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'Category',
    // header: 'Name',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-8">
        <h1>Category</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 pl-6 w-40">
          <Button
            className="bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full
          px-4 py-5 font-semibold"
          >
            {row.original.Category}
          </Button>
        </div>
      )
    }
  },
  {
    accessorKey: 'Dates',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="">
        <h1>Dates</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col w-30">
          <div className="font-semibold text-[#666373] text-[14px]">{row.original.Dates}</div>
          <span className="text-[#666373] text-[12px]">8/16 joined</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'Participants',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="text-start">
        <h1>Participants</h1>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-8 w-30">
        <span>{row.original.Participants}</span>
      </div>
    )
  },
  {
    accessorKey: 'Status',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-4">
        <h1>Status</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-30">
          <Button className="bg-[#077B21]/10 hover:bg-[#077B21]/20 border border-[#077B21] cursor-pointer px-8 h-10 rounded-full text-[#077B21] font-bold">
            {row.original.Status}
          </Button>
        </div>
      )
    }
  },
  {
    accessorKey: 'Actions',
    header: () => (
      <div>
        <h1>Actions</h1>
      </div>
    ),
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button
            className="rounded-full text-md px-10 py-5 cursor-pointer"
          >
            View
          </Button>
          <Button
            className="rounded-full bg-white hover:bg-[#f0ebeb] text-[#666373] border border-[#666373] text-md px-10 py-5 cursor-pointer"
          >
            Edit
          </Button>
        </div>
      )
    }

  },
]

const OppurtunitiesManagement = () => {
  const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
  return (
    <div className="lg:mt-5">
      <TableHeader
        showSearch
        showFilter={false}
        showSort
        searchPlaceholder="Search Message"
        showAddButton={true}
        addButtonLabel="Add New Trip"
        url="/coordinator-dashboard/add-new-trip"
        showColumns
        columnsMenuItems={columnsMenu?.items ?? []}
        onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
      />
      <div className="bg-white rounded-[25px] mt-3 overflow-x-auto">
        <ReusableTable
          columns={userData}
          data={data}
          onExposeColumns={(payload) => setColumnsMenu(payload)}
        />
      </div>
    </div>
  )
}

export default OppurtunitiesManagement