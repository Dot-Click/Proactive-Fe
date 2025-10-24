import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

type User = {
    tripName: string;
    Categories: string;
    Date: string;
};

const data: User[] = [
    {
        tripName: "Wild Weekend Barcelona",
        Categories: "Weekend",
        Date: "10–12 Sep 2025",
    },
    {
        tripName: "Wild Weekend Barcelona",
        Categories: "Weekend",
        Date: "10–12 Sep 2025",
    },
    {
        tripName: "Wild Weekend Barcelona",
        Categories: "Weekend",
        Date: "10–12 Sep 2025",
    },
    {
        tripName: "Wild Weekend Barcelona",
        Categories: "Weekend",
        Date: "10–12 Sep 2025",
    },
    {
        tripName: "Wild Weekend Barcelona",
        Categories: "Weekend",
        Date: "10–12 Sep 2025",
    },
];

const userData: ColumnDef<User>[] = [
    {
        accessorKey: "Trip Name",
        header: () => <div className="font-semibold">Trip Name</div>,
        cell: ({ row }) => (
            <div className="flex items-center gap-3 w-60">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>SL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium text-sm text-[#3b3745] text-nowrap">
                        {row.original.tripName}
                    </span>
                    <span className="text-xs text-[#8a8698]">Barcelona, Spain</span>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "Category",
        header: () => <div className="font-semibold pl-2">Category</div>,
        cell: ({ row }) => (
            <div className="w-40">
                <div className="text-center bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full w-26 py-3 font-semibold">
                    {row.original.Categories}
                </div>
            </div>
        ),
    },
    {
        accessorKey: "Dates",
        header: () => <div className="font-semibold">Dates</div>,
        cell: ({ row }) => (
            <div className="flex flex-col w-30">
                <div className="font-semibold text-[#666373] text-[14px]">{row.original.Date}</div>
                <span className="text-[#666373] text-[12px]">8/16 joined</span>
            </div>
        ),
    },
    {
        accessorKey: "Actions",
        header: () => <div className="font-semibold">Actions</div>,
        cell: () => (
            <div className="flex gap-2">
                <Button
                    className="rounded-full text-md px-10 py-6 cursor-pointer"
                >
                    View
                </Button>
                <Button
                    className="rounded-full bg-white hover:bg-[#f0ebeb] text-[#666373] border border-[#666373] text-md px-10 py-6 cursor-pointer"
                >
                    Edit
                </Button>
            </div>
        ),
    },

];

const Alltripstable = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns: userData,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
    });

    return (
        <div className="py-5 bg-white rounded-[25px] shadow-md mt-2 lg:max-w-[950px] lg:mx-auto">
            <div className="flex flex-col mb-4 px-6">
                <span className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-semibold text-lg">
                    All Trips
                </span>
                <span className="text-[#666373] text-sm">
                    Showing {table.getRowModel().rows.length} of {data.length} trips
                </span>
            </div>

            <div className="rounded-lg overflow-y-auto max-h-[300px] pl-2">
                <table className="min-w-full border-separate border-spacing-y-2">
                    <thead className="text-left text-md font-bold text-[#221E33]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, i) => (
                                    <th
                                        key={header.id}
                                        className={`py-3 ${i === 0 ? 'px-4' : 'pl-4'}`}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="bg-[#FAFAFE] rounded-[20px]"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={`px-3 py-6 first:rounded-l-[8px] last:rounded-r-[8px]`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-3 flex justify-end mt-4 gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    // disabled={!table.getCanPreviousPage()}
                    className="cursor-pointer"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    // disabled={!table.getCanNextPage()}
                    className="cursor-pointer"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Alltripstable;
