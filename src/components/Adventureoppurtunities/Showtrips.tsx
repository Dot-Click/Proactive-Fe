import { FaLocationDot } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import trip1 from "../../assets/trip1.png"
import trip2 from "../../assets/trip2.png"
import trip3 from "../../assets/trip3.png"
import calender from "../../assets/calender.png"
import star from "../../assets/sidebaricon/star.png"



interface SearchbarProps {
    view: string;
}

const Showtrips = ({ view }: SearchbarProps) => {
    return (
        <>
            <div className="px-4 sm:px-16 py-6 bg-[#FAFAFA]">
                {
                    view === "list" ? (
                        <>
                            <div>
                                <span
                                    className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">
                                    Showing 3 trips
                                </span>

                                <div className="border-b border-[#D9D9D9] mt-[16px]" />

                                <div className="flex flex-col gap-4 mt-5 overflow-x-auto h-150">
                                    <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md">
                                        <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
                                            <img src={trip1} alt="trip1" className="h-30 w-40" />
                                            <div className="flex lg:flex-row flex-col justify-between items-center w-full gap-6">
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex flex-col gap-1 w-full items-center lg:items-start">
                                                        <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                        <div className="flex items-center gap-2">
                                                            <FaLocationDot color="#666373" />
                                                            <span className="text-[#666373]">Barcelona, Spain</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row items-start mt-9 gap-4">
                                                    <div className="flex lg:flex-row flex-col gap-8">
                                                        <div className="flex lg:flex-row flex-col gap-8">
                                                            <div className="flex items-center gap-2">
                                                                <img src={calender} alt="calender" className="h-4" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">Plazas disponibles</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <img src={star} alt="star" className="h-4" />
                                                                <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                            </div>
                                                        </div>
                                                        <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 mb-3 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                        <div className="flex flex-col gap-1 ">
                                                            <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                                View Detail
                                                                <MdArrowOutward color="#FFFFFF" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md">
                                        <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
                                            <img src={trip2} alt="trip2" className="h-30 w-40" />
                                            <div className="flex lg:flex-row flex-col justify-between items-center w-full gap-6">
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex flex-col gap-1 w-full items-center lg:items-start">
                                                        <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                        <div className="flex items-center gap-2">
                                                            <FaLocationDot color="#666373" />
                                                            <span className="text-[#666373]">Barcelona, Spain</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row items-start mt-9 gap-4">
                                                    <div className="flex lg:flex-row flex-col gap-8">
                                                        <div className="flex lg:flex-row flex-col gap-8">
                                                            <div className="flex items-center gap-2">
                                                                <img src={calender} alt="calender" className="h-4" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-[#C9B800] rounded-full" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">Últimas plazas</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <img src={star} alt="star" className="h-4" />
                                                                <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                            </div>
                                                        </div>
                                                        <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 mb-3 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                        <div className="flex flex-col gap-1 ">
                                                            <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                                View Detail
                                                                <MdArrowOutward color="#FFFFFF" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md">
                                        <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
                                            <img src={trip3} alt="trip3" className="h-30 w-40" />
                                            <div className="flex lg:flex-row flex-col justify-between items-center w-full gap-6">
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex flex-col gap-1 w-full items-center lg:items-start">
                                                        <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                        <div className="flex items-center gap-2">
                                                            <FaLocationDot color="#666373" />
                                                            <span className="text-[#666373]">Barcelona, Spain</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row items-start mt-9 gap-4">
                                                    <div className="flex lg:flex-row flex-col gap-8">
                                                        <div className="flex lg:flex-row flex-col gap-8">
                                                            <div className="flex items-center gap-2">
                                                                <img src={calender} alt="calender" className="h-4" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-[#C9B800] rounded-full" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">Últimas plazas</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <img src={star} alt="star" className="h-4" />
                                                                <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                            </div>
                                                        </div>
                                                        <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 mb-3 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                        <div className="flex flex-col gap-1 ">
                                                            <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                                View Detail
                                                                <MdArrowOutward color="#FFFFFF" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md">
                                        <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
                                            <img src={trip1} alt="trip1" className="h-30 w-40" />
                                            <div className="flex lg:flex-row flex-col justify-between items-center w-full gap-6">
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex flex-col gap-1 w-full items-center lg:items-start">
                                                        <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                        <div className="flex items-center gap-2">
                                                            <FaLocationDot color="#666373" />
                                                            <span className="text-[#666373]">Barcelona, Spain</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row items-start mt-9 gap-4">
                                                    <div className="flex lg:flex-row flex-col gap-8">
                                                        <div className="flex lg:flex-row flex-col gap-8">
                                                            <div className="flex items-center gap-2">
                                                                <img src={calender} alt="calender" className="h-4" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-[#C90000] rounded-full" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">1 restante</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <img src={star} alt="star" className="h-4" />
                                                                <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                            </div>
                                                        </div>
                                                        <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 mb-3 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                        <div className="flex flex-col gap-1 ">
                                                            <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                                View Detail
                                                                <MdArrowOutward color="#FFFFFF" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md">
                                        <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
                                            <img src={trip1} alt="trip1" className="h-30 w-40" />
                                            <div className="flex lg:flex-row flex-col justify-between items-center w-full gap-6">
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex flex-col gap-1 w-full items-center lg:items-start">
                                                        <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                        <div className="flex items-center gap-2">
                                                            <FaLocationDot color="#666373" />
                                                            <span className="text-[#666373]">Barcelona, Spain</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row items-start mt-9 gap-4">
                                                    <div className="flex lg:flex-row flex-col gap-8">
                                                        <div className="flex lg:flex-row flex-col gap-8">
                                                            <div className="flex items-center gap-2">
                                                                <img src={calender} alt="calender" className="h-4" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-[#C90000] rounded-full" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">1 restante</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <img src={star} alt="star" className="h-4" />
                                                                <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                            </div>
                                                        </div>
                                                        <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 mb-3 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                        <div className="flex flex-col gap-1">
                                                            <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
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

                            </div>
                        </>
                    ) : (
                        <div>
                            <span
                                className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">
                                Showing 3 trips
                            </span>

                            <div className="border-b border-[#D9D9D9] mt-[16px]" />

                            <div className="grid lg:grid-cols-3 gap-4 mt-5 overflow-x-auto h-150">
                                <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md h-120">
                                    <div className="flex flex-col justify-between items-start gap-4">
                                        <img src={trip1} alt="trip1" className="h-30 w-40" />
                                        <div className="flex flex-col justify-between w-full gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1 w-full items-start">
                                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                    <div className="flex items-center gap-2">
                                                        <FaLocationDot color="#666373" />
                                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-4">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <img src={calender} alt="calender" className="h-4" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">Plazas disponibles</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <img src={star} alt="star" className="h-4" />
                                                            <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                    <div className="flex flex-col gap-1 w-full">
                                                        <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                            View Detail
                                                            <MdArrowOutward color="#FFFFFF" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md h-120">
                                    <div className="flex flex-col justify-between items-start gap-4">
                                        <img src={trip1} alt="trip1" className="h-30 w-40" />
                                        <div className="flex flex-col justify-between w-full gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1 w-full items-start">
                                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                    <div className="flex items-center gap-2">
                                                        <FaLocationDot color="#666373" />
                                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-4">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <img src={calender} alt="calender" className="h-4" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">Plazas disponibles</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <img src={star} alt="star" className="h-4" />
                                                            <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                    <div className="flex flex-col gap-1 w-full">
                                                        <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                            View Detail
                                                            <MdArrowOutward color="#FFFFFF" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md h-120">
                                    <div className="flex flex-col justify-between items-start gap-4">
                                        <img src={trip1} alt="trip1" className="h-30 w-40" />
                                        <div className="flex flex-col justify-between w-full gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1 w-full items-start">
                                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                    <div className="flex items-center gap-2">
                                                        <FaLocationDot color="#666373" />
                                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-4">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <img src={calender} alt="calender" className="h-4" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">Plazas disponibles</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <img src={star} alt="star" className="h-4" />
                                                            <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                    <div className="flex flex-col gap-1 w-full">
                                                        <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                            View Detail
                                                            <MdArrowOutward color="#FFFFFF" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md h-120">
                                    <div className="flex flex-col justify-between items-start gap-4">
                                        <img src={trip1} alt="trip1" className="h-30 w-40" />
                                        <div className="flex flex-col justify-between w-full gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1 w-full items-start">
                                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                    <div className="flex items-center gap-2">
                                                        <FaLocationDot color="#666373" />
                                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-4">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <img src={calender} alt="calender" className="h-4" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">Plazas disponibles</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <img src={star} alt="star" className="h-4" />
                                                            <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                    <div className="flex flex-col gap-1 w-full">
                                                        <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                            View Detail
                                                            <MdArrowOutward color="#FFFFFF" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md h-120">
                                    <div className="flex flex-col justify-between items-start gap-4">
                                        <img src={trip1} alt="trip1" className="h-30 w-40" />
                                        <div className="flex flex-col justify-between w-full gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1 w-full items-start">
                                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                    <div className="flex items-center gap-2">
                                                        <FaLocationDot color="#666373" />
                                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-4">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <img src={calender} alt="calender" className="h-4" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">Plazas disponibles</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <img src={star} alt="star" className="h-4" />
                                                            <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                    <div className="flex flex-col gap-1 w-full">
                                                        <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                            View Detail
                                                            <MdArrowOutward color="#FFFFFF" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md h-120">
                                    <div className="flex flex-col justify-between items-start gap-4">
                                        <img src={trip1} alt="trip1" className="h-30 w-40" />
                                        <div className="flex flex-col justify-between w-full gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1 w-full items-start">
                                                    <span className="text-[#1F1B2C] font-bold text-xl">Wild Weekend Barcelona</span>
                                                    <div className="flex items-center gap-2">
                                                        <FaLocationDot color="#666373" />
                                                        <span className="text-[#666373]">Barcelona, Spain</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-4">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <img src={calender} alt="calender" className="h-4" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">05-08 August</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                                                            <span className="text-[#666373] text-[14px] text-nowrap">Plazas disponibles</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <img src={star} alt="star" className="h-4" />
                                                            <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 rounded-[7px] text-[#156250] text-[14px]">Wild Weekend</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                    <div className="flex flex-col gap-1 w-full">
                                                        <div className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
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

                        </div>
                    )
                }
            </div>
            < div className="border-b border-[#D9D9D9]" />
        </>
    )
}

export default Showtrips

// < div className = "bg-[#009C23] w-2 h-2 rounded-full" />
