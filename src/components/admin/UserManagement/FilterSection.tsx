import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReusableTable from "@/Table/ReusableTable";
import { type ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Modal from "./Modal";
import TableHeader from "@/Table/TableHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseGetAllUser } from "@/hooks/getUserhook";
import { useUpdateUserStatus } from "@/hooks/updateUserStatushook";
import { useMemo, useState } from "react";

type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  email: string;
  avatar?: string | null;
  phoneNumber?: string;
  address?: string;
  dob?: string;
  gender?: string;
  provider?: string;
  emailVerified?: boolean;
  userRoles?: string;
  lastActive?: string | null;
  createdAt?: string;
  updatedAt?: string;
  coordinatorDetailsId?: string | null;
  userStatus?: string;
};

const getInitials = (value?: string) => {
  if (!value) return "?";
  const parts = value.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  return (
    parts
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) || "?"
  );
};

const getDisplayName = (user: User) => {
  const composedName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return user.nickName || composedName || "Unknown User";
};

const getShortId = (id: string, index: number) => {
  if (!id) return `#${index + 1}`;
  return id.length > 8 ? `${id.slice(0, 8)}...` : id;
};

// const formatDate = (value?: string | null) => {
//   if (!value) return "—";
//   const parsed = new Date(value);
//   if (Number.isNaN(parsed.getTime())) return "—";
//   return parsed.toLocaleDateString();
// };

const StatusCell = ({ row }: { row: any }) => {
  const { mutate } = useUpdateUserStatus();
  // Default to lower case "active"
  const status = row.original.userStatus || "active";
  const isActive = status === "active";

  return (
    <div className="flex justify-center items-center">
      <Select
        value={status}
        onValueChange={(val) =>
          mutate({ userId: row.original.id, status: val })
        }
      >
        <SelectTrigger
          className={`${
            isActive
              ? "text-[#077B21] bg-[#35FF62]/10 border-[#077B21]"
              : "text-[#D14343] bg-[#D14343]/10 border-[#D14343]"
          } font-bold w-[120px] rounded-full text-[13px] px-4 py-4 border gap-1`}
        >
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="active" className="font-bold">
              Active
            </SelectItem>
            <SelectItem value="inactive" className="font-bold">
              Inactive
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-6">
        <h1>ID</h1>
      </div>
    ),
    cell: ({ row }) => <span>{getShortId(row.original.id, row.index)}</span>,
  },
  {
    accessorKey: "nickName",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-10">
        <h1>Name</h1>
      </div>
    ),
    cell: ({ row }) => {
      const name = getDisplayName(row.original);
      return (
        <div className="flex items-center gap-2 pl-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={row.original.avatar ?? undefined} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div>
        <h1>Email</h1>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pr-2">
        <span>{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="text-start">
        <h1>Phone</h1>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <span>{row.original.phoneNumber || "—"}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="text-center">
        <h1>Status</h1>
      </div>
    ),
    /* @ts-ignore */
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    accessorKey: "actions",
    header: () => (
      <div>
        <h1>Actions</h1>
      </div>
    ),
    cell: ({ row }) => {
      const userId = row.original.id;

      return (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hover:bg-[#000000] cursor-pointer rounded-full px-8 py-6 font-semibold">
                View Detail
              </Button>
            </DialogTrigger>
            <Modal userId={userId} />
          </Dialog>
        </div>
      );
    },
  },
];

const FilterSection = () => {
  const { data: getAllUser, isLoading, isError } = UseGetAllUser();
  const [columnsMenu, setColumnsMenu] = useState<{
    items: { id: string; label?: string; checked: boolean }[];
    toggle: (id: string, v: boolean) => void;
  } | null>(null);

  const users = useMemo(
    () => (Array.isArray(getAllUser) ? getAllUser : []),
    [getAllUser],
  );

  return (
    <>
      <TableHeader
        showColumns
        columnsMenuItems={columnsMenu?.items ?? []}
        onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
        showFilter={false}
      />
      <div className="bg-white rounded-[25px] mt-3 overflow-x-auto">
        {isError ? (
          <div className="flex items-center justify-center px-4 py-6">
            <span className="text-[#D14343] font-semibold text-[16px]">
              Failed to load users.
            </span>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center px-4 py-6">
            <span className="text-[#221E33] font-semibold text-[16px]">
              Loading users...
            </span>
          </div>
        ) : (
          <ReusableTable
            columns={userColumns}
            data={users}
            onExposeColumns={(payload) => setColumnsMenu(payload)}
          />
        )}
      </div>
    </>
  );
};

export default FilterSection;