import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReusableTable from "@/Table/ReusableTable"
import { ArrowDownUp, Funnel, Search } from "lucide-react"
import { type ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Modal from "./Modal";

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
          <Modal/>
        </Dialog>
      )
    }

  },
]

const FilterSection = () => {
  return (
    <>
      <div className="bg-white px-4 py-8 rounded-lg shadow-sm mt-6">

        <div className="relative">
          <Search size={24} color="#666373" className="absolute ml-3 text-gray-400 top-1/2 -translate-y-1/2" />
          <input type="search" placeholder="Search Place"
            className="placeholder:text-[#666373] w-[600px] pl-10 pr-3 px-3 py-3 border border-[#EFEFEF] bg-[#FAFAFE] outline-none rounded-[10px]" />
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-4">
            <span className="text-[#666373] text-[18px]">Showing</span>
            <Select>
              <SelectTrigger className="w-[70px] bg-[#E8E8E8] font-medium text-[16px] rounded-[8px] h-9">
                <SelectValue placeholder="05" className="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <Button className="bg-[#FAFAFA] text-black border border-[#EFEFEF] hover:bg-[#FAFAFA] cursor-pointer font-medium w-30 py-5 rounded-[15px]">
              <ArrowDownUp />
              Sort by
            </Button>
            <Button className="bg-[#FAFAFA] text-black border border-[#EFEFEF] hover:bg-[#FAFAFA] cursor-pointer font-medium w-30 py-5 rounded-[15px]">
              <Funnel fill="#000000" />
              Filter
            </Button>
          </div>
        </div>

      </div>

      <div className="bg-white rounded-[25px] mt-3">
        <ReusableTable data={data} columns={userData} />
      </div>
    </>
  )
}

export default FilterSection