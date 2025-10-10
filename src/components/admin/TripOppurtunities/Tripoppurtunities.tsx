import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";

type User = {
  tripName: string;
  Coordinator: string;
  Category: string;
  Dates: string;
  Status: string;
};

const data: User[] = [
  { tripName: 'Wild Weekend Barcelona', Coordinator: 'Maria Rodriguez', Category: 'Weekend', Dates: '10–12 Sep 2025', Status: 'Pending' },
  { tripName: 'Wild Weekend Barcelona', Coordinator: 'Maria Rodriguez', Category: 'Weekend', Dates: '10–12 Sep 2025', Status: 'Live' },
]

const userData: ColumnDef<User>[] = [
  {
    accessorKey: 'tripName',
    header: 'tripName',
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="flex items-center cursor-pointer rounded-full px-2 py-6 text-[12px]">
            {row.original.tripName}
            <br />
            Barcelona, Spain
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'Coordinator',
    header: 'Coordinator',
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="flex items-center cursor-pointer rounded-full px-2 py-6 text-[12px]">
            {row.original.Coordinator}
            <br />
            maria.r@email.com
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'Category',
    header: 'Category',
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="text-center bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full
        px-5 py-3 font-semibold">
          {row.original.Category}
        </div>
      )
    }
  },
  {
    accessorKey: 'Dates',
    header: 'Dates',
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.original.Dates}
          <br />
          8/6 join
        </div>
      )
    }
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <Button
          className={`${row.original.Status === 'Pending' ? 'bg-[#CE5600]/10 text-[#CE5600] border border-[#CE5600] hover:bg-[#CE5600]/20 px-6 py-5 ' : 'bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] hover:bg-[#35FF62]/20 px-10 py-5'} text-center cursor-pointer rounded-full
        font-semibold`}
        >
          {row.original.Status}
        </Button>
      )
    }
  },
  {
    accessorKey: 'Actions',
    enableColumnFilter: true,
    enableSorting: true,
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
  return (
    <div>
      <TableHeader
        showSearch
        showFilter
        showSort
        searchPlaceholder="Search Trips"
        showAddButton={true}
        addButtonLabel="Add New Trip"
        url='/dashboard/add-new-trip'
      />
      <div className="bg-white rounded-[25px] mt-3">
        <ReusableTable data={data} columns={userData} />
      </div>

    </div>
  )
}

export default Tripoppurtunities