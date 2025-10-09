import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReusableTable from "@/Table/ReusableTable"
import { type ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Modal from "./Modal";
import TableHeader from "@/Table/TableHeader";

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
]

const userData: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'trips',
    header: 'Trips',
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'Membership',
    header: 'Membership',
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <Button
          className="bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full
        px-5 py-6 font-semibold"
        >
          {row.original.Membership}</Button>
      )
    }
  },
  {
    accessorKey: 'Status',
    enableColumnFilter: true,
    enableSorting: true,
    cell: () => {
      return (
        <Select>
          <SelectTrigger className="text-[#077B21] font-bold w-[120px] rounded-full px-4 py-5 bg-[#35FF62]/10 border border-[#077B21]">
            <SelectValue placeholder="Select" className="text-[#077B21]" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="DeActive">DeActive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    }

  },
  {
    accessorKey: 'Actions',
    cell: () => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover:bg-[#000000] cursor-pointer rounded-full
                    px-8 py-6 font-semibold">View Detail</Button>
          </DialogTrigger>
          <Modal />
        </Dialog>
      )
    }

  },
]

const FilterSection = () => {
  return (
    <>
      <TableHeader
        showSearch
        showFilter
        showSort
        searchPlaceholder = "Search Users"
        showAddButton={false}
      />
      <div className="bg-white rounded-[25px] mt-3">
        <ReusableTable data={data} columns={userData} />
      </div>
    </>
  )
}

export default FilterSection