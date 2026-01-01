import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import Mountain from "../../../assets/Mountain.png"
import Explorer from "../../../assets/Explorer.png"
import { Progress } from "@/components/ui/progress";
import Achievementlibrary from "./Achievementlibrary";
import { UsegetallAchievements } from "@/hooks/getallAchievementhook";
import { LoaderIcon } from "lucide-react";

type User = {
  Name: string;
  Trips: string;
  AdventurePoints: number;
  LevelProgress: string;
};

const data: User[] = [
  { Name: 'Alex Thompson', Trips: 'Wild Weekend Barcelona', AdventurePoints: 10, LevelProgress: 'Gold Explorer' },
  { Name: 'Alex Thompson', Trips: 'Wild Weekend Barcelona', AdventurePoints: 10, LevelProgress: 'Gold Explorer' },
  { Name: 'Alex Thompson', Trips: 'Wild Weekend Barcelona', AdventurePoints: 10, LevelProgress: 'Gold Explorer' },
  { Name: 'Alex Thompson', Trips: 'Wild Weekend Barcelona', AdventurePoints: 10, LevelProgress: 'Gold Explorer' },
  { Name: 'Alex Thompson', Trips: 'Wild Weekend Barcelona', AdventurePoints: 10, LevelProgress: 'Gold Explorer' },

]

const userData: ColumnDef<User>[] = [
  {
    accessorKey: 'Name',
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
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#3b3745] text-nowrap">
              {row.original.Name}
            </span>
            {/* <span className="text-xs text-[#8a8698]">alex@example.com</span> */}
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'Trips',
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
      )
    }
  },
  {
    accessorKey: 'AdventurePoints',
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
          <div className="font-semibold text-[#666373] text-[14px] text-center">{row.original.AdventurePoints}</div>
        </div>
      )
    }
  },
  {
    accessorKey: 'LevelProgress',
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
            <Progress value={80} className="[&>div]:bg-[#16A34A] lg:w-[100%] w-[150px]" />
          </span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'BadgesEarned',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="">
        <h1>Badges Earned</h1>
      </div>
    ),
    cell: () => {
      return (
        <div className="flex gap-3 w-60">
          <Badge className="bg-[#FAFAFE] border border-[#0DAC87] px-3 py-2">
            <div className="flex gap-2 items-center">
              <img src={Mountain} alt="Mountain" />
              <span className="text-[#0DAC87] font-bold">Mountain Climber</span>
            </div>
          </Badge>
          <Badge className="bg-[#FAFAFE] border border-[#DDAC24] px-3 py-2">
            <div className="flex gap-2 items-center">
              <img src={Explorer} alt="Explorer" />
              <span className="text-[#DDAC24] font-bold">Explorer</span>
            </div>
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'Actions',
    header: () => (
      <div>
        <h1>Actions</h1>
      </div>
    ),
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button
            className="rounded-full text-md px-8 py-5 cursor-pointer"
          >
            Manage
          </Button>
        </div>
      )
    }

  },
]

const AchievementControl = () => {
  const { isLoading, isError } = UsegetallAchievements();
  // console.log(Achievement);
  const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
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
          data={data}
          onExposeColumns={(payload) => setColumnsMenu(payload)}
        />
      </div>
      <div>
        <Achievementlibrary />
      </div>
    </div>
  )
}

export default AchievementControl