import { Search } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import list from "../../../../assets/list.png"
import grid from "../../../../assets/grid.png"
import { BsFillGrid3X3GapFill } from "react-icons/bs"
import { FaList } from "react-icons/fa"
import { UsegetTrips } from "@/hooks/gettriphook"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"



interface SearchbarProps {
    view: string;
    setView: React.Dispatch<React.SetStateAction<string>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({ view, setView, searchQuery, setSearchQuery, category, setCategory }: SearchbarProps) => {
    const { t } = useTranslation();
    const { data } = UsegetTrips();
    const rawCategories = data?.trips?.map((trip: any) => trip.category) ?? [];
    const categories = Array.from(new Set(rawCategories)).filter(Boolean);
    return (
        <div className="bg-[#FAFAFA] px-4 sm:px-16 py-6 mt-6">
            <div className="flex lg:flex-row flex-col items-center gap-4">
                <div className="relative">
                    <Search color="#666373" size={20} className="absolute left-4 top-1/2 -translate-y-1/2" />
                    <Input
                        placeholder={t('openOpportunities.searchPlace')}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="lg:w-220 border border-[#EFEFEF] bg-[#FFFFFF] rounded-[10px] py-5 pl-12 placeholder:text-[#666373]"
                    />
                </div>
                <Select value={category || "all"} onValueChange={(v) => setCategory(v === "all" ? "" : v)}>
                    <SelectTrigger className="lg:w-[150px] data-[placeholder]:text-[#666373] py-5 px-4 rounded-[10px] bg-[#EDEDED]">
                        <SelectValue placeholder={t('openOpportunities.allCategory')} className="placeholder:text-[#666373]" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{t('openOpportunities.selectCategory')}</SelectLabel>
                            <SelectItem value="all">{t('openOpportunities.allCategory')}</SelectItem>
                            {categories?.map((cat: any) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex items-center gap-6 bg-[#EDEDED] px-6 py-2 rounded-[10px] cursor-pointer ">
                    <div className={`${view === "list" ? "border border-[#000000] rounded-[4px] p-1 flex justify-center items-center" : ''}`}>
                        {
                            view === "list" ? <FaList /> : <img src={list} alt="list" className={"h-4 opacity-28"} onClick={() => setView("list")} />
                        }
                    </div>
                    <div className={`${view === "grid" ? "border border-[#000000] rounded-[4px] p-1 flex justify-center items-center" : ''}`}>
                        {
                            view === "grid" ? <BsFillGrid3X3GapFill /> : <img src={grid} alt="grid" className={"h-4"} onClick={() => setView("grid")} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Searchbar