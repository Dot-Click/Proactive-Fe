import { Button } from "@/components/ui/button"
import {  Plus, } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Header = () => {
const navigate = useNavigate()
    return (
        <div className="bg-white px-3 py-3 rounded-[20px] mt-5">
            <div className="flex lg:flex-row flex-col gap-3 justify-end items-center">
                {/* <div className="relative w-full">
                    <Search size={24} color="#666373" className="absolute ml-3 text-gray-400 top-1/2 -translate-y-1/2" />
                    <input type="search" placeholder='Search trips by name, coordinate, or location...'
                        className="placeholder:text-[#666373] lg:w-[600px] rounded-full w-full pl-10 pr-3 px-3 py-3 border border-[#EFEFEF] bg-[#FAFAFE] outline-none" />
                </div> */}
                <div className="flex lg:flex-row flex-col gap-4 w-full lg:w-auto">
                    {/* <Button className="bg-[#FAFAFA] w-full text-black font-medium border border-[#D4D4D4] hover:bg-[#ece7e7] cursor-pointer lg:w-30 py-6 rounded-full">
                        <Funnel fill="#000000" />
                        All Status
                    </Button> */}
                    <Button onClick={()=> navigate("/coordinator-dashboard/add-new-trip")} className="bg-[#000000] w-full text-white font-medium hover:bg-[#4b4949] cursor-pointer lg:w-44 py-6 rounded-full">
                        <Plus fill="#000000" />
                         Create New Trip
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header