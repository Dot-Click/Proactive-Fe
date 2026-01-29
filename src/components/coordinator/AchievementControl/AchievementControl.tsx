import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import Mountain from "../../../assets/Mountain.png";
import Explorer from "../../../assets/Explorer.png";
import { Progress } from "@/components/ui/progress";
import Achievementlibrary from "./Achievementlibrary";
import { UsegetallAchievements } from "@/hooks/getallAchievementhook";
import { LoaderIcon } from "lucide-react";

type User = {
  id: string;
  Name: string;
  Trips: string;
  AdventurePoints: number;
  LevelProgress: string;
  badges: string;
  avatar: string;
  userEmail: string;
};

const transformAchievementData = (achievements: any[]): User[] => {
  return achievements.map((achievement) => ({
    id: achievement.id,
    Name: `${achievement.user.firstName} ${achievement.user.lastName}`,
    Trips: achievement.trip.title,
    AdventurePoints: achievement.points,
    LevelProgress: achievement.level,
    badges: achievement.badges,
    avatar: achievement.user.avatar,
    userEmail: achievement.user.email,
  }));
};

const data: User[] = [];

const userData: ColumnDef<User>[] = [
  {
    accessorKey: "Name",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-6">
        <h1>Name</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={row.original.avatar} alt={row.original.Name} />
            <AvatarFallback>
              {row.original.Name.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#3b3745] text-nowrap">
              {row.original.Name}
            </span>
            <span className="text-xs text-[#8a8698]">
              {row.original.userEmail}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Trips",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-6">
        <h1>Trips</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 pl-6 w-50">
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#3b3745] text-nowrap">
              {row.original.Trips}
            </span>
            {/* <span className="text-xs text-[#8a8698]">Barcelona, Spain</span> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "AdventurePoints",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="">
        <h1>Adventure Points</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col w-30">
          <div className="font-semibold text-[#666373] text-[14px] text-center">
            {row.original.AdventurePoints}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "LevelProgress",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="text-start">
        <h1>Level Progress</h1>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-40">
        <div className="flex flex-col gap-1">
          <span>{row.original.LevelProgress}</span>
          <span className="text-[12px] text-[#666373]">
            <Progress
              value={80}
              className="[&>div]:bg-[#16A34A] lg:w-[100%] w-[150px]"
            />
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "BadgesEarned",
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="">
        <h1>Badges Earned</h1>
      </div>
    ),
    cell: ({ row }) => {
      const getBadgeIcon = (badgeName: string) => {
        if (badgeName.toLowerCase().includes("mountain")) return Mountain;
        if (badgeName.toLowerCase().includes("explorer")) return Explorer;
        return Mountain;
      };

      const getBadgeColor = (badgeName: string) => {
        if (badgeName.toLowerCase().includes("mountain"))
          return {
            bg: "bg-[#FAFAFE]",
            border: "border-[#0DAC87]",
            text: "text-[#0DAC87]",
          };
        if (badgeName.toLowerCase().includes("explorer"))
          return {
            bg: "bg-[#FAFAFE]",
            border: "border-[#DDAC24]",
            text: "text-[#DDAC24]",
          };
        return {
          bg: "bg-[#FAFAFE]",
          border: "border-[#0DAC87]",
          text: "text-[#0DAC87]",
        };
      };

      const colors = getBadgeColor(row.original.badges);
      return (
        <div className="flex gap-3 w-60">
          <Badge className={`${colors.bg} border ${colors.border} px-3 py-2`}>
            <div className="flex gap-2 items-center">
              <img
                src={getBadgeIcon(row.original.badges)}
                alt={row.original.badges}
              />
              <span className={`${colors.text} font-bold`}>
                {row.original.badges}
              </span>
            </div>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "Actions",
    header: () => (
      <div>
        <h1>Actions</h1>
      </div>
    ),
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button className="rounded-full text-md px-8 py-5 cursor-pointer">
            Manage
          </Button>
        </div>
      );
    },
  },
];

const AchievementControl = () => {
  const { data: achievements, isLoading, isError } = UsegetallAchievements();
  const [columnsMenu, setColumnsMenu] = useState<{
    items: { id: string; label?: string; checked: boolean }[];
    toggle: (id: string, v: boolean) => void;
  } | null>(null);
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <span className="text-red-500">Error loading data.</span>
      </div>
    );
  }
  return (
    <div className="lg:mt-5">
      <TableHeader
        showSearch
        showFilter={false}
        showSort
        searchPlaceholder="Search Achievement"
        showAddButton={true}
        addButtonLabel="Add New Trip"
        url="/coordinator-dashboard/add-new-trip"
        showColumns
        columnsMenuItems={columnsMenu?.items ?? []}
        onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
      />
      <div className="bg-white rounded-[25px] mt-3 overflow-x-auto">
        <ReusableTable
          columns={userData}
          data={transformAchievementData(achievements || [])}
          onExposeColumns={(payload) => setColumnsMenu(payload)}
        />
      </div>
      <div>
        <Achievementlibrary achievements={achievements ?? []} />
      </div>
    </div>
  );
};

export default AchievementControl;
