// import { Button } from "@/components/ui/button";
// import { TbArrowBackUp } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";
// import detailtrip1 from "../../../assets/detailtrip1.png"
// import zigzag from "../../../assets/zigzag.png"
// import { FaLocationDot } from "react-icons/fa6";
// import { Calendar, Star } from "lucide-react";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import ApplicationForm from "./ApplicationForm";
// import { formatDateRange } from "@/utils/dateFormatter";
// import { useState } from "react";

// type MasonryLayoutProps = {
//   trip: any;
//   backUrl?: string;
//   backLabel?: string;
//   showApplyButton?: boolean;
//   headerAction?: React.ReactNode;
// };

// const MasonryLayout = ({ trip, backUrl = "/user-dashboard/adventure-oppurtunities", backLabel = "Back", showApplyButton = true, headerAction }: MasonryLayoutProps) => {
//   const navigate = useNavigate();
//   // Extract trip data - handle both direct trip object and nested structure
//   const data = trip?.trip?.[0] || trip?.trip || trip;
//   const galleryImg = data?.galleryImages;
//   const getImageUrl = (item: any) =>
//     typeof item === "string" ? item : item?.url ?? "";
//   return (
//     <>
//       <div className="px-4 sm:px-16 py-4">
//         <div className="flex flex-wrap items-center justify-between gap-2">
//           <Button onClick={() => navigate(backUrl)} className="bg-[#EDEDED] text-[#000000] rounded-[10px] cursor-pointer hover:bg-[#d8d2d2] font-semibold">
//             <TbArrowBackUp className="font-bold" />
//             {backLabel}
//           </Button>
//           {headerAction != null ? headerAction : null}
//         </div>
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 py-6">
//           {galleryImg?.length > 0 ? (
//             galleryImg.map((img: any, index: number) => (
//               <img
//                 key={index}
//                 src={getImageUrl(img)}
//                 className="w-full h-[250px] object-fill rounded-[20px]"
//                 alt={`gallery-${index}`}
//               />
//             ))
//           ) : (
//             <img
//               src={detailtrip1}
//               className="w-full h-[250px] object-cover rounded-[20px]"
//               alt="fallback"
//             />
//           )}
//         </div>
//         <div className="flex lg:flex-row flex-col justify-between">
//           <div className="flex flex-col">
//             <h4 className="text-[#221E33] font-bold lg:text-4xl text-xl">{data?.title}</h4>
//             <div className="flex flex-wrap items-center lg:gap-12 gap-6 py-4">
//               <div className="flex items-center gap-2">
//                 <FaLocationDot color="#666373" />
//                 <span className="text-[#332A2A] font-medium">{data?.location}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <img src={calender} alt="calender" className="h-4" />
//                 <span className="text-[#332A2A] text-[14px] text-nowrap font-medium">{new Date(data?.startDate).toDateString()}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-[#28C900] rounded-full" />
//                 <span className="text-[#332A2A] text-[14px] text-nowrap font-medium">Plazas disponibles</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <img src={star} alt="star" className="h-4" />
//                 <span className="text-[#332A2A] text-[14px] font-medium">4.5 (31 reviews)</span>
//               </div>
//             </div>
//           </div>
//           {showApplyButton && (
//             <Dialog>
//               <DialogTrigger>
//                 <Button className="flex justify-center bg-[#0DAC87] hover:bg-[#119b7b] cursor-pointer rounded-full px-8 py-5">Join This Adventure</Button>
//               </DialogTrigger>
//               <ApplicationForm />
//             </Dialog>
//           )}
//         </div>
//         <div>
//         </div>
//       </div>
//       <img src={zigzag} alt="zigzag" />
//       <div className="px-4 sm:px-16 py-6">
//         <h4 className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">About Trip</h4>
//         <span className="text-[#332A2A] text-sm">
//           {data?.longDesc || "No Description"}
//         </span>
//       </div>
//     </>
//   )
// }

// export default MasonryLayout






import { Button } from "@/components/ui/button";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import detailtrip1 from "../../../assets/detailtrip1.png"
import zigzag from "../../../assets/zigzag.png"
import { FaLocationDot } from "react-icons/fa6";
import { Calendar, Star } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";
import { formatDateRange } from "../../../utils/dateFormatter";
import { useState } from "react";

type MasonryLayoutProps = {
  trip: any;
  backUrl?: string;
  backLabel?: string;
  showApplyButton?: boolean;
  headerAction?: React.ReactNode;
};

