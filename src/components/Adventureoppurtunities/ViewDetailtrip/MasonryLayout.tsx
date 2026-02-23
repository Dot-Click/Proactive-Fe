import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Star, X, ImageIcon, CheckCircle2, XCircle } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronRight, Home, Share2, Scale, Zap, Wallet, Clock } from "lucide-react";
import { UsegetMyApplications } from "@/hooks/UsegetMyApplicationshook";
import { UsegetPayment } from "@/hooks/getPaymenthook";
import TripPaymentModal from "@/components/payment/TripPaymentModal";
import { useMemo } from "react";

type MasonryLayoutProps = {
  trip: any;
  backUrl?: string;
  backLabel?: string;
  showApplyButton?: boolean;
  headerAction?: React.ReactNode;
};

const MasonryLayout = ({ trip, backUrl: _backUrl = "/user-dashboard/adventure-oppurtunities", backLabel: _backLabel = "Back", showApplyButton = true, headerAction: _headerAction }: MasonryLayoutProps) => {
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

  return (
    <>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mt-30 py-6 bg-white">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#666373] mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Home size={14} className="hover:text-[#0DAC87] cursor-pointer" onClick={() => navigate("/")} />
          <ChevronRight size={14} />
          <span className="hover:text-[#0DAC87] cursor-pointer" onClick={() => navigate("/user-dashboard/adventure-oppurtunities")}>trips</span>
          <ChevronRight size={14} />
          <span className="hover:text-[#0DAC87] cursor-pointer">{trip?.category || "Explore"}</span>
          <ChevronRight size={14} />
          <span className="font-semibold text-[#221E33]">{data?.title || data?.name}</span>
        </nav>

        {/* Title Section */}
        <h1 className="text-[#221E33] font-extrabold text-3xl lg:text-4xl mb-6 tracking-tight">
          {data?.title || data?.name || "Trip Title"}
        </h1>

        {/* Stats and Actions Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap items-center gap-6">
            {/* Duration */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#F6F8FD] rounded-lg">
                <Calendar className="text-[#666373]" size={16} />
              </div>
              <span className="font-bold text-[#221E33] text-sm whitespace-nowrap">
                {data?.duration || "13 days • 12 nights"}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-[#0DAC87] rounded-[4px] flex items-center justify-center">
                    <Star size={12} className="text-white fill-white" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#221E33] text-sm">4.8</span>
                <span className="text-[#666373] text-sm">(2352 reviews)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-lg h-10 gap-2 border-[#ECECF1] text-[#221E33] hover:bg-[#F6F8FD] font-semibold text-sm">
              <Scale size={16} />
              Compare
            </Button>
            <Button variant="outline" className="rounded-lg h-10 gap-2 border-[#ECECF1] text-[#221E33] hover:bg-[#F6F8FD] font-semibold text-sm">
              <Share2 size={16} />
              Share
            </Button>
          </div>
        </div>

        {/* Gallery Section - Redesigned Grid */}
        {galleryImg.length > 0 && (
          <div className="relative mb-8 h-[300px] md:h-[500px]">
            <div className="grid grid-cols-4 grid-rows-2 gap-3 h-full rounded-2xl overflow-hidden">
              {/* Image 1 - Main Large (2x2) */}
              <div
                className="col-span-2 row-span-2 cursor-pointer overflow-hidden group"
                onClick={() => setIsGalleryOpen(true)}
              >
                <img
                  src={getImageUrl(galleryImg[0])}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Trip Gallery 1"
                />
              </div>

              {/* Image 2 - Tall Middle (1x2) */}
              {galleryImg.length > 1 && (
                <div
                  className="col-span-1 row-span-2 cursor-pointer overflow-hidden group"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <img
                    src={getImageUrl(galleryImg[1])}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Trip Gallery 2"
                  />
                </div>
              )}

              {/* Image 3 & 4 - Stacked Right (1x1 each) */}
              {galleryImg.length > 2 && (
                <div
                  className="col-span-1 row-span-1 cursor-pointer overflow-hidden group"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <img
                    src={getImageUrl(galleryImg[2])}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Trip Gallery 3"
                  />
                </div>
              )}

              {galleryImg.length > 3 && (
                <div
                  className="col-span-1 row-span-1 cursor-pointer overflow-hidden relative group"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <img
                    src={getImageUrl(galleryImg[3])}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Trip Gallery 4"
                  />
                  {/* Overlay for "View more" */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg text-[#221E33] text-sm font-bold shadow-sm flex items-center gap-2 hover:bg-white transition-colors">
                      <ImageIcon size={16} className="text-[#0DAC87]" />
                      <span>
                        See {galleryImg.length > 4 ? `${galleryImg.length - 4} more photos` : "all photos"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Apply / Pay / Status Button */}
        {showApplyButton && (() => {
          const { data: applications } = UsegetMyApplications();
          const { data: paymentData } = UsegetPayment();

          const userApp = useMemo(() => {
            return (applications || []).find((app: any) => String(app.tripId) === String(data?.id));
          }, [applications, data?.id]);

          const isApproved = userApp?.status === 'approved';
          const isPending = userApp?.status === 'pending';
          const isRejected = userApp?.status === 'rejected';

          const isPaid = useMemo(() => {
            const tripPayments = paymentData?.tripPayments || [];
            const OK_STATUSES = new Set(["completed", "paid", "confirmed", "succeeded", "success"]);
            return tripPayments.some((p: any) =>
              String(p.tripId) === String(data?.id) &&
              OK_STATUSES.has((p.status || "").toString().toLowerCase())
            );
          }, [paymentData, data?.id]);

          if (isPaid) {
            return (
              <div className="mb-4 flex justify-end">
                <Button
                  onClick={() => navigate("/user-dashboard")}
                  className="bg-[#0DAC87]/10 text-[#0DAC87] border border-[#0DAC87]/20 rounded-full px-10 py-6 text-lg font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Already Booked
                </Button>
              </div>
            );
          }

          if (isApproved) {
            return (
              <div className="mb-4 flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#FFB800] hover:bg-[#e6a600] text-[#221E33] cursor-pointer rounded-full px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                      <Wallet size={20} />
                      Pay Now (€{data?.perHeadPrice || data?.price || 0})
                    </Button>
                  </DialogTrigger>
                  <TripPaymentModal tripId={data?.id} />
                </Dialog>
              </div>
            );
          }

          if (isPending) {
            return (
              <div className="mb-4 flex justify-end">
                <Button disabled className="bg-[#F8F9FB] text-[#666373] border border-[#ECECF1] rounded-full px-10 py-6 text-lg font-bold shadow-sm flex items-center gap-2 cursor-default">
                  <Clock size={20} />
                  Application Under Review
                </Button>
              </div>
            );
          }

          if (isRejected) {
            return (
              <div className="mb-4 flex justify-end">
                <Button disabled className="bg-red-50 text-red-500 border border-red-100 rounded-full px-10 py-6 text-lg font-bold shadow-sm flex items-center gap-2 cursor-default">
                  <XCircle size={20} />
                  Application Rejected
                </Button>
              </div>
            );
          }

          return (
            <div className="mb-4 flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#0DAC87] hover:bg-[#119b7b] text-white cursor-pointer rounded-full px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                    Join This Adventure
                  </Button>
                </DialogTrigger>
                <ApplicationForm />
              </Dialog>
            </div>
          );
        })()}

        {/* Highlights Section */}
        <div className="mt-12 mb-16">
          <h3 className="text-[#221E33] font-bold text-2xl mb-6">Highlights</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(data?.highlights || [
              "Hike the stunning landscapes of Vietnam",
              "Visit ancient temples and historic sites",
              "Explore vibrant local markets and street food",
              "Enjoy a luxury boat cruise in Ha Long Bay",
              "Learn about local culture with expert guides",
              "Authentic experiences with the local community"
            ]).map((highlight: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 shrink-0 p-1 bg-[#E6F7F3] rounded-full">
                  <Zap size={14} className="text-[#0DAC87] fill-[#0DAC87]" />
                </div>
                <span className="text-[#332A2A] text-base leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* About Trip Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-12 bg-white border-t border-[#ECECF1]">
        <h2 className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-4xl mb-6">
          About Trip
        </h2>
        <div className="text-[#332A2A] text-base leading-[1.8] max-w-none space-y-4">
          {(data?.longDesc || data?.description || "No description available.").split('\n').map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </div>
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