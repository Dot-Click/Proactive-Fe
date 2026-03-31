import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { UsegetTrips } from "@/hooks/gettriphook";
import { UseSearchTrips } from "@/hooks/searchTripshook";
// import { UseupdateRejectedtripStatus } from "@/hooks/updatetripRejectedstatushook";
// import { Useupdatetripstatus } from "@/hooks/updatetripstatushook";
import { UseDeleteTrip } from "@/hooks/UseDeleteTripHook";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import { LoaderIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

type trip = {
  id: string;
  name: string;
  Coordinator: string;
  category: string;
  startDate: string;
  endDate: string;
  status: string;
  coverImage: string;
  description: string
};


const Tripoppurtunities = () => {
  const navigate = useNavigate();
  const { data: trip, isLoading, isError } = UsegetTrips();
  const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState<number>(10);

  const userData: ColumnDef<trip>[] = [
    {
      accessorKey: 'name',
      enableColumnFilter: true,
      enableSorting: true,
      header: () => (
        <div className="pl-8">
          <h1>Trip Name</h1>
        </div>
      ),

      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={row.original.coverImage || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center cursor-pointer">
              <span className="font-semibold text-[14px] text-[#666373]">
                {row.original.name}
              </span>
              <span className="text-[12px] text-[#666373] line-clamp-2">
                {row.original.description.slice(0, 50)}
              </span>
            </div>
          </div>
        )
      }
    },
    {
      accessorKey: 'category',
      enableColumnFilter: true,
      enableSorting: true,
      header: () => (
        <div>
          <h1>Category</h1>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Button className="text-center bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full
          px-4 py-5 font-semibold">
            {row.original.category}
          </Button>
        )
      }
    },
    {
      accessorKey: 'startDate',
      enableColumnFilter: true,
      enableSorting: true,
      header: () => (
        <div>
          <h1>startDate</h1>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div >
            <span className="text-[#666373] text-[13px]">
              {
                new Date(row.original.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              }
            </span>
          </div>
        )
      }
    },
    {
      accessorKey: 'endDate',
      enableColumnFilter: true,
      enableSorting: true,
      header: () => (
        <div>
          <h1>endDate</h1>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div >
            <span className="text-[#666373] text-[13px]">
              {
                new Date(row.original.endDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              }
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
        <div className="text-center">
          <h1>Status</h1>
        </div>
      ),
      cell: ({ row }) => {
        const isComingSoon = row.original.status === 'coming soon';
        return (
          <div className="text-center">
            <span
              className={`${isComingSoon ? 'bg-[#FD8B3A]/10 text-[#FD8B3A] border-[#FD8B3A]/20' : 'bg-[#0DAC87]/10 text-[#0DAC87] border-[#0DAC87]/20'} border px-4 py-1 rounded-full text-xs font-bold capitalize whitespace-nowrap`}
            >
              {row.original.status}
            </span>
          </div>
        )
      }
    },
    {
      accessorKey: 'Actions',
      enableColumnFilter: true,
      enableSorting: true,
      header: () => (
        <div>
          <h1>Actions</h1>
        </div>
      ),
      cell: ({ row }) => {
        const { mutateAsync: deleteTrip, isPending: isDeleting } = UseDeleteTrip();
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

        const HandleDeleteTrip = async (id: string) => {
          try {
            await deleteTrip(id);
            toast.success('Trip deleted successfully');
            setIsDeleteDialogOpen(false);
          } catch (error) {
            toast.error('Failed to delete trip');
          }
        }

        return (
          <div className="flex gap-2">
            <Button
              className="cursor-pointer px-7 h-10 rounded-full bg-[#0DAC87] hover:bg-[#119b7b]"
              onClick={() => navigate(`/dashboard/view-trip/${row.original.id}`)}
            >
              View
            </Button>
            <Button
              className="cursor-pointer px-7 h-10 rounded-full bg-[#221E33] hover:bg-[#322e47]"
              onClick={() => navigate(`/dashboard/edit-trip/${row.original.id}`)}
            >
              Edit
            </Button>
            
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer h-10 px-2 text-[#9C0000] hover:bg-[#9C0000]/10"
                  title="Delete trip"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl text-[#221E33]">Delete Trip</DialogTitle>
                  <DialogDescription className="mt-3 text-[#646464] text-[15px]">
                    Are you sure you want to delete <span className="font-bold text-[#221E33]">{row.original.name}</span>? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 flex gap-3 sm:justify-end">
                  <DialogClose asChild>
                    <Button variant="outline" className="font-bold rounded-full px-6" disabled={isDeleting}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button 
                    variant="destructive" 
                    className="bg-[#9C0000] font-bold text-white hover:bg-[#7a0000] rounded-full px-6" 
                    onClick={() => HandleDeleteTrip(row.original.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )
      }
    },
  ];
  const { data: searchResults, isLoading: isSearchLoading } = UseSearchTrips(searchQuery);

  if (isError) {
    return <div>Error loading membership data.</div>;
  }
  if (isLoading || isSearchLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <LoaderIcon className="animate-spin" />
      </div>
    )
  }

  // Use search results if available, otherwise use all trips
  const displayData = searchQuery && searchResults?.trips ? searchResults.trips : trip?.trips ?? [];

  return (
    <div>
      <TableHeader
        showSearch
        showFilter={false}
        showSort
        searchPlaceholder="Search Trips"
        // showAddButton={true}
        // addButtonLabel="Add New Trip"
        url='/dashboard/add-new-trip'
        showColumns
        columnsMenuItems={columnsMenu?.items ?? []}
        onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
        onSearch={(query) => setSearchQuery(query)}
        defaultLimit={pageSize}
        limitOptions={[5, 10, 20, 30, 50]}
        onLimitChange={(limit) => setPageSize(limit)}
      />
      <div className="bg-white rounded-[25px] mt-3">
        <ReusableTable
          data={displayData}
          columns={userData}
          onExposeColumns={(payload) => setColumnsMenu(payload)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>

    </div>
  )
}

export default Tripoppurtunities