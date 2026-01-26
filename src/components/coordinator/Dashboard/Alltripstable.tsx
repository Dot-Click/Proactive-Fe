import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UsegetcoordinatordashboardStats } from "@/hooks/getcoordinatordashboardStats";
import { UsegetTripbyid } from "@/hooks/gettripbyidhook";
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
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
//     const data: User[] = [
//     {
//         tripName: allTripsdata?.tripName || "Wild Weekend Barcelona",
//         Categories: "Weekend",
//         Date: "10–12 Sep 2025",
//     },
//     {
//         tripName: "Wild Weekend Barcelona",
//         Categories: "Weekend",
//         Date: "10–12 Sep 2025",
//     },
//     {
//         tripName: "Wild Weekend Barcelona",
//         Categories: "Weekend",
//         Date: "10–12 Sep 2025",
//     },
//     {
//         tripName: "Wild Weekend Barcelona",
//         Categories: "Weekend",
//         Date: "10–12 Sep 2025",
//     },
//     {
//         tripName: "Wild Weekend Barcelona",
//         Categories: "Weekend",
//         Date: "10–12 Sep 2025",
//     },
// ];

type User = {
  id: string;
  tripName: string;
  category: string;
  startDate: string;
  location: string;
};

const userData: ColumnDef<User>[] = [
  {
    accessorKey: "tripName",
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
          <span className="text-xs text-[#8a8698]">
            {row.original.location}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="font-semibold pl-2">Category</div>,
    cell: ({ row }) => (
      <div className="w-40">
        <div className="text-center bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full py-3 font-semibold">
          {row.original.category}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: () => <div className="font-semibold">Dates</div>,
    cell: ({ row }) => (
      <div className="flex flex-col w-40">
        <div className="font-semibold text-[#666373] text-[14px]">
          {new Date(row.original.startDate).toLocaleString("en-Us", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </div>
        {/* <span className="text-[#666373] text-[12px]">8/16 joined</span> */}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-semibold">Actions</div>,
    cell: ({ row }) => <TripActionsCell tripId={row.original.id} />,
  },
];

interface TripActionsCellProps {
  tripId: string;
}

const TripActionsCell = ({ tripId }: TripActionsCellProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button
          className="rounded-full text-md px-10 py-6 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          View
        </Button>
        {/* <Button className="rounded-full bg-white hover:bg-[#f0ebeb] text-[#666373] border border-[#666373] text-md px-10 py-6 cursor-pointer">
          Edit
        </Button> */}
      </div>
      <TripDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tripId={tripId}
      />
    </>
  );
};

interface TripDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
}

const TripDetailsModal = ({
  isOpen,
  onClose,
  tripId,
}: TripDetailsModalProps) => {
  const { data: allDetails, isLoading, isError } = UsegetTripbyid(tripId);
  const tripDetails: any = allDetails?.trip;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Trip Details</DialogTitle>
          <DialogDescription>
            View detailed information about this trip
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <LoaderIcon className="animate-spin" />
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-center py-4">
            Error loading trip details. Please try again.
          </p>
        )}

        {tripDetails && !isLoading && (
          <div className="space-y-5">
            {/* Cover Image */}
            {tripDetails.coverImage && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={tripDetails.coverImage}
                  alt={tripDetails.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            {/* Title and Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#666373]">Title</p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.title || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#666373]">Type</p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.type || "N/A"}
                </p>
              </div>
            </div>

            {/* Location and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#666373]">Location</p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.location || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#666373]">Duration</p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.duration || "N/A"}
                </p>
              </div>
            </div>

            {/* Start and End Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#666373]">
                  Start Date
                </p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.startDate
                    ? new Date(tripDetails.startDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#666373]">End Date</p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.endDate
                    ? new Date(tripDetails.endDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Group Size and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#666373]">
                  Group Size
                </p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.groupSize || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#666373]">
                  Price Per Head
                </p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.perHeadPrice
                    ? `$${tripDetails.perHeadPrice}`
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Rhythm and Sport Level */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#666373]">Rhythm</p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.rhythm || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#666373]">
                  Sport Level
                </p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.sportLvl || "N/A"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm font-semibold text-[#666373]">
                Description
              </p>
              <p className="text-sm text-[#3b3745] font-medium">
                {tripDetails.description || "No description provided"}
              </p>
            </div>

            {/* Long Description */}
            {tripDetails.longDesc && (
              <div>
                <p className="text-sm font-semibold text-[#666373]">Details</p>
                <p className="text-sm text-[#3b3745] font-medium">
                  {tripDetails.longDesc}
                </p>
              </div>
            )}

            {/* Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#666373]">Status</p>
                <div className="text-center bg-[#FD8B3A] text-white rounded-full py-2 font-semibold text-sm w-fit px-4 capitalize">
                  {tripDetails.status || "N/A"}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#666373]">
                  Approval Status
                </p>
                <div
                  className={`text-center rounded-full py-2 font-semibold text-sm w-fit px-4 capitalize ${
                    tripDetails.approvalStatus === "approved"
                      ? "bg-green-500 text-white"
                      : tripDetails.approvalStatus === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-white"
                  }`}
                >
                  {tripDetails.approvalStatus || "N/A"}
                </div>
              </div>
            </div>

            {/* Coordinator Info */}
            {tripDetails.coordinator && (
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-[#666373] mb-3">
                  Coordinator
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={tripDetails.coordinator.profilePicture}
                      alt={tripDetails.coordinator.fullName}
                    />
                    <AvatarFallback>
                      {tripDetails.coordinator.fullName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#3b3745]">
                      {tripDetails.coordinator.fullName}
                    </p>
                    <p className="text-xs text-[#8a8698]">
                      {tripDetails.coordinator.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Included and Not Included */}
            {(tripDetails.included?.length > 0 ||
              tripDetails.notIncluded?.length > 0) && (
              <div className="border-t pt-4">
                {tripDetails.included?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-[#666373] mb-2">
                      What's Included
                    </p>
                    <ul className="space-y-1">
                      {tripDetails.included.map((item: any, idx: number) => (
                        <li
                          key={idx}
                          className="text-sm text-[#3b3745] flex items-start gap-2"
                        >
                          <span className="text-[#FD8B3A] mt-1">•</span>
                          <span className="capitalize">{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tripDetails.notIncluded?.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-[#666373] mb-2">
                      What's Not Included
                    </p>
                    <ul className="space-y-1">
                      {tripDetails.notIncluded.map((item: any, idx: number) => (
                        <li
                          key={idx}
                          className="text-sm text-[#3b3745] flex items-start gap-2"
                        >
                          <span className="text-red-500 mt-1">•</span>
                          <span className="capitalize">{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full px-10 py-6"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Alltripstable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const {
    data: alltrips,
    isLoading,
    isError,
  } = UsegetcoordinatordashboardStats();
  const allTripsdata = alltrips?.allTrips;
  const table = useReactTable({
    data: allTripsdata ?? [],
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
          Showing {table.getRowModel().rows.length} of {allTripsdata?.length}{" "}
          trips
        </span>
      </div>
      {isLoading && (
        <div className="w-full flex items-center justify-center py-10">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
      {isError && <p className="text-red-500">Error loading data.</p>}
      <div className="rounded-lg overflow-y-auto max-h-[300px] pl-2">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead className="text-left text-md font-bold text-[#221E33]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => (
                  <th
                    key={header.id}
                    className={`py-3 ${i === 0 ? "px-4" : "pl-4"}`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="bg-[#FAFAFE] rounded-[20px]">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-3 py-6 first:rounded-l-[8px] last:rounded-r-[8px]`}
                  >
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
