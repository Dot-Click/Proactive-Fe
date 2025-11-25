import { Button } from "@/components/ui/button"
import Travellingbg from "../../../assets/Travellingbg.png"
import TravellingIcon from "../../../assets/Travellingicon.png"
const TravellingWithUs = () => {
    return (
        <div className="relative">
            <img src={Travellingbg} alt="Travellingbg" className="h-130 lg:h-140 object-cover"/>
            <div className="flex flex-col justify-center items-center gap-8 absolute inset-0">
                <img src={TravellingIcon} alt="TravellingIcon" className="h-12" />
                <h1 className="bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE]/96  text-transparent bg-clip-text font-bold md:text-4xl">Already Traveling With Us?</h1>
                <p className="text-center text-[#FFFFFF] text-[14px]">If you're joining a Wild Trip (WT) or Wild Weekend (WW), your membership is included <br className="md:flex hidden "/> automatically in your trip price.</p>
                <p className="text-[#FFFFFF] text-[12px]">No extra steps needed - just focus on preparing for your adventure!</p>
                <div className="flex lg:flex-row flex-col gap-4">
                    <Button className="text-[#008236] rounded-[3px] bg-[#A5E8BE] hover:bg-[#98dfb2] cursor-pointer">
                        ✔
                        <p>WT Membership Included</p>
                    </Button>
                    <Button className="text-[#1A51E6] rounded-[3px] bg-[#ADCDF8] hover:bg-[#a1c2ee] cursor-pointer">
                        ✔
                        <p>WW Membership Included</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TravellingWithUs