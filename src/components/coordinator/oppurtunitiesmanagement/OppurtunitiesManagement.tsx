import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { UsegetTrips } from "@/hooks/gettriphook";
import { UseSearchTrips } from "@/hooks/searchTripshook";
import { LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Trip = {
  id: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  status: string;
  coverImage: string;
  description: string;
};

const OppurtunitiesManagement = () => {
  const navigate = useNavigate();

  const columns: ColumnDef<Trip>[] = [
    {
      accessorKey: "name",
      enableColumnFilter: true,
      enableSorting: true,
      header: () => (
        <div className="pl-6">
          <h1>Trip Name</h1>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={row.original.coverImage || "https://github.com/shadcn.png"}
              alt="cover"
            />
            <AvatarFallback>TR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#3b3745] text-nowrap">
              {row.original.name}
            </span>
            <span className="text-xs text-[#8a8698] line-clamp-1">
              {row.original.description.slice(0, 50)}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      enableColumnFilter: true,
      enableSorting: true,
      header: () => (
        <div className="pl-8">
          <h1>Category</h1>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 pl-6 min-w-[120px]">
          <Button className="bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full px-4 py-5 font-semibold">
            {row.original.category}
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "dates",
      header: () => (
        <div>
          <h1>Dates</h1>
        </div>
      ),
      cell: ({ row }) => {
        const s = new Date(row.original.startDate);
        const e = new Date(row.original.endDate);
        const fmt = (d: Date) =>
          d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        return (
          <div className="flex flex-col min-w-[200px]">
            <div className="font-semibold text-[#666373] text-[14px] whitespace-nowrap">{`${fmt(
              s
            )} – ${fmt(e)}`}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      enableColumnFilter: true,
      enableSorting: true,
      header: () => (
        <div className="pl-4">
          <h1>Status</h1>
        </div>
      ),
      cell: ({ row }) => (
        <div className="min-w-[140px]">
          <Button className="bg-[#077B21]/10 hover:bg-[#077B21]/20 border border-[#077B21] cursor-pointer px-8 h-10 rounded-full text-[#077B21] font-bold whitespace-nowrap">
            {row.original.status}
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => (
        <div>
          <h1>Actions</h1>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            onClick={() =>
              navigate(`/coordinator-dashboard/view-trip/${row.original.id}`)
            }
            className="rounded-full text-md px-10 py-5 cursor-pointer"
          >
            View
          </Button>
          <Button
            onClick={() =>
              navigate(`/coordinator-dashboard/edit-trip/${row.original.id}`)
            }
            className="rounded-full bg-white hover:bg-[#f0ebeb] text-[#666373] border border-[#666373] text-md px-10 py-5 cursor-pointer"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState<number>(10);
  const { data: trip, isLoading, isError } = UsegetTrips();
  const { data: searchData, isLoading: searchLoading } =
    UseSearchTrips(searchQuery);
  const [columnsMenu, setColumnsMenu] = useState<{
    items: { id: string; label?: string; checked: boolean }[];
    toggle: (id: string, v: boolean) => void;
  } | null>(null);

  // Use search results if search query exists, otherwise use all trips
  const displayData = searchQuery ? searchData?.trips ?? [] : trip?.trips ?? [];

  // Only show initial loading state, not during search
  const isInitialLoading = !searchQuery && isLoading;

  if (isError && !searchQuery) {
    return <div>Error loading trips.</div>;
  }
  if (isInitialLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="lg:mt-5">
      <TableHeader
        showSearch
        showFilter={false}
        showSort
        searchPlaceholder="Search Trips"
        searchValue={searchQuery}
        showAddButton={true}
        addButtonLabel="Add New Trip"
        url="/coordinator-dashboard/add-new-trip"
        showColumns
        columnsMenuItems={columnsMenu?.items ?? []}
        onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
        onSearch={(query) => setSearchQuery(query)}
        defaultLimit={pageSize}
        limitOptions={[5, 10, 20, 30, 50]}
        onLimitChange={(limit) => setPageSize(limit)}
      />
      <div className="bg-white rounded-[25px] mt-3 overflow-x-auto relative">
        {searchLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-[25px] z-10">
            <LoaderIcon className="animate-spin" size={24} />
          </div>
        )}
        <ReusableTable
          columns={columns}
          data={displayData}
          onExposeColumns={(payload) => setColumnsMenu(payload)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};

export default OppurtunitiesManagement;
