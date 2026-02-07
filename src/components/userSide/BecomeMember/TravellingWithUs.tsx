import { Button } from "@/components/ui/button";
import Travellingbg from "../../../assets/Travellingbg.png";
import TravellingIcon from "../../../assets/Travellingicon.png";

const TravellingWithUs = () => {
  return (
    <div className="relative w-full">
      {/* Background Image Container */}
      <div className="w-full h-auto overflow-hidden">
        <img
          src={Travellingbg}
          alt="Travellingbg"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-8 ">
        <img src={TravellingIcon} alt="TravellingIcon" className="h-12" />
        <h1 className="bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE]/96 text-transparent bg-clip-text font-bold md:text-4xl text-center">
          Already Traveling With Us?
        </h1>
        <p className="text-center text-[#FFFFFF] text-[14px]">
          If you're joining a Wild Trip (WT) or Wild Weekend (WW), your
          membership is included
          <br className="md:flex hidden" /> automatically in your trip price.
        </p>
        <p className="text-[#FFFFFF] text-[12px]">
          No extra steps needed - just focus on preparing for your adventure!
        </p>
        <div className="flex lg:flex-row flex-col gap-4">
          <Button className="flex items-center gap-2 text-[#008236] rounded-[3px] bg-[#A5E8BE] hover:bg-[#98dfb2] cursor-pointer">
            ✔ <span>WT Membership Included</span>
          </Button>
          <Button className="flex items-center gap-2 text-[#1A51E6] rounded-[3px] bg-[#ADCDF8] hover:bg-[#a1c2ee] cursor-pointer">
            ✔ <span>WW Membership Included</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TravellingWithUs;
