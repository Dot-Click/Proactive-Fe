import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps<TData> {
    table: Table<TData>;
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
    const pageCount = table.getPageCount();
    const pageIndex = table.getState().pagination.pageIndex;

    // Generate page numbers logic
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (pageCount <= maxVisiblePages) {
            for (let i = 0; i < pageCount; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(0);

            let start = Math.max(1, pageIndex - 1);
            let end = Math.min(pageCount - 2, pageIndex + 1);

            if (pageIndex <= 2) {
                end = 3;
            } else if (pageIndex >= pageCount - 3) {
                start = pageCount - 4;
            }

            if (start > 1) {
                pages.push("ellipsis-1");
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < pageCount - 2) {
                pages.push("ellipsis-2");
            }

            // Always show last page
            pages.push(pageCount - 1);
        }
        return pages;
    };

    if (pageCount <= 1) return null;

    return (
        <div className="flex items-center justify-between px-4 py-4 w-full">
            <div className="text-sm text-[#666373] font-medium">
                Page {pageIndex + 1} of {pageCount}
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-lg border-[#EFEFEF] bg-[#FAFAFE] hover:bg-[#EFEFEF]"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className="h-4 w-4 text-[#666373]" />
                </Button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => {
                        if (typeof page === "string") {
                            return (
                                <span key={index} className="px-2 text-[#666373]">
                                    ...
                                </span>
                            );
                        }

                        const isActive = pageIndex === page;

                        return (
                            <Button
                                key={index}
                                variant={isActive ? "default" : "outline"}
                                className={`h-9 w-9 rounded-lg border-[#EFEFEF] transition-all duration-200 ${isActive
                                    ? "bg-black text-white hover:bg-black/90"
                                    : "bg-[#FAFAFE] text-[#666373] hover:bg-[#EFEFEF]"
                                    }`}
                                onClick={() => table.setPageIndex(page)}
                            >
                                {page + 1}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-lg border-[#EFEFEF] bg-[#FAFAFE] hover:bg-[#EFEFEF]"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className="h-4 w-4 text-[#666373]" />
                </Button>
            </div>
        </div>
    );
}
