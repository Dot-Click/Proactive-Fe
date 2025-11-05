import { Button } from "@/components/ui/button";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import detailtrip1 from "../../../assets/detailtrip1.png"
import detailtrip2 from "../../../assets/detailtrip2.png"
import detailtrip3 from "../../../assets/detailtrip3.png"
import detailtrip4 from "../../../assets/detailtrip4.png"
import zigzag from "../../../assets/zigzag.png"
import { FaLocationDot } from "react-icons/fa6";
import calender from "../../../assets/calender.png"
import star from "../../../assets/sidebaricon/star.png"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";

const MasonryLayout = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="px-4 sm:px-16 py-4">
        <Button onClick={() => navigate("/user-dashboard/adventure-oppurtunities")} className="bg-[#EDEDED] text-[#000000] rounded-[10px] cursor-pointer hover:bg-[#d8d2d2] font-semibold">
          <TbArrowBackUp className="font-bold" />
          Back
        </Button>
        <div className="grid lg:grid-cols-4 gap-2 py-6">
          <img src={detailtrip1} className="col-span-2 w-full rounded-[20px] h-[510px] object-fill" />
          <img src={detailtrip2} className="rounded-[20px] h-[510px] w-full object-cover" />
          <div className="flex flex-col gap-2">
            <img src={detailtrip3} className="rounded-[20px] h-[250px] object-cover" />
            <img src={detailtrip4} className="rounded-[20px] h-[250px] object-cover" />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col justify-between items-center">
          <div className="flex flex-col">
            <h4 className="text-[#221E33] font-bold lg:text-4xl text-xl">Wild Weekend Barcelona</h4>
            <div className="flex flex-wrap items-center lg:gap-12 gap-6 py-4">
              <div className="flex items-center gap-2">
                <FaLocationDot color="#666373" />
                <span className="text-[#332A2A] font-medium">Barcelona, Spain</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={calender} alt="calender" className="h-4" />
                <span className="text-[#332A2A] text-[14px] text-nowrap font-medium">05-08 August</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                <span className="text-[#332A2A] text-[14px] text-nowrap font-medium">Plazas disponibles</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={star} alt="star" className="h-4" />
                <span className="text-[#332A2A] text-[14px] font-medium">4.5 (31 reviews)</span>
              </div>
            </div>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button className="bg-[#0DAC87] hover:bg-[#119b7b] cursor-pointer rounded-full px-8 py-5">Join This Adventure</Button>
            </DialogTrigger>
            <ApplicationForm />
          </Dialog>
        </div>
        <div>
        </div>
      </div>
      <img src={zigzag} alt="zigzag" />
      <div className="px-4 sm:px-16 py-6">
        <h4 className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">About Trip</h4>
        <span className="text-[#332A2A] text-sm">Embark on an extraordinary journey through the golden dunes of the Sahara Desert, where every step unveils a new adventure. Experience the timeless magic of camel trekking across endless sandy landscapes, and at night, rest beneath a breathtaking canopy of stars that feels close enough to touch. Along the way, immerse yourself in the warmth of Berber culture — share stories around the campfire, taste authentic traditional meals, and discover the hospitality of desert communities that have thrived here for centuries. This Wild Trip is more than just travel; it’s an opportunity to reconnect with nature, challenge yourself in a unique environment, and create bonds with fellow adventurers. From vibrant sunsets that paint the desert in shades of gold and crimson to mornings filled with the silence of infinite horizons, every moment promises to be unforgettable. A perfect balance of adventure, cultural discovery, and natural beauty awaits you on this once-in-a-lifetime journey.</span>
      </div>
    </>
  )
}

export default MasonryLayout