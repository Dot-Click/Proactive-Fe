import {  Funnel, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableToolbarProps {
  showSearch?: boolean;
  showFilter?: boolean;
  showSort?: boolean;
  showColumns?: boolean;
  showAddButton?: boolean;
  addButtonLabel?: string;
  addButtonIcon?: React.ReactNode;
  searchPlaceholder?: string;
  limitOptions?: number[];
  defaultLimit?: number;
  onSearch?: (value: string) => void;
  onSortClick?: () => void;
  onFilterClick?: () => void;
  onLimitChange?: (value: number) => void;
  onAddClick?: () => void;
  url?: string;
  // Optional: dynamic columns menu (for TanStack visibility toggles)
  columnsMenuItems?: Array<{
    id: string;
    label?: string;
    checked: boolean;
    disabled?: boolean;
  }>;
  onColumnMenuToggle?: (id: string, value: boolean) => void;
}

const TableHeader: React.FC<TableToolbarProps> = ({
  showSearch = true,
  showFilter = true,
  // showSort = true,
  showColumns = false,
  showAddButton = false,
  addButtonLabel = "Add New",
  addButtonIcon,
  searchPlaceholder = "Search...",
  url,
  columnsMenuItems,
  onColumnMenuToggle,
  onSearch,
  // limitOptions = [5, 10, 20, 30, 50],
  // defaultLimit = 5,
  // onSortClick,
  // onFilterClick,
  // onLimitChange,
  // onAddClick,
}) => {
  return (
    <div className="bg-white px-4 py-8 rounded-lg shadow-sm mt-3">
      {showSearch && (
        <div className="flex lg:flex-row flex-col justify-between gap-4">
          <div className="relative">
            <Search
              size={24}
              color="#666373"
              className="absolute ml-3 text-gray-400 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => {
                e.preventDefault();
                onSearch?.(e.target.value);
              }}
              className="placeholder:text-[#666373] lg:w-[600px] w-full pl-10 pr-3 px-3 py-3 border border-[#EFEFEF] bg-[#FAFAFE] outline-none rounded-[10px]"
            />
          </div>
          {showAddButton &&
            (url ? (
              <Link to={url}>
                <Button className="cursor-pointer font-medium py-6 px-22 rounded-full lg:w-30 w-full">
                  {addButtonLabel}
                  {addButtonIcon}
                </Button>
              </Link>
            ) : (
              <Button
                // onClick={onAddClick}
                className="flex gap-2 cursor-pointer font-medium py-6 md:w-30 w-full rounded-full"
              >
                {addButtonIcon}
                {addButtonLabel}
              </Button>
            ))}
        </div>
      )}
      <div className="flex md:flex-row flex-col justify-between items-center mt-8 gap-4">
        <div className="flex items-center gap-4">
          <span className="text-[#666373] text-[18px]">Showing</span>
          <Select>
            <SelectTrigger
              size="sm"
              className="w-[66px] px-2 py-1 bg-[#E8E8E8] font-medium text-[17px] rounded-[8px] h-auto"
            >
              <SelectValue placeholder="05" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full md:w-auto">
          {/* {showSort && (
            <Button className="bg-[#FAFAFA] text-black border border-[#EFEFEF] hover:bg-[#FAFAFA] cursor-pointer font-medium md:w-30 w-auto py-5 rounded-[15px]">
              <ArrowDownUp />
              Sort by
            </Button>
          )} */}
          {showFilter && (
            <Button className="bg-[#FAFAFA] text-black border border-[#EFEFEF] hover:bg-[#FAFAFA] cursor-pointer font-medium md:w-30 w-auto py-5 rounded-[15px]">
              <Funnel fill="#000000" />
              Filter
            </Button>
          )}
          {showColumns && columnsMenuItems && columnsMenuItems.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#FAFAFA] text-black border border-[#EFEFEF] hover:bg-[#FAFAFA] cursor-pointer font-medium  md:w-30 w-auto  py-5 rounded-[15px]"
                >
                  <Funnel fill="#000000" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columnsMenuItems.map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    className="capitalize"
                    checked={col.checked}
                    disabled={col.disabled}
                    onCheckedChange={(v) => onColumnMenuToggle?.(col.id, !!v)}
                  >
                    {col.label || col.id}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};
export default TableHeader;
