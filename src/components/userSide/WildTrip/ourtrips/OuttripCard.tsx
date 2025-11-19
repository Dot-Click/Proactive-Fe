import { Button } from "@/components/ui/button"
import adventureoppurunities1 from "../../../../assets/adventureoppurtunities1.png"
import adventureoppurunities2 from "../../../../assets/adventureoppurtunities2.png"
import adventureoppurunities3 from "../../../../assets/adventureoppurtunities3.png"
import clock from "../../../../assets/clock.png"
import Shadowblack from "../../../../assets/blackshadow.png"

const OuttripCard = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-5">
            <div className="relative h-[400px] rounded-[14px] overflow-hidden">
                <img
                    src={adventureoppurunities1}
                    alt="adventureoppurunities1"
                    className="h-full w-full "
                />
                <div className="absolute inset-0 z-0 top-auto">
                    <img src={Shadowblack} alt="Shadowblack" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end items-end py-6 px-4 z-10">
                    <div className="w-full space-y-3 mb-2">
                        <h4 className="text-[#FFFFFF] font-bold text-2xl">Trip to Egypt</h4>
                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <img src={clock} alt="clock" className="w-5" />
                                    <p className="text-[#FFFFFF] text-[12px]">9 days · 8 nights</p>
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
                <div className="absolute inset-0 z-0 top-auto">
                    <img src={Shadowblack} alt="Shadowblack" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end items-end py-6 px-4 z-10">
                    <div className="w-full space-y-3 mb-2">
                        <h4 className="text-[#FFFFFF] font-bold text-2xl">Trip to Madeira</h4>
                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <img src={clock} alt="clock" className="w-5" />
                                    <p className="text-[#FFFFFF] text-[12px]">9 days · 8 nights</p>
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
                <div className="absolute inset-0 z-0 top-auto">
                    <img src={Shadowblack} alt="Shadowblack" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end items-end py-6 px-4 z-10">
                    <div className="w-full space-y-3 mb-2">
                        <h4 className="text-[#FFFFFF] font-bold text-2xl">Van Hopping in Iceland</h4>
                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <img src={clock} alt="clock" className="w-5" />
                                    <p className="text-[#FFFFFF] text-[12px]">Soon</p>
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

export default OuttripCard