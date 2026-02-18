import { Button } from "@/components/ui/button";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
// import detailtrip1 from "../../../assets/detailtrip1.png"
import zigzag from "../../../assets/zigzag.png"
import { FaLocationDot } from "react-icons/fa6";
import { Calendar, Star, X, ImageIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";
import { formatDateRange } from "../../../utils/dateFormatter";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type MasonryLayoutProps = {
  trip: any;
  backUrl?: string;
  backLabel?: string;
  showApplyButton?: boolean;
  headerAction?: React.ReactNode;
};

const MasonryLayout = ({ trip, backUrl = "/user-dashboard/adventure-oppurtunities", backLabel = "Back", showApplyButton = true, headerAction }: MasonryLayoutProps) => {
  const navigate = useNavigate();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

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

  // Format date range
  const dateRange = data?.startDate && data?.endDate
    ? formatDateRange(data.startDate, data.endDate)
    : "";

  const remainingCount = Math.max(0, galleryImg.length - 4);

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

        {/* Gallery Section - Adaptive Grid */}
        {galleryImg.length > 0 && (
          <div className="relative mb-8 group">
            <div className={`grid gap-2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-md ${galleryImg.length === 1 ? "grid-cols-1" :
                galleryImg.length === 2 ? "grid-cols-1 md:grid-cols-2" :
                  galleryImg.length === 3 ? "grid-cols-1 md:grid-cols-3" :
                    "grid-cols-1 md:grid-cols-4"
              }`}>
              {/* Image 1 */}
              <div
                className={`relative cursor-pointer overflow-hidden ${galleryImg.length >= 4 ? "md:col-span-2" : ""
                  }`}
                onClick={() => setIsGalleryOpen(true)}
              >
                <img
                  src={getImageUrl(galleryImg[0])}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                  alt="Trip Gallery 1"
                />
              </div>

              {/* Image 2 */}
              {galleryImg.length > 1 && (
                <div
                  className={`relative cursor-pointer overflow-hidden ${galleryImg.length === 3 ? "md:col-span-1" :
                      galleryImg.length >= 4 ? "md:col-span-1" : ""
                    }`}
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <img
                    src={getImageUrl(galleryImg[1])}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                    alt="Trip Gallery 2"
                  />
                </div>
              )}

              {/* Image 3 & 4 (Adaptive) */}
              {galleryImg.length === 3 && (
                <div
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <img
                    src={getImageUrl(galleryImg[2])}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                    alt="Trip Gallery 3"
                  />
                </div>
              )}

              {galleryImg.length >= 4 && (
                <div className="hidden md:flex flex-col gap-2">
                  <div
                    className="h-1/2 relative cursor-pointer overflow-hidden"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <img
                      src={getImageUrl(galleryImg[2])}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                      alt="Trip Gallery 3"
                    />
                  </div>
                  <div
                    className="h-1/2 relative cursor-pointer overflow-hidden"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <img
                      src={getImageUrl(galleryImg[3])}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                      alt="Trip Gallery 4"
                    />
                    {/* Overlay for "View more" */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 transition-opacity">
                      <div className="flex flex-col items-center text-white text-center">
                        <ImageIcon className="mb-1" size={24} />
                        <span className="font-bold text-lg">
                          {remainingCount > 0 ? `Ver otras ${remainingCount} fotos` : "Ver todas las fotos"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile "See all photos" button overlay */}
            <button
              className="md:hidden absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-[#221E33] text-sm font-semibold shadow-lg flex items-center gap-2"
              onClick={() => setIsGalleryOpen(true)}
            >
              <ImageIcon size={16} />
              Ver {galleryImg.length} fotos
            </button>
          </div>
        )}

        {/* Trip Title and Info */}
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
              <DialogTrigger asChild>
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

      {/* Full Page Gallery Modal */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent
          className="!fixed !left-0 !top-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none p-0 border-none bg-white flex flex-col overflow-hidden z-[100] duration-200"
          onPointerDownOutside={(e) => e.preventDefault()}
          showCloseButton={false}
        >
          <VisuallyHidden>
            <DialogTitle>Trip Image Gallery</DialogTitle>
          </VisuallyHidden>

          {/* Popup Header */}
          <div className="w-full flex justify-between items-center px-6 py-4 bg-white border-b border-gray-100 shrink-0 shadow-sm relative z-10">
            <span className="text-[#221E33] font-bold text-lg md:text-xl truncate pr-4">
              {data?.title || data?.name || "Trip Title"}
            </span>
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-all hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>

          {/* Gallery Content */}
          <div className="w-full flex-grow overflow-y-auto bg-[#F9FAFB] p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-20">
                {galleryImg.map((img: any, idx: number) => (
                  <div
                    key={idx}
                    className={`w-full overflow-hidden rounded-xl shadow-md bg-white border border-gray-100 ${galleryImg.length === 1 ? "md:col-span-2" :
                        (idx % 3 === 0 && galleryImg.length > 2) ? "md:col-span-2" : "md:col-span-1"
                      }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`Trip Gallery Full ${idx + 1}`}
                      className="w-full h-auto object-cover hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MasonryLayout