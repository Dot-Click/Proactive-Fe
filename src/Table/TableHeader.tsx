import { ArrowDownUp, Funnel, Search } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

interface TableToolbarProps {
    showSearch?: boolean;
    showFilter?: boolean;
    showSort?: boolean;
    showAddButton?: boolean;
    addButtonLabel?: string;
    addButtonIcon?: React.ReactNode,
    searchPlaceholder?: string;
    limitOptions?: number[];
    defaultLimit?: number;
    onSearch?: (value: string) => void;
    onSortClick?: () => void;
    onFilterClick?: () => void;
    onLimitChange?: (value: number) => void;
    onAddClick?: () => void;
    url?: string
}

const TableHeader: React.FC<TableToolbarProps> = ({
    showSearch = true,
    showFilter = true,
    showSort = true,
    showAddButton = false,
    addButtonLabel = "Add New",
    addButtonIcon,
    searchPlaceholder = "Search...",
    url,
    // limitOptions = [5, 10, 20, 30, 50],
    // defaultLimit = 5,
    // onSearch,
    // onSortClick,
    // onFilterClick,
    // onLimitChange,
    // onAddClick,
}) => {
    return (
        <div className="bg-white px-4 py-8 rounded-lg shadow-sm mt-3">
            {
                showSearch &&
                <div className="flex lg:flex-row flex-col justify-between gap-4">
                    <div className="relative">
                        <Search size={24} color="#666373" className="absolute ml-3 text-gray-400 top-1/2 -translate-y-1/2" />
                        <input type="search" placeholder={searchPlaceholder}
                            className="placeholder:text-[#666373] lg:w-[600px] w-full pl-10 pr-3 px-3 py-3 border border-[#EFEFEF] bg-[#FAFAFE] outline-none rounded-[10px]" />
                    </div>
                    {
                        showAddButton && (
                            url ? (
                                <Link to={url}>
                                    <Button className="cursor-pointer font-medium py-6 px-10 rounded-full">
                                        {addButtonLabel}
                                        {addButtonIcon}
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    // onClick={onAddClick}
                                    className="flex gap-2 cursor-pointer font-medium py-6 w-32 rounded-full"
                                >
                                    {addButtonIcon}
                                    {addButtonLabel}
                                </Button>
                            )
                        )
                    }
                </div>
            }
            <div className="flex md:flex-row flex-col justify-between items-center mt-8 gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-[#666373] text-[18px]">Showing</span>
                    <Select>
                        <SelectTrigger size="sm" className="w-[68px] px-2.5 bg-[#E8E8E8] font-medium text-[19px] rounded-[8px]">
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
                <div className="flex md:flex-row flex-col gap-4">
                    {
                        showSort &&
                        <Button className="bg-[#FAFAFA] text-black border border-[#EFEFEF] hover:bg-[#FAFAFA] cursor-pointer font-medium w-30 py-5 rounded-[15px]">
                            <ArrowDownUp />
                            Sort by
                        </Button>
                    }
                    {
                        showFilter &&
                        <Button className="bg-[#FAFAFA] text-black border border-[#EFEFEF] hover:bg-[#FAFAFA] cursor-pointer font-medium w-30 py-5 rounded-[15px]">
                            <Funnel fill="#000000" />
                            Filter
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TableHeader