import { Switch } from "@/components/ui/switch"
import message from "@/assets/sidebaricon/message.png"
import TableHeader from "@/Table/TableHeader"
import { Download } from "lucide-react"
import ReusableTable from "@/Table/ReusableTable"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import MessageModal from "./MessageModal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

type User = {
  User: string;
  Coordinator: string;
  trip: string;
  LastMessage: string;
  Status: string;
};

const data: User[] = [
  { User: 'Lisa W.', Coordinator: 'Maria Rodriguez', trip: 'Wild Weekend Barcelona', LastMessage: '2024-11-22 14:30', Status: 'Open' },
  { User: 'Lisa W.', Coordinator: 'Maria Rodriguez', trip: 'Wild Weekend Barcelona', LastMessage: '2024-11-22 14:30', Status: 'Open' },
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
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center cursor-pointer">
            <span className="font-semibold text-[14px] text-[#666373]">
              {row.original.User}
            </span>
            <span className="text-[12px] text-[#666373]">
              Barcelona, Spain
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'Coordinator',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-">
        <h1>Coordinator</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col justify-center cursor-pointer">
            <span className="font-semibold text-[14px] text-[#666373]">
              {row.original.Coordinator}
            </span>
            <span className="text-[12px] text-[#666373]">
              maria.r@email.com
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
      <div className="pl-1">
        <h1>Trip</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-center cursor-pointer pl-2">
          <span className="font-semibold text-[14px] text-[#666373]">
            {row.original.trip}
          </span>
          <span className="text-[12px] text-[#666373]">
            ID: trip-001
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'LastMessage',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div>
        <h1>Last Message</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-center cursor-pointer ">
          <span className="font-semibold text-[14px] text-[#666373]">
            {row.original.LastMessage}
          </span>
          <span className="text-[12px] text-[#666373]">
            by user
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
      <div className="pl-6">
        <h1>Status</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <Button
          className='cursor-pointer rounded-full bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] hover:bg-[#35FF62]/20 px-8 py-5'
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
          <Dialog>
            <DialogTrigger>
              <Button className="cursor-pointer px-4 h-10 rounded-full">View Message</Button>
            </DialogTrigger>
            <MessageModal/>
          </Dialog>
          <Button variant={'outline'} className="cursor-pointer px-7 h-10 rounded-full border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000] font-bold">Close</Button>
        </div>
      )
    }

  },
]

const ChatManagement = () => {
const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
  return (
    <>
      <div className="bg-[#FFFFFF] mt-3 rounded-[25px] px-5 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="flex flex-col gap-1">
            <span className="text-center md:text-start bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold">Chat Widget Control</span>
            <span className="text-[#A19EAE] text-center md:text-start">Enable or disable the floating chat widget on all trip pages</span>
          </div>
          <div className="bg-[#FAFAFA] px-6 py-4 rounded-full flex justify-between gap-2 mt-4 md:mt-0 items-center md:w-auto w-full">
            <span className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold">Chat Widget</span>
            <Switch className="w-12" />
          </div>
        </div>
        <div className="bg-[#221E33]/5 mt-4 px-4 py-3 rounded-[10px] flex gap-2 items-center md:w-210">
          <img src={message} alt="message" className="h-10" />
          <span className="text-[12px] text-[#221E33]/50">All user-coordinator chats are securely stored. Admins can monitor conversations, disable the chat widget, or step in when needed. Chat widget is currently enabled - users can start new conversations.</span>
        </div>
      </div>
      <TableHeader
        showSearch
        showFilter={false}
        showSort
        searchPlaceholder="Search Message"
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

    </>
  )
}

export default ChatManagement