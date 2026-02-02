import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UsegetPayment } from "@/hooks/getPaymenthook";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import {  LoaderIcon } from "lucide-react"
import { useState } from "react";

type User = {
    code: string;
    description: string;
    percentage: string;
    validTill: string;
    maxUsage: string;
    status: string;
    amount: string;
};

// const data: User[] = [
//     { Code: 'SUMMER2024', Discount: '15%', ValidUntil: '2024-08-31', ExpiryDate: '89/100', Status: 'Active', Action: 'Pause' },
//     { Code: 'SUMMER2024', Discount: '15%', ValidUntil: '2024-08-31', ExpiryDate: '89/100', Status: 'Expired', Action: 'Activate' },
// ]

const userData: ColumnDef<User>[] = [
    {
        accessorKey: 'code',
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
                            {row.original.code}
                        </span>
                        <span className="text-[12px] text-[#666373]">
                            {row.original.description}
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'percentage',
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
                            {row.original.percentage} %
                        </span>
                        <span className="text-[12px] text-[#666373]">
                            € {row.original.amount ? Number(row.original.amount).toFixed(2) : '0.00'}
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'validTill',
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
                        {new Date(row.original.validTill).toLocaleDateString("en-Us", { year: "numeric", month: "2-digit", day: "2-digit" })}
                    </span>
                    <span className="text-[12px] text-[#666373]">
                        Created: {new Date(row.original.validTill).toLocaleDateString("en-Us", { year: "numeric", month: "2-digit", day: "2-digit" })}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'maxUsage',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div>
                <h1>Usage</h1>
            </div>
        ),
        cell: ({ row }) => {
        const usagePercentage = (parseInt(row.original.maxUsage) / 100) * 100;
            return (
                <div className="flex flex-col justify-center cursor-pointer gap-1">
                    <span className="font-semibold text-[14px] text-[#666373]">
                        {row.original.maxUsage}
                    </span>
                    <span className="text-[12px] text-[#666373]">
                        <Progress value={usagePercentage} className="[&>div]:bg-[#16A34A] lg:w-[270%] w-[150px]" />
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'status',
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
                        className={`${row.original.status === "Expired" ? "font-bold rounded-full bg-[#FF3535]/10 text-[#7B0707] border border-[#7B0707] hover:bg-[#FF3535]/20 px-8 py-5" : "font-bold rounded-full bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] hover:bg-[#35FF62]/20 px-8 py-5"} `}
                    >
                        {row.original.status}
                    </Button>
                </div>
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
                    <Button className="bg-[#0DAC87] hover:bg-[#09aa84] cursor-pointer px-8 h-10 rounded-full text-[#FFFFFF] font-bold">
                        Activate
                    </Button>
                    <Button variant={'outline'} className="cursor-pointer px-7 h-10 rounded-full border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000] font-bold">Delete</Button>
                </div>
            )
        }

    },
]

const DiscountCode = () => {
    const { data: DiscountData, isLoading, isError } = UsegetPayment();
    const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
    if (isError) {
        return <div>Error loading discount data.</div>;
    }
    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center py-10">
                <LoaderIcon className="animate-spin" />
            </div>
        );
    }
    return (
        <div>
            <TableHeader
                showSearch
                showFilter={false}
                showSort
                searchPlaceholder="Search Code"
                // showAddButton={true}
                // addButtonLabel="Export"
                // addButtonIcon={<Download />}
                // url=""
                showColumns
                columnsMenuItems={columnsMenu?.items ?? []}
                onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
            />
            <div className="bg-white rounded-[25px] mt-3">
                <ReusableTable data={DiscountData.discounts ?? []} columns={userData} onExposeColumns={(payload) => setColumnsMenu(payload)} />
            </div>

        </div>
    )
}

export default DiscountCode