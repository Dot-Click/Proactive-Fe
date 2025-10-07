import { Search } from "lucide-react"

const FilterSection = () => {
  return (
    <div className="bg-white px-4 py-6 rounded-lg shadow-sm mt-4 relative max-w-full">
        <Search size={20} color="#666373" className="absolute ml-3 text-gray-400 top-1/2 -translate-y-1/2"/>
        <input type="search" placeholder="Search Place" 
        className="placeholder:text-[#666373] pl-10 pr-3 px-3 py-3 w-[600px] border border-[#EFEFEF] bg-[#FAFAFE] outline-none rounded-[10px]"/>
    </div>
  )
}

export default FilterSection