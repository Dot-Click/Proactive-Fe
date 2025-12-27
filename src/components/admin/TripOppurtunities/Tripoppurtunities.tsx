import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UsegetTrips } from "@/hooks/gettriphook";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

type User = {
  name: string;
  Coordinator: string;
  category: string;
  startDate: string;
  endDate: string;
  approvalStatus: string;
};

// const data: User[] = [
//   { name: 'Wild Weekend Barcelona', Coordinator: 'Maria Rodriguez', category: 'Weekend', startDate: '10–12 Sep 2025', endDate: '10–12 Sep 2025', approvalStatus: 'Pending' },
//   { name: 'Wild Weekend Barcelona', Coordinator: 'Maria Rodriguez', category: 'Weekend', startDate: '10–12 Sep 2025', endDate: '10–12 Sep 2025', approvalStatus: 'Live' },
// ]

const userData: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-8">
        <h1>Trip Name</h1>
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
              {row.original.name}
            </span>
            {/* <span className="text-[12px] text-[#666373]">
              Barcelona, Spain
            </span> */}
          </div>
        </div>
      )
    }
  },
  // {
  //   accessorKey: 'Coordinator',
  //   enableColumnFilter: true,
  //   enableSorting: true,
  //   header: () => (
  //     <div className="pl-2">
  //       <h1>Coordinator</h1>
  //     </div>
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="">
  //         <span className="flex items-center cursor-pointer rounded-full px-2 py-6 text-[12px]">
  //           {row.original.Coordinator}
  //           <br />
  //           maria.r@email.com
  //         </span>
  //       </div>
  //     )
  //   }
  // },
  {
    accessorKey: 'category',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div>
        <h1>Category</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <Button className="text-center bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full
        px-4 py-5 font-semibold">
          {row.original.category}
        </Button>
      )
    }
  },
  {
    accessorKey: 'startDate',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div>
        <h1>startDate</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div >
          <span className="text-[#666373] text-[13px]">
            {
              new Date(row.original.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            }
          </span>
          <br />
          {/* <span className="text-[#666373] text-[13px]">
              8/6 join
            </span> */}
        </div>
      )
    }
  },
  {
    accessorKey: 'endDate',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div>
        <h1>endDate</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div >
          <span className="text-[#666373] text-[13px]">
            {
              new Date(row.original.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            }
          </span>
          <br />
          {/* <span className="text-[#666373] text-[13px]">
              8/6 join
            </span> */}
        </div>
      )
    }
  },
  {
    accessorKey: 'Status',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="text-center">
        <h1>Status</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Button
            className={`${row.original.approvalStatus === 'Pending' ? 'bg-[#CE5600]/10 text-[#CE5600] border border-[#CE5600] hover:bg-[#CE5600]/20 px-6 py-4' : 'bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] hover:bg-[#35FF62]/20 px-10 py-4'} text-center cursor-pointer rounded-full
        font-semibold`}
          >
            {row.original.approvalStatus}
          </Button>
        </div>
      )
    }
  },
  {
    accessorKey: 'Actions',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div>
        <h1>Actions</h1>
      </div>
    ),
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button className="cursor-pointer px-7 h-10 rounded-full">Approve</Button>
          <Button variant={'outline'} className="cursor-pointer px-7 h-10 rounded-full border border-[#9C0000] text-[#9C0000] font-bold">Reject</Button>
        </div>
      )
    }

  },
]

const Tripoppurtunities = () => {
  const { data: trip } = UsegetTrips();
  console.log(trip.trips)
  const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
  return (
    <div>
      <TableHeader
        showSearch
        showFilter={false}
        showSort
        searchPlaceholder="Search Trips"
        showAddButton={true}
        addButtonLabel="Add New Trip"
        url='/dashboard/add-new-trip'
        showColumns
        columnsMenuItems={columnsMenu?.items ?? []}
        onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
      />
      <div className="bg-white rounded-[25px] mt-3">
        <ReusableTable data={trip.trips} columns={userData} onExposeColumns={(payload) => setColumnsMenu(payload)} />
      </div>

    </div>
  )
}

export default Tripoppurtunities