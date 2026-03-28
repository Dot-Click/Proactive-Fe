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
import { useTranslation } from "react-i18next";

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

const getDisplayName = (user?: UserByIdResponse | null, t?: any) => {
  if (!user) return t ? t("profile.user") : "Unknown User";
  const composed = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return user.nickName || composed || (t ? t("profile.user") : "Unknown User");
};

const getUserStatsData = (t: any) => [
  {
    Name: t("userManagement.modal.tripCompleted"),
    Number: "03",
  },
  {
    Name: t("userManagement.modal.pointsEarned"),
    Number: "850",
  },
  {
    Name: t("userManagement.modal.destinations"),
    Number: "02",
  },
  {
    Name: t("userManagement.modal.memberSince"),
    Number: "02-24",
  },
];

const Modal = ({ userId }: ModalProps) => {
  const { t } = useTranslation();
  const { data: userById, isLoading, isError } = UsegetUserByID(userId);
  const updateRoleMutation = useUpdateUserRole(userId);
  const [selectedRole, setSelectedRole] = useState<"user" | "coordinator" | "admin" | "">(
    ""
  );
  
  const userData = getUserStatsData(t);

  // Update selectedRole when userById data loads
  useEffect(() => {
    if (userById?.userRoles) {
      setSelectedRole(userById.userRoles as "user" | "coordinator" | "admin");
    }
  }, [userById?.userRoles]);

  const name = getDisplayName(userById, t);
  const email = userById?.email ?? "—";
  const avatar = userById?.avatar ?? undefined;
  const membershipLabel = userById?.userRoles
    ? t(`roles.${userById.userRoles}`)
    : t("roles.user");
  const phone = userById?.phoneNumber ?? "—";
  const address = userById?.address ?? "—";

  const handleRoleChange = async () => {
    if (!selectedRole || selectedRole === userById?.userRoles) {
      toast.info(t("userManagement.modal.selectDifferent"));
      return;
    }

    try {
      await updateRoleMutation.mutateAsync({
        role: selectedRole as "user" | "coordinator" | "admin",
      });

      toast.success(t("userManagement.modal.successUpdate"));
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("userManagement.modal.failedToLoad"));
    }
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-[24px]">
            {t("userManagement.modal.userDetail")}
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <span className="text-[#221E33] font-semibold text-[16px]">
              {t("userManagement.modal.loading")}
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
                  <span className="text-[12px] text-[#D79511] mt-1 font-semibold uppercase">
                    {membershipLabel}
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-center">
                <span className="font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">
                  €897
                </span>
                <span className="text-[#666373] text-[13px]">{t("userManagement.modal.totalSpent")}</span>
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
                  {t("userManagement.modal.accountInfo")}
                </h1>
                <div className="border-b border-[#EDEDED]" />
                <div className="px-5 py-4 flex flex-col gap-6">
                  <div className="flex justify-between">
                    <span className="text-[#666373]">{t("userManagement.table.email")}</span>
                    <span className="text-[#666373]">{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666373]">{t("userManagement.table.phone")}</span>
                    <span className="text-[#666373]">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666373]">{t("userManagement.table.address")}</span>
                    <span className="text-[#666373] text-right">{address}</span>
                  </div>
                </div>
              </div>
              <div className="border border-[#E0E1E2] rounded-[10px]">
                <h1 className="text-[#221E33] font-medium text-[20px] m-5">
                  {t("userManagement.modal.status")}
                </h1>
                <div className="border-b border-[#EDEDED]" />
                <div className="px-5 py-4 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#666373]">{t("userManagement.modal.role")}</span>
                    <div className="flex items-center gap-2">
                      <Select
                        value={selectedRole}
                        onValueChange={(value) =>
                          setSelectedRole(value as "user" | "coordinator" | "admin")
                        }
                      >
                        <SelectTrigger className="w-[140px] h-[40px] border border-[#E0E1E2] rounded-[6px]">
                          <SelectValue placeholder={t("userManagement.modal.selectRole")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">{t("roles.user")}</SelectItem>
                          <SelectItem value="coordinator">{t("roles.coordinator")}</SelectItem>
                          <SelectItem value="admin">{t("roles.admin")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedRole && selectedRole !== userById?.userRoles && (
                        <Button
                          onClick={handleRoleChange}
                          disabled={updateRoleMutation.isPending}
                          className="h-[40px] px-3 bg-[#156250] hover:bg-[#0f4a3d] text-white rounded-[6px]"
                          size="sm"
                        >
                          {updateRoleMutation.isPending ? t("userManagement.modal.saving") : t("userManagement.modal.save")}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#666373]">{t("userManagement.modal.emailVerified")}</span>
                    <Badge
                      className={`px-3 py-2 rounded-[6px] font-medium text-[14px] ${userById?.emailVerified ? "bg-[#C4FFF0] text-[#156250]" : "bg-[#FFE8E6] text-[#9C0000]"}`}
                    >
                      {userById?.emailVerified ? t("userManagement.modal.yes") : t("userManagement.modal.no")}
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
              {t("userManagement.modal.goBack")}
            </Button>
          </DialogClose>
          <div className="w-full flex md:flex-row flex-col gap-4 ">
            <Button className="font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10">
              {t("userManagement.modal.sendEmail")}
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

