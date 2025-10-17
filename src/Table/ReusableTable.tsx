import React, { useCallback, useRef, useState } from 'react'
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from '@/lib/utils';

type TableProps<TData> = {
    columns: ColumnDef<TData, any>[];
    data: TData[];
    onExposeColumns?: (payload: { items: Array<{ id: string; label?: string; checked: boolean; disabled?: boolean }>; toggle: (id: string, value: boolean) => void }) => void;
}

const ReusableTable = <TData,>({ columns, data, onExposeColumns }: TableProps<TData>) => {

    // Table state (functionality without changing visual styles)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
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
    })

    // Expose dynamic columns list and toggle function to parent (for header menu)
    const lastExposeKeyRef = useRef<string | null>(null)
    const toggle = useCallback((id: string, value: boolean) => {
        table.getColumn(id)?.toggleVisibility(value)
    }, [table])

    React.useEffect(() => {
        if (!onExposeColumns) return
        const items = table
            .getAllColumns()
            .filter((c) => c.getCanHide())
            .map((c) => ({
                id: c.id,
                label: (typeof c.columnDef.header === 'string' ? c.columnDef.header : undefined) as string | undefined,
                checked: c.getIsVisible(),
                disabled: false,
            }))

        const exposeKey = JSON.stringify(items.map(i => ({ id: i.id, checked: i.checked })))
        if (lastExposeKeyRef.current === exposeKey) return
        lastExposeKeyRef.current = exposeKey
        onExposeColumns({ items, toggle })
        // Only run when visibility changes to avoid loops
    }, [onExposeColumns, columnVisibility, toggle, table])

    return (
        <>
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
                                            onClick={() => header.column.getCanSort() && header.column.toggleSorting(header.column.getIsSorted() === 'asc')}
                                            className={cn(
                                                "px-6 py-6 text-left text-[16px] font-semibold text-[#221E33] whitespace-nowrap",
                                                index === 0 && "rounded-tl-[25px]",
                                                index === headerGroup.headers.length - 1 && "rounded-tr-[25px]"
                                            )}
                                            aria-sort={header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? 'ascending' : 'descending') : undefined}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        {/* <TableBody>
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
                        </TableBody> */}
                        <TableBody>
                            {/* Top spacing */}
                            <TableRow aria-hidden className="h-4">
                                <TableCell
                                    colSpan={table.getAllLeafColumns().length}
                                    className="py-0 h-4 border-0"
                                />
                            </TableRow>

                            {table.getRowModel().rows.map((row, rowIndex) => (
                                <React.Fragment key={row.id}>
                                    {rowIndex > 0 && (
                                        <TableRow aria-hidden className="h-4">
                                            <TableCell
                                                colSpan={table.getAllLeafColumns().length}
                                                className="py-0 h-4 border-0"
                                            />
                                        </TableRow>
                                    )}

                                    <TableRow className="bg-[#FAFAFE] rounded-[20px] border-0 cursor-pointer mx-4">
                                        {row.getVisibleCells().map((cell, cellIndex) => (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    // padding & rounding
                                                    "py-3 px-6 first:rounded-l-[20px] last:rounded-r-[20px] ",
                                                    // ✅ body side padding
                                                    cellIndex === 0 && "pl-10", // left side space
                                                    cellIndex === row.getVisibleCells().length - 1 && "pr-10" // right side space
                                                )}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </React.Fragment>
                            ))}

                            {/* Bottom spacing */}
                            <TableRow aria-hidden className="h-4">
                                <TableCell
                                    colSpan={table.getAllLeafColumns().length}
                                    className="py-0 h-4 border-0"
                                />
                            </TableRow>
                        </TableBody>

                    </Table>
                </div>
            </div>
        </>
    );

}

export default ReusableTable