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

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    //  data length 0 how show no data found
    if (data?.length === 0) {
        return (
            <div className="flex items-center justify-center px-4 py-6 rounded-[20px] transition-all duration-300">
                <span className="text-[#221E33] font-semibold text-[16px] text-center">No Data Found</span>
            </div>
        );
    }
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

                        <TableBody>
                            <TableRow aria-hidden className="h-4">
                                <TableCell colSpan={table.getAllLeafColumns().length} className="py-0 h-4 border-0" />
                            </TableRow>

                            {table.getRowModel().rows.map((row, rowIndex) => {
                                const visibleCells = row.getVisibleCells(); // snapshot of rendered cells
                                const lastIndex = visibleCells.length - 1;

                                return (
                                    <React.Fragment key={row.id}>
                                        {rowIndex > 0 && (
                                            <TableRow aria-hidden className="h-4">
                                                <TableCell colSpan={table.getAllLeafColumns().length} className="py-0 h-4 border-0" />
                                            </TableRow>
                                        )}

                                        <TableRow className="bg-[#FAFAFE] border-0 cursor-pointer">
                                            {visibleCells.map((cell, cellIndex) => {
                                                const left = cellIndex === 0 ? "2.5rem" : undefined;
                                                const right = cellIndex === lastIndex ? "2.5rem" : undefined;

                                                return (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="py-3 px-6"
                                                        style={{
                                                            paddingLeft: left,
                                                            paddingRight: right,
                                                        }}
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>

                                    </React.Fragment>
                                );
                            })}

                            <TableRow aria-hidden className="h-4">
                                <TableCell colSpan={table.getAllLeafColumns().length} className="py-0 h-4 border-0" />
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );

}

export default ReusableTable