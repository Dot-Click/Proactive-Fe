import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react"
import { useState } from "react";

type User = {
    Code: string;
    Discount: string;
    ValidUntil: string;
    ExpiryDate: string;
    Status: string;
    Action: string
};

const data: User[] = [
    { Code: 'SUMMER2024', Discount: '15%', ValidUntil: '2024-08-31', ExpiryDate: '89/100', Status: 'Active', Action: 'Pause' },
    { Code: 'SUMMER2024', Discount: '15%', ValidUntil: '2024-08-31', ExpiryDate: '89/100', Status: 'Expired', Action: 'Activate' },
]

const userData: ColumnDef<User>[] = [
    {
        accessorKey: 'Code',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-4">
                <h1>Code</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col justify-center cursor-pointer">
                        <span className="font-semibold text-[14px] text-[#666373]">
                            {row.original.Code}
                        </span>
                        <span className="text-[12px] text-[#666373]">
                            Summer season discount for all trips
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'Discount',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div>
                <h1>Discount</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col justify-center cursor-pointer">
                        <span className="font-semibold text-[14px] text-[#666373]">
                            {row.original.Discount}
                        </span>
                        <span className="text-[12px] text-[#666373]">
                            Min: €200
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'Valid Until',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-3">
                <h1>Valid Until</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex flex-col justify-center cursor-pointer pl-2">
                    <span className="font-semibold text-[14px] text-[#666373]">
                        {row.original.ValidUntil}
                    </span>
                    <span className="text-[12px] text-[#666373]">
                        Created: 2024-05-15
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'Usage',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div>
                <h1>Usage</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex flex-col justify-center cursor-pointer gap-1">
                    <span className="font-semibold text-[14px] text-[#666373]">
                        {row.original.ExpiryDate}
                    </span>
                    <span className="text-[12px] text-[#666373]">
                        <Progress value={80} className="[&>div]:bg-[#16A34A] lg:w-[270%] w-[150px]" />
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
            <div className="pl-22">
                <h1>Status</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="pl-16">
                    <Button
                        className={`${row.original.Status === "Expired" ? "font-bold rounded-full bg-[#FF3535]/10 text-[#7B0707] border border-[#7B0707] hover:bg-[#FF3535]/20 px-8 py-5" : "font-bold rounded-full bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] hover:bg-[#35FF62]/20 px-8 py-5"} `}
                    >
                        {row.original.Status}
                    </Button>
                </div>
            )
        }
    },
    {
        accessorKey: 'Actions',
        enableColumnFilter: true,
        enableSorting: true,
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <Button className={`${row.original.Action === "Activate" ? "bg-[#0DAC87] hover:bg-[#09aa84] cursor-pointer px-8 h-10 rounded-full text-[#FFFFFF] font-bold" : "cursor-pointer px-10 h-10 rounded-full text-[#FFFFFF] font-bold"}`}>
                        {row.original.Action}
                    </Button>
                    <Button variant={'outline'} className="cursor-pointer px-7 h-10 rounded-full border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000] font-bold">Delete</Button>
                </div>
            )
        }

    },
]

const DiscountCode = () => {
    const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
    return (
        <div>
            <TableHeader
                showSearch
                showFilter={false}
                showSort
                searchPlaceholder="Search Code"
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

export default DiscountCode