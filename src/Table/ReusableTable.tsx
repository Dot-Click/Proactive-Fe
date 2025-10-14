import React from 'react'
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from '@/lib/utils';

type TableProps<TData> = {
    columns: ColumnDef<TData, any>[];
    data: TData[];
}

const ReusableTable = <TData,>({ columns, data }: TableProps<TData>) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // state: {
        //     sorting,
        //     columnFilters,
        // },
        // onSortingChange: setSorting,
        // onColumnFiltersChange: setColumnFilters,
    })

    return (
        <div className='bg-white rounded-[25px]'>
            <div className="w-full overflow-x-auto">
                <Table className="border-separate border-spacing-y-0 border-spacing-x-0 w-full min-w-[900px]">
                    <TableHeader className="bg-[#FAFAFA] hover:bg-[#FAFAFA] sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="rounded-[25px] overflow-hidden"
                            >
                                {headerGroup.headers.map((header, index) => (
                                    <TableHead
                                        key={header.id}
                                        className={cn(
                                            "px-6 py-6 text-left text-[16px] font-semibold text-[#221E33] whitespace-nowrap",
                                            index === 0 && "rounded-tl-[25px]",
                                            index === headerGroup.headers.length - 1 && "rounded-tr-[25px]"
                                        )}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row, rowIndex) => (
                            <React.Fragment key={row.id}>
                                {rowIndex > 0 && (
                                    <TableRow aria-hidden className="h-4">
                                        <TableCell colSpan={table.getAllLeafColumns().length} className="py-0 h-4 border-0" />
                                    </TableRow>
                                )}
                                <TableRow
                                    className="bg-[#FAFAFE] rounded-[20px] border-0 cursor-pointer"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="py-3 px-6 first:rounded-l-[20px] last:rounded-r-[20px] first:pl-8 last:pr-8"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

}

export default ReusableTable