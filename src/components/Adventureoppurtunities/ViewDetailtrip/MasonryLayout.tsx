import { Button } from "@/components/ui/button";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import detailtrip1 from "../../../assets/detailtrip1.png"
// import detailtrip2 from "../../../assets/detailtrip2.png"
// import detailtrip3 from "../../../assets/detailtrip3.png"
// import detailtrip4 from "../../../assets/detailtrip4.png"
import zigzag from "../../../assets/zigzag.png"
import { FaLocationDot } from "react-icons/fa6";
import calender from "../../../assets/calender.png"
import star from "../../../assets/sidebaricon/star.png"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";

const MasonryLayout = ({ trip }: { trip: any }) => {
  const navigate = useNavigate();
  const data = trip?.trip[0]
  const galleryImg = data?.galleryImages
  return (
    <>
      <div className="px-4 sm:px-16 py-4">
        <Button onClick={() => navigate("/user-dashboard/adventure-oppurtunities")} className="bg-[#EDEDED] text-[#000000] rounded-[10px] cursor-pointer hover:bg-[#d8d2d2] font-semibold">
          <TbArrowBackUp className="font-bold" />
          Back
        </Button>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 py-6">
          {galleryImg?.length > 0 ? (
            galleryImg.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                className="w-full h-[250px] object-fill rounded-[20px]"
                alt={`gallery-${index}`}
              />
            ))
          ) : (
            <img
              src={detailtrip1}
              className="w-full h-[250px] object-cover rounded-[20px]"
              alt="fallback"
            />
          )}
        </div>
        <div className="flex lg:flex-row flex-col justify-between">
          <div className="flex flex-col">
            <h4 className="text-[#221E33] font-bold lg:text-4xl text-xl">{data?.title}</h4>
            <div className="flex flex-wrap items-center lg:gap-12 gap-6 py-4">
              <div className="flex items-center gap-2">
                <FaLocationDot color="#666373" />
                <span className="text-[#332A2A] font-medium">{data?.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={calender} alt="calender" className="h-4" />
                <span className="text-[#332A2A] text-[14px] text-nowrap font-medium">{new Date(data?.startDate).toDateString()}</span>
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
              <Button className="flex justify-center bg-[#0DAC87] hover:bg-[#119b7b] cursor-pointer rounded-full px-8 py-5">Join This Adventure</Button>
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
        <span className="text-[#332A2A] text-sm">
          {data?.longDesc || "No Description"}
        </span>
      </div>
    </>
  )
}

export default MasonryLayout