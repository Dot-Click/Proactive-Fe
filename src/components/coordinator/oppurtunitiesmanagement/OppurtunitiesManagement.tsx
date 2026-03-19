import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { UsegetTrips } from "@/hooks/gettriphook";
import { UseSearchTrips } from "@/hooks/searchTripshook";
import { LoaderIcon, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetTripParticipants } from "@/hooks/useGetTripParticipants";
import TripDiscountsModal from "./TripDiscountsModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Trip = {
  id: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  status: string;
  coverImage: string;
  description: string;
  participantCount?: number;
  groupSize?: number;
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
      accessorKey: "participants",
      header: () => (
        <div className="pl-4">
          <h1>Applied / Max</h1>
        </div>
      ),
      cell: ({ row }) => (
        <ParticipantsCell
          tripId={row.original.id}
          applied={row.original.participantCount || 0}
          max={row.original.groupSize || 0}
        />
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
          <TripDiscountAction tripId={row.original.id} tripName={row.original.name} />
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

const TripDiscountAction = ({ tripId, tripName }: { tripId: string; tripName: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-[#0DAC87]/10 text-[#0DAC87] border border-[#0DAC87]/20 hover:bg-[#0DAC87]/20 p-5 cursor-pointer shrink-0"
        title="Manage Discounts"
      >
        <Tag size={18} />
      </Button>
      <TripDiscountsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        tripId={tripId}
        tripName={tripName}
      />
    </>
  );
};

export default OppurtunitiesManagement;
