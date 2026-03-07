import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { UsegetallApplication } from "@/hooks/getallApplication";
import { LoaderIcon, CheckCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { Dialog } from "@/components/ui/dialog";
import UserModal from "@/components/admin/UserManagement/Modal";

interface TripParticipantsProps {
  tripId: string;
  isWildTrips: boolean;
}

const TripParticipants = ({ tripId, isWildTrips }: TripParticipantsProps) => {
  const { data: applicationdata, isLoading, isError } = UsegetallApplication();
  const [pageSize, setPageSize] = useState<number>(10);
  const [columnsMenu, setColumnsMenu] = useState<{
    items: { id: string; label?: string; checked: boolean }[];
    toggle: (id: string, v: boolean) => void;
  } | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const participants = useMemo(() => {
    if (!applicationdata) return [];
    return applicationdata.filter((app: any) => {
      const matchTrip = String(app.tripId) === String(tripId) || String(app.trip?._id || app.trip?.id) === String(tripId);
      const okStatus = app.status === "approved" || app.status === "confirmed";
      return matchTrip && okStatus;
    });
  }, [applicationdata, tripId]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "userFirstName",
      enableColumnFilter: true,
      enableSorting: true,
      header: () => <div className="pl-6"><h1>Name</h1></div>,
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={row.original.avatar || "https://github.com/shadcn.png"}
              alt="profile"
            />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#3b3745] text-nowrap">
              {row.original.userFirstName} {row.original.userLastName}
            </span>
            <span className="text-xs text-[#8a8698] line-clamp-1">
              {row.original.userEmail}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div><h1>Status</h1></div>,
    },
    ...(isWildTrips
      ? [
        {
          id: "payment",
          header: () => <div><h1>Payment</h1></div>,
          cell: ({ row }: any) => {
            const paymentValue = (row.original.paymentStatus || row.original.isPaid || "").toString().toLowerCase();
            const isPaid = ["paid", "success", "succeeded", "completed", "confirmed"].includes(paymentValue) || row.original.isPaid === true;
            return isPaid ? (
              <CheckCircle className="text-[#0DAC87]" />
            ) : (
              <span className="text-xs text-[#666373]">—</span>
            );
          },
        },
      ]
      : []),
    {
      id: "profile",
      header: () => <div><h1>Profile</h1></div>,
      cell: ({ row }) => (
        <Button
          className="rounded-full text-md px-6 py-5 cursor-pointer"
          onClick={() => {
            const uid = row.original.userId || row.original.user_id || null;
            if (uid) setSelectedUserId(uid);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="lg:mt-5">
      {isLoading && (
        <div className="w-full flex items-center justify-center py-10">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
      {isError && <p className="text-red-500">Error loading participants.</p>}
      <TableHeader
        showSearch={false}
        showFilter={false}
        showSort={false}
        showColumns
        columnsMenuItems={columnsMenu?.items ?? []}
        onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
        defaultLimit={pageSize}
        limitOptions={[5, 10, 20, 30, 50]}
        onLimitChange={(limit) => setPageSize(limit)}
      />
      <div className="bg-white rounded-[25px] mt-3">
        <ReusableTable
          columns={columns}
          data={participants}
          onExposeColumns={(payload) => setColumnsMenu(payload)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>

      <Dialog
        open={!!selectedUserId}
        onOpenChange={(open) => {
          if (!open) setSelectedUserId(null);
        }}
      >
        {selectedUserId && <UserModal userId={selectedUserId} />}
      </Dialog>
    </div>
  );
};

export default TripParticipants;
