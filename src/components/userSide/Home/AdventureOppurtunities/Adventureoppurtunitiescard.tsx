import { Button } from "@/components/ui/button"
import adventureoppurunities1 from "../../../../assets/adventureoppurtunities1.png"
import adventureoppurunities2 from "../../../../assets/adventureoppurtunities2.png"
import adventureoppurunities3 from "../../../../assets/adventureoppurtunities3.png"
import calender from "../../../../assets/calenderwhite.png"
import location from "../../../../assets/locationwhite.png"
const Adventureoppurtunitiescard = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-5">
            <div className="relative h-[400px] rounded-[14px] overflow-hidden">
                <img
                    src={adventureoppurunities1}
                    alt="adventureoppurunities1"
                    className="h-full w-full "
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#000000]/2 to-[#000000]/60 mix-blend-multiply z-0"></div>

                <div className="absolute inset-0 flex flex-col justify-between items-start py-6 px-4 z-10">
                    <Button className="bg-[#FBF2DB] hover:bg-[#f0e5ca] cursor-pointer text-[#845111] font-semibold rounded-[10px]">
                        Mountain Adventure
                    </Button>

                    <div className="w-full space-y-3 mb-2">
                        <h4 className="text-[#FFFFFF] font-bold text-2xl">Canyoning Adventure</h4>

                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <img src={calender} alt="calender" className="w-5" />
                                    <p className="text-[#FFFFFF] text-[12px]">05-08 August</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src={location} alt="location" className="w-4" />
                                    <p className="text-[#FFFFFF] text-[12px]">Swiss Alps</p>
                                </div>
                            </div>

                            <Button className="bg-[#0DAC87] hover:bg-[#0ca07d] cursor-pointer text-[#FFFFFF] font-semibold rounded-full px-8 py-5">
                                More Info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-[400px] rounded-[14px] overflow-hidden">
                <img
                    src={adventureoppurunities2}
                    alt="adventureoppurunities2"
                    className="h-full w-full "
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply z-0"></div>

                <div className="absolute inset-0 flex flex-col justify-between items-start py-6 px-4 z-10">
                    <Button className="bg-[#C4FFF0] hover:bg-[#adebdb] cursor-pointer text-[#156250] font-semibold rounded-[10px]">
                        Wild Weekend
                    </Button>

                    <div className="w-full space-y-3 mb-2">
                        <h4 className="text-[#FFFFFF] font-bold text-2xl">Via Ferrata Challenge</h4>

                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <img src={calender} alt="calender" className="w-5" />
                                    <p className="text-[#FFFFFF] text-[12px]">05-08 August</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src={location} alt="location" className="w-4" />
                                    <p className="text-[#FFFFFF] text-[12px]">Swiss Alps</p>
                                </div>
                            </div>

                            <Button className="bg-[#0DAC87] hover:bg-[#0ca07d] cursor-pointer text-[#FFFFFF] font-semibold rounded-full px-8 py-5">
                                More Info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-[400px] rounded-[14px] overflow-hidden">
                <img
                    src={adventureoppurunities3}
                    alt="adventureoppurunities3"
                    className="h-full w-full "
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply z-0"></div>

                <div className="absolute inset-0 flex flex-col justify-between items-start py-6 px-4 z-10">
                    <Button className="bg-[#DFF2FF] hover:bg-[#cfe6f5] cursor-pointer text-[#3B607A] font-semibold rounded-[10px]">
                        Camping Adventure
                    </Button>

                    <div className="w-full space-y-3 mb-2">
                        <h4 className="text-[#FFFFFF] font-bold text-2xl">Wilderness Camping</h4>

                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <img src={calender} alt="calender" className="w-5" />
                                    <p className="text-[#FFFFFF] text-[12px]">05-08 August</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src={location} alt="location" className="w-4" />
                                    <p className="text-[#FFFFFF] text-[12px]">Swiss Alps</p>
                                </div>
                            </div>

                            <Button className="bg-[#0DAC87] hover:bg-[#0ca07d] cursor-pointer text-[#FFFFFF] font-semibold rounded-full px-8 py-5">
                                More Info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adventureoppurtunitiescard