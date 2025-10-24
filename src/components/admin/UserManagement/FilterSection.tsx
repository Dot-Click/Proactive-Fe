import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReusableTable from "@/Table/ReusableTable"
import { type ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Modal from "./Modal";
import TableHeader from "@/Table/TableHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  trips: number;
  Membership: string;
};

const data: User[] = [
  { id: '#123', name: 'John Doe', email: 'john@gmail.com', trips: 5, Membership: 'GOLD MEMBER' },
  { id: '#123', name: 'John Doe', email: 'john@gmail.com', trips: 5, Membership: 'GOLD MEMBER' },
  { id: '#123', name: 'John Doe', email: 'john@gmail.com', trips: 5, Membership: 'GOLD MEMBER' },
  { id: '#123', name: 'John Doe', email: 'john@gmail.com', trips: 5, Membership: 'GOLD MEMBER' },
  { id: '#123', name: 'John Doe', email: 'john@gmail.com', trips: 5, Membership: 'GOLD MEMBER' },

]

const userData: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-6">
        <h1>ID</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <span>{row.original.id}</span>
      )
    }
  },
  {
    accessorKey: 'name',
    // header: 'Name',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-10">
        <h1>Name</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 pl-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{row.original.name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'email',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="">
        <h1>Email</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="pr-2">
          <span>{row.original.email}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'trips',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="text-start">
        <h1>Trips</h1>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <span>{row.original.trips}</span>
      </div>
    )
  },
  {
    accessorKey: 'Membership',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="text-center">
        <h1>Membership</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full
          px-4 py-5 font-semibold"
          >
            {row.original.Membership}
          </Button>
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
    cell: () => {
      return (
        <div className="flex justify-center items-center">
          <Select>
            <SelectTrigger className="text-[#077B21] font-bold w-[100px] rounded-full text-[13px] px-4 py-4 bg-[#35FF62]/10 border border-[#077B21] gap-1">
              <SelectValue placeholder="Select" className="text-[#077B21] cursor-pointer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Active" className="font-bold">Active</SelectItem>
                <SelectItem value="DeActive" className="font-bold">DeActive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hover:bg-[#000000] cursor-pointer rounded-full
                    px-8 py-6 font-semibold">View Detail</Button>
            </DialogTrigger>
            <Modal />
          </Dialog>
        </div>
      )
    }

  },
]

const FilterSection = () => {
  const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
  return (
    <>
      <TableHeader
        showColumns
        columnsMenuItems={columnsMenu?.items ?? []}
        onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
        showFilter={false}
      />
      <div className="bg-white rounded-[25px] mt-3 overflow-x-auto">
        <ReusableTable
          columns={userData}
          data={data}
          onExposeColumns={(payload) => setColumnsMenu(payload)}
        />
      </div>
    </>
  )
}

export default FilterSection