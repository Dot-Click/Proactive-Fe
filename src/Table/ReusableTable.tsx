import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'

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
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-100 rounded-md shadow-md">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-6 py-4 font-medium"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="bg-[#FAFAFE] cursor-pointer">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="py-3 px-6">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default ReusableTable