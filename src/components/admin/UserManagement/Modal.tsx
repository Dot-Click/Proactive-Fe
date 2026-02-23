import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsegetUserByID, type UserByIdResponse } from "@/hooks/getUserById";
import { useUpdateUserRole } from "@/hooks/updateUserRolehook";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type ModalProps = {
  userId: string;
};

const getInitials = (value?: string | null) => {
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

const getDisplayName = (user?: UserByIdResponse | null) => {
  if (!user) return "Unknown User";
  const composed = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return user.nickName || composed || "Unknown User";
};

const userData = [
  {
    Name: "Trip Completed",
    Number: "03",
  },
  {
    Name: "Points Earned",
    Number: "850",
  },
  {
    Name: "Destinations",
    Number: "02",
  },
  {
    Name: "Member since",
    Number: "02-24",
  },
];

const Modal = ({ userId }: ModalProps) => {
  const { data: userById, isLoading, isError } = UsegetUserByID(userId);
  const updateRoleMutation = useUpdateUserRole(userId);
  const [selectedRole, setSelectedRole] = useState<"user" | "coordinator" | "admin" | "">(
    ""
  );

  // Update selectedRole when userById data loads
  useEffect(() => {
    if (userById?.userRoles) {
      setSelectedRole(userById.userRoles as "user" | "coordinator" | "admin");
    }
  }, [userById?.userRoles]);

  const name = getDisplayName(userById);
  const email = userById?.email ?? "—";
  const avatar = userById?.avatar ?? undefined;
  const membership = userById?.userRoles
    ? userById.userRoles.toUpperCase()
    : "USER";
  const phone = userById?.phoneNumber ?? "—";
  const address = userById?.address ?? "—";

  const handleRoleChange = async () => {
    if (!selectedRole || selectedRole === userById?.userRoles) {
      toast.info("Select a different role to change");
      return;
    }

    try {
      const result = await updateRoleMutation.mutateAsync({
        role: selectedRole as "user" | "coordinator" | "admin",
      });

      toast.success(result.message || "Role updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-[24px]">
            User Detail
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <span className="text-[#221E33] font-semibold text-[16px]">
              Loading user...
            </span>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-10">
            <span className="text-[#D14343] font-semibold text-[16px]">
              Failed to load user.
            </span>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="flex flex-col lg:flex-row items-start gap-2 bg-[#FAFAFE] px-6 py-7 rounded-[12px] mt-5">
              <div className="flex lg:flex-row gap-3 lg:gap-4 items-start w-full">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start ">
                  <span className="text-[18px] text-[#221E33] font-medium">
                    {name}
                  </span>
                  <span className="text-[12px] text-[#666373]">{email}</span>
                  <span className="text-[12px] text-[#D79511] mt-1 font-semibold">
                    {membership}
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-center">
                <span className="font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">
                  €897
                </span>
                <span className="text-[#666373] text-[13px]">Total Spent</span>
              </div>
            </div>

            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 ">
              {userData.map((user, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center rounded-[12px] px-5 py-6 bg-[#FAFAFE] hover:shadow-sm transition-all duration-300"
                >
                  <span className="cursor-pointer font-bold text-[30px] bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">
                    {user.Number}
                  </span>
                  <span className="cursor-pointer text-[#666373]">
                    {user.Name}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-[#E0E1E2] rounded-[10px]">
                <h1 className="text-[#221E33] font-medium text-[20px] m-5">
                  Account Information
                </h1>
                <div className="border-b border-[#EDEDED]" />
                <div className="px-5 py-4 flex flex-col gap-6">
                  <div className="flex justify-between">
                    <span className="text-[#666373]">Email</span>
                    <span className="text-[#666373]">{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666373]">Phone</span>
                    <span className="text-[#666373]">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666373]">Address</span>
                    <span className="text-[#666373] text-right">{address}</span>
                  </div>
                </div>
              </div>
              <div className="border border-[#E0E1E2] rounded-[10px]">
                <h1 className="text-[#221E33] font-medium text-[20px] m-5">
                  Status
                </h1>
                <div className="border-b border-[#EDEDED]" />
                <div className="px-5 py-4 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#666373]">Role</span>
                    <div className="flex items-center gap-2">
                      <Select
                        value={selectedRole}
                        onValueChange={(value) =>
                          setSelectedRole(value as "user" | "coordinator" | "admin")
                        }
                      >
                        <SelectTrigger className="w-[140px] h-[40px] border border-[#E0E1E2] rounded-[6px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="coordinator">Coordinator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedRole && selectedRole !== userById?.userRoles && (
                        <Button
                          onClick={handleRoleChange}
                          disabled={updateRoleMutation.isPending}
                          className="h-[40px] px-3 bg-[#156250] hover:bg-[#0f4a3d] text-white rounded-[6px]"
                          size="sm"
                        >
                          {updateRoleMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#666373]">Email Verified</span>
                    <Badge
                      className={`px-3 py-2 rounded-[6px] font-medium text-[14px] ${userById?.emailVerified ? "bg-[#C4FFF0] text-[#156250]" : "bg-[#FFE8E6] text-[#9C0000]"}`}
                    >
                      {userById?.emailVerified ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex md:flex-row flex-col gap-2 justify-between items-center mt-8">
          <DialogClose asChild>
            <Button className="w-full md:w-auto rounded-full bg-[#E0DDDD] hover:bg-[#c7c1c1] cursor-pointer text-[#606066] h-12 px-10 font-bold">
              Go Back
            </Button>
          </DialogClose>
          <div className="w-full flex md:flex-row flex-col gap-4 ">
            <Button className="font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10">
              Send Email
            </Button>
            {/* <Button
              variant={"outline"}
              className="cursor-pointer font-bold rounded-full h-12 px-10 border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000]"
            >
              Block User
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default Modal;

