import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import trip1 from "../../../assets/trip1.png"
import trip2 from "../../../assets/trip2.png"
import trip3 from "../../../assets/trip3.png"
import calender from "../../../assets/calender.png"
import time from "../../../assets/time.png"
import { FaLocationDot } from "react-icons/fa6"
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom"
const UpcomingAdventures = () => {
const navigate = useNavigate()
    return (
        <div className="border border-[#D9D9D9] bg-[#FAFAFA] rounded-[20px] flex flex-col">
            <div className="px-4 py-6 flex flex-col lg:flex-row gap-3 justify-between items-center">
                <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">Upcoming Adventures</span>
                <Button onClick={()=> navigate("/user-dashboard/adventure-oppurtunities")} className="bg-[#0DAC87] rounded-full py-6 px-6 hover:bg-[#0d9b7a] cursor-pointer">View All</Button>
            </div>
            <Separator className="border-[#D9D9D9] bg-[#D9D9D9] -mt-[8px]" />
            <div className="flex flex-col gap-3 px-4 py-6 overflow-y-scroll h-152">
                <div className="bg-[#FFFFFF] px-4 py-6 rounded-[20px] shadow-md">
                    <div className="flex lg:flex-row flex-col gap-4">
                        <img src={trip1} alt="trip1" className="h-50" />
                        <div className="flex flex-col w-full gap-6">
                            <div className="flex flex-col lg:flex-row w-full justify-between mt-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                    <div className="flex items-center gap-2">
                                        <FaLocationDot color="#666373" />
                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <div className="cursor-pointer bg-[#C4FFF0] px-4 py-2 rounded-[7px] text-[#156250] font-semibold">Wild Weekend</div>
                                    <div className="cursor-pointer border border-[#009C23] px-4 py-2 rounded-[7px] text-[#009C23] font-semibold flex items-center gap-3">
                                        <div className="bg-[#009C23] w-2 h-2 rounded-full" />
                                        Confirmed
                                    </div>
                                </div>
                            </div>
                            <Separator className="border-[#D9D9D9] bg-[#D9D9D9] -mt-[4px] lg:flex hidden" />
                            <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <img src={calender} alt="calender" className="h-4" />
                                        <span className="text-[#666373] text-[14px]">05-08 August</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img src={time} alt="time" className="h-4" />
                                        <span className="text-[#666373] text-[14px]">In 12 days</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <div className="flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-4 py-4 text-[#FFFFFF] font-semibold">
                                        View Detail
                                        <MdArrowOutward color="#FFFFFF" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FFFFFF] px-4 py-6 rounded-[20px] shadow-md">
                    <div className="flex lg:flex-row flex-col gap-4">
                        <img src={trip2} alt="trip2" className="h-50" />
                        <div className="flex flex-col w-full gap-6">
                            <div className="flex flex-col lg:flex-row w-full justify-between mt-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                    <div className="flex items-center gap-2">
                                        <FaLocationDot color="#666373" />
                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <div className="cursor-pointer bg-[#C4FFF0] px-4 py-2 rounded-[7px] text-[#156250] font-semibold">Wild Weekend</div>
                                    <div className="cursor-pointer border border-[#009C23] px-4 py-2 rounded-[7px] text-[#009C23] font-semibold flex items-center gap-3">
                                        <div className="bg-[#009C23] w-2 h-2 rounded-full" />
                                        Confirmed
                                    </div>
                                </div>
                            </div>
                            <Separator className="border-[#D9D9D9] bg-[#D9D9D9] -mt-[4px] lg:flex hidden" />
                            <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <img src={calender} alt="calender" className="h-4" />
                                        <span className="text-[#666373] text-[14px]">05-08 August</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img src={time} alt="time" className="h-4" />
                                        <span className="text-[#666373] text-[14px]">In 12 days</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <div className="flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-4 py-4 text-[#FFFFFF] font-semibold">
                                        View Detail
                                        <MdArrowOutward color="#FFFFFF" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FFFFFF] px-4 py-6 rounded-[20px] shadow-md">
                    <div className="flex lg:flex-row flex-col gap-4">
                        <img src={trip3} alt="trip3" className="h-50" />
                        <div className="flex flex-col w-full gap-6">
                            <div className="flex flex-col lg:flex-row w-full justify-between mt-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                    <div className="flex items-center gap-2">
                                        <FaLocationDot color="#666373" />
                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <div className="cursor-pointer bg-[#C4FFF0] px-4 py-2 rounded-[7px] text-[#156250] font-semibold">Wild Weekend</div>
                                    <div className="cursor-pointer border border-[#009C23] px-4 py-2 rounded-[7px] text-[#009C23] font-semibold flex items-center gap-3">
                                        <div className="bg-[#009C23] w-2 h-2 rounded-full" />
                                        Confirmed
                                    </div>
                                </div>
                            </div>
                            <Separator className="border-[#D9D9D9] bg-[#D9D9D9] -mt-[4px] lg:flex hidden" />
                            <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <img src={calender} alt="calender" className="h-4" />
                                        <span className="text-[#666373] text-[14px]">05-08 August</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img src={time} alt="time" className="h-4" />
                                        <span className="text-[#666373] text-[14px]">In 12 days</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <div className="flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-4 py-4 text-[#FFFFFF] font-semibold">
                                        View Detail
                                        <MdArrowOutward color="#FFFFFF" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FFFFFF] px-4 py-6 rounded-[20px] shadow-md">
                    <div className="flex lg:flex-row flex-col gap-4">
                        <img src={trip1} alt="trip1" className="h-50" />
                        <div className="flex flex-col w-full gap-6">
                            <div className="flex flex-col lg:flex-row w-full justify-between mt-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                    <div className="flex items-center gap-2">
                                        <FaLocationDot color="#666373" />
                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <div className="cursor-pointer bg-[#C4FFF0] px-4 py-2 rounded-[7px] text-[#156250] font-semibold">Wild Weekend</div>
                                    <div className="cursor-pointer border border-[#009C23] px-4 py-2 rounded-[7px] text-[#009C23] font-semibold flex items-center gap-3">
                                        <div className="bg-[#009C23] w-2 h-2 rounded-full" />
                                        Confirmed
                                    </div>
                                </div>
                            </div>
                            <Separator className="border-[#D9D9D9] bg-[#D9D9D9] -mt-[4px] lg:flex hidden" />
                            <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <img src={calender} alt="calender" className="h-4" />
                                        <span className="text-[#666373] text-[14px]">05-08 August</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img src={time} alt="time" className="h-4" />
                                        <span className="text-[#666373] text-[14px]">In 12 days</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <div className="flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-4 py-4 text-[#FFFFFF] font-semibold">
                                        View Detail
                                        <MdArrowOutward color="#FFFFFF" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UpcomingAdventures