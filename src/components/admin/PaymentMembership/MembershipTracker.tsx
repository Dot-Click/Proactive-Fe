import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react"
import TotalUsers from "@/assets/sidebaricon/totalusers.png"
import Coordinator from "@/assets/sidebaricon/coordinators.png"
import ActiveTrips from "@/assets/sidebaricon/activetrips.png"
import CloseTrips from "@/assets/sidebaricon/closetrips.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
// import { Badge } from "@/components/ui/badge";

type User = {
    User: string;
    Membershiptype: string;
    StartDate: string;
    ExpiryDate: string;
    Status: string;
};

const data: User[] = [
    { User: 'Sarah L.', Membershiptype: 'Gold', StartDate: '2024-01-15', ExpiryDate: '2024-12-31', Status: 'Active' },
    { User: 'Sarah L.', Membershiptype: 'Gold', StartDate: '2024-01-15', ExpiryDate: '2024-12-31', Status: 'Active' },
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
        accessorKey: 'Membership Type',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-">
                <h1>Membership Type</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-center bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full w-20 py-3 font-semibold">
                    {row.original.Membershiptype}
                </div>
            )
        }
    },
    {
        accessorKey: 'Start Date',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-3">
                <h1>Start Date</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex flex-col justify-center cursor-pointer pl-2">
                    <span className="font-semibold text-[14px] text-[#666373]">
                        {row.original.StartDate}
                    </span>
                    <span className="text-[12px] text-[#666373]">
                        Source: Trip Payment
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'Expiry Date',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div>
                <h1>Expiry Date</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex flex-col justify-center cursor-pointer ">
                    <span className="font-semibold text-[14px] text-[#666373]">
                        {row.original.ExpiryDate}
                    </span>
                    <span className="text-[12px] text-[#666373]">
                        40 days left
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
                    className='rounded-full bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] hover:bg-[#35FF62]/20 px-8 py-5'
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
                    <Button className="cursor-pointer px-6 h-10 rounded-full">View Detail</Button>
                    <Button variant={'outline'} className="cursor-pointer px-7 h-10 rounded-full border border-[#9C0000] text-[#9C0000] font-bold">Cancel</Button>
                </div>
            )
        }

    },
]

const stats = [
    {
        id: 1,
        name: 'Total Active Memberships',
        value: '134',
        icon: TotalUsers,
        change: '+5%',
    },
    {
        id: 2,
        name: 'Expiring Soon',
        value: '25',
        icon: Coordinator,
        change: '+10%'
    },
    {
        id: 3,
        name: 'Average Duration',
        value: '365 days',
        icon: ActiveTrips,
        change: '+8%'
    },
    {
        id: 4,
        name: 'Monthly Renewals',
        value: '18',
        icon: CloseTrips,
        change: '-12%'
    }
]

const MembershipTracker = () => {
    const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)

    return (
        <div>
            <div className="px-6 py-4 bg-white rounded-[20px] mt-3">
                <h1 className="text-[#221E33] mb-4">Key States</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mt-2 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.id}>
                            <div className="cursor-pointer flex flex-col justify-center py-5 px-5 bg-[#F6F6FF] rounded-[20px] hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-[12px]">{stat.name}</p>
                                    <div className="bg-black p-2 rounded-full flex items-center justify-center shrink-0">
                                        <img src={stat.icon} alt={stat.name} className="w-5 h-5 object-contain" />
                                    </div>
                                </div>

                                <p className="text-[30px] font-bold bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <TableHeader
                showSearch
                showFilter={false}
                showSort
                searchPlaceholder="Search Membership"
                showAddButton={true}
                addButtonLabel="Export"
                addButtonIcon={<Download />}
                url=""
                showColumns
                columnsMenuItems={columnsMenu?.items ?? []}
                onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
            />
            <div className="bg-white rounded-[25px] mt-3">
                <ReusableTable data={data} columns={userData} onExposeColumns={(payload) => setColumnsMenu(payload)}/>
            </div>


        </div>
    )
}

export default MembershipTracker