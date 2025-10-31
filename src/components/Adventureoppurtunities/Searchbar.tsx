import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import list from "../../assets/list.png"
import grid from "../../assets/grid.png"
const Searchbar = () => {
    return (
        <div className="bg-[#FAFAFA] px-4 sm:px-16 py-6 mt-6">
            <div className="flex lg:flex-row flex-col items-center gap-4">
                <div className="relative">
                    <Search color="#666373" size={20} className="absolute left-4 top-1/2 -translate-y-1/2" />
                    <Input
                        placeholder="Search Place"
                        type="text"
                        className="lg:w-210 border border-[#EFEFEF] bg-[#FFFFFF] rounded-[10px] py-5 pl-12 placeholder:text-[#666373]"
                    />
                </div>
                <Select>
                    <SelectTrigger className="lg:w-[150px] data-[placeholder]:text-[#666373] py-5 px-4 rounded-[10px] bg-[#EDEDED]">
                        <SelectValue placeholder="All Category" className="placeholder:text-[#666373]"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select Category</SelectLabel>
                            <SelectItem value="Wild Weekend">Wild Weekend</SelectItem>
                            <SelectItem value="Wild Trip">Wild Trip</SelectItem>
                            <SelectItem value="Erasmus+">Erasmus+</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex items-center gap-6 bg-[#EDEDED] px-6 py-3 rounded-[10px] cursor-pointer">
                    <img src={list} alt="list" className="h-5"/>
                    <img src={grid} alt="grid" className="h-5"/>
                </div>
            </div>
        </div>
    )
}

export default Searchbar