const MasonryLayout = ({ trip, backUrl = "/user-dashboard/adventure-oppurtunities", backLabel = "Back", showApplyButton = true, headerAction }: MasonryLayoutProps) => {
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  
  // Extract trip data - handle both direct trip object and nested structure
  const data = trip?.trip?.[0] || trip?.trip || trip;
  const galleryImg = data?.galleryImages || [];
  
  // Helper function to get image URL with proper handling
  const getImageUrl = (item: any): string => {
    if (!item) return "";
    if (typeof item === "string") return item;
    if (item?.url) return item.url;
    if (item?.image) return item.image;
    return "";
  };

  // Handle image load errors
  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  // Format date range
  const dateRange = data?.startDate && data?.endDate 
    ? formatDateRange(data.startDate, data.endDate)
    : "";

  return (
    <>
      <div className="px-4 sm:px-16 py-6 bg-gradient-to-b from-[#F6F8FD] to-white">
        {/* Header with back button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Button 
            onClick={() => navigate(backUrl)} 
            variant="ghost"
            className="bg-white hover:bg-[#F6F8FD] text-[#221E33] rounded-lg cursor-pointer font-medium shadow-sm border border-[#ECECF1]"
          >
            <TbArrowBackUp className="mr-2" />
            {backLabel}
          </Button>
          {headerAction != null ? headerAction : null}
        </div>

        {/* Gallery Images - WeRoad style masonry grid */}
        {galleryImg?.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {galleryImg.slice(0, 4).map((img: any, index: number) => {
              const imageUrl = getImageUrl(img);
              const hasError = imageErrors.has(index);
              
              return (
                <div 
                  key={index} 
                  className={`relative overflow-hidden rounded-xl ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <img
                    src={hasError || !imageUrl ? detailtrip1 : imageUrl}
                    className={`w-full h-full object-cover ${
                      index === 0 ? "h-[400px] lg:h-[500px]" : "h-[200px] lg:h-[240px]"
                    }`}
                    alt={`Gallery ${index + 1}`}
                    onError={() => {
                      if (!hasError) {
                        handleImageError(index);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mb-8">
            <img
              src={detailtrip1}
              className="w-full h-[400px] object-cover rounded-xl"
              alt="Trip cover"
              onError={(e) => {
                // If detailtrip1 also fails, use a placeholder
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400/221E33/FFFFFF?text=Trip+Image";
              }}
            />
          </div>
        )}

        {/* Trip Title and Info - WeRoad style */}
        <div className="mb-8">
          <h1 className="text-[#221E33] font-bold text-3xl lg:text-5xl mb-6 leading-tight">
            {data?.title || data?.name || "Trip Title"}
          </h1>
          
          {/* Info badges */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            {data?.location && (
              <div className="flex items-center gap-2 text-[#666373]">
                <FaLocationDot className="text-[#0DAC87]" size={18} />
                <span className="font-medium text-base">{data.location}</span>
              </div>
            )}
            
            {dateRange && (
              <div className="flex items-center gap-2 text-[#666373]">
                <Calendar className="text-[#0DAC87]" size={18} />
                <span className="font-medium text-base">{dateRange}</span>
              </div>
            )}
            
            {data?.duration && (
              <div className="flex items-center gap-2 text-[#666373]">
                <span className="font-medium text-base">{data.duration}</span>
              </div>
            )}
          </div>

          {/* Rating and availability */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Star className="text-[#F59E0B] fill-[#F59E0B]" size={18} />
              <span className="text-[#332A2A] font-medium text-sm">4.5 (31 reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#28C900] rounded-full" />
              <span className="text-[#332A2A] font-medium text-sm">Plazas disponibles</span>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        {showApplyButton && (
          <div className="mb-8">
            <Dialog>
              <DialogTrigger>
                <Button className="bg-[#0DAC87] hover:bg-[#119b7b] text-white cursor-pointer rounded-full px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Join This Adventure
                </Button>
              </DialogTrigger>
              <ApplicationForm />
            </Dialog>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-full overflow-hidden">
        <img src={zigzag} alt="divider" className="w-full h-auto" />
      </div>

      {/* About Trip Section */}
      <div className="px-4 sm:px-16 py-8 bg-white">
        <h2 className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-4xl mb-4">
          About Trip
        </h2>
        <p className="text-[#332A2A] text-base leading-relaxed max-w-4xl">
          {data?.longDesc || data?.description || "No description available."}
        </p>
      </div>
    </>
  )
}

export default MasonryLayout