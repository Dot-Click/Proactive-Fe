import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import SurfaceCamps from "../../../../assets/Surfacecamp.png"

const TeamSchedule = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center gap-12 w-full py-20">
                <div className="relative w-full flex justify-center items-center">
                    <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold lg:text-4xl text-center">
                        Teambuilding Schedule
                    </h1>
                    <div className="absolute lg:right-20 right-4 flex gap-4 text-2xl">
                        <div className="bg-[#666373] text-[#FEFCFA] lg:px-2 lg:py-2 px-1 py-1 rounded-full cursor-pointer">
                            <IoIosArrowBack className="h-4 lg:h-6"/>
                        </div>
                        <div className="bg-[#666373] text-[#FEFCFA] lg:px-2 lg:py-2 px-1 py-1 rounded-full cursor-pointer">
                            <IoIosArrowForward className="h-4 lg:h-6"/>
                        </div>
                    </div>
                </div>
                <h4 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold lg:text-lg text-center">
                    WW - Surface Camp Asturias
                </h4>
                <div className="flex justify-center items-center lg:py-6 px-2">
                    <img src={SurfaceCamps} alt="SurfaceCamps" className="lg:h-250" />
                </div>
            </div>
        </div>
    )
}

export default TeamSchedule