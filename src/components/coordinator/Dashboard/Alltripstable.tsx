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
  status: string;
  groupSize: number;
  participantCount: number;
};

import { useGetTripParticipants } from "@/hooks/useGetTripParticipants";


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
    accessorKey: "status",
    header: () => <div className="font-semibold text-center">Status</div>,
    cell: ({ row }) => {
      const isComingSoon = row.original.status === 'coming soon';
      return (
        <div className="flex justify-center w-full">
          <span
            className={`${isComingSoon ? 'bg-[#FD8B3A]/10 text-[#FD8B3A] border-[#FD8B3A]/20' : 'bg-[#0DAC87]/10 text-[#0DAC87] border-[#0DAC87]/20'} border px-4 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap`}
          >
            {row.original.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "participants",
    header: () => <div className="font-semibold text-center text-nowrap">Applied / Max</div>,
    cell: ({ row }) => (
      <ParticipantsCell
        tripId={row.original.id}
        applied={row.original.participantCount}
        max={row.original.groupSize}
      />
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-semibold">Actions</div>,
    cell: ({ row }) => <TripActionsCell tripId={row.original.id} />,
  },
];

const ParticipantsCell = ({ tripId, applied, max }: { tripId: string, applied: number, max: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center w-full min-w-[100px]">
      <button
        onClick={() => setIsOpen(true)}
        className="text-[#3b3745] font-bold bg-[#0DAC87]/5 hover:bg-[#0DAC87]/10 border border-[#0DAC87]/20 px-4 py-2 rounded-lg transition-all cursor-pointer"
      >
        {applied || 0} / {max || 0}
      </button>
      <ParticipantsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        tripId={tripId}
      />
    </div>
  );
};

const ParticipantsModal = ({
  isOpen,
  onClose,
  tripId,
}: {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
}) => {
  const { data: participants, isLoading, isError } = useGetTripParticipants(tripId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-bold text-[#221E33]">Participants List</DialogTitle>
            <DialogDescription className="text-gray-500">
              Complete list of travelers who have applied for this opportunity.
            </DialogDescription>
          </div>
        </DialogHeader>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <LoaderIcon className="animate-spin text-[#0DAC87] h-8 w-8" />
            <p className="text-gray-400 font-medium animate-pulse">Fetching participant data...</p>
          </div>
        )}

        {isError && (
          <div className="py-10 text-center">
            <p className="text-red-500 font-semibold bg-red-50 p-4 rounded-xl inline-block border border-red-100">
              Error: Could not retrieve participant list.
            </p>
          </div>
        )}

        {participants && (
          <div className="mt-6">
            {participants.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">No applications found for this trip yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {participants.map((p: any) => (
                  <div 
                    key={p.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#0DAC87]/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarFallback className="bg-[#0DAC87]/10 text-[#0DAC87] font-bold text-lg">
                            {p.userFirstName?.[0]}
                            {p.userLastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${p.paymentStatus === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold text-[#3b3745] group-hover:text-[#0DAC87] transition-colors">
                          {p.userFirstName} {p.userLastName}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">{p.userEmail}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          p.status === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : p.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {p.status}
                        </span>
                        {p.paymentStatus && (
                          <p className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[100px]">
                            {p.paymentStatus}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} className="rounded-full px-10 py-6 border-2 font-bold hover:bg-gray-50">
            Close List
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
