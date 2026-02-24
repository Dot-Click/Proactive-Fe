import { UsegetCoordinator } from "@/hooks/getCoordinatorhook";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Coordinatordetailmodal from "../../admin/CoordinatorManagement/Coordinatordetailmodal";

const MeetCoordinator = () => {
  const { t } = useTranslation();
  const { data: coordinatorData } = UsegetCoordinator();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Helper to check if URL is a video
  const isVideoUrl = (url: string) => {
    return /\.(mp4|webm|ogg|mov)$/i.test(url) || url.includes('/video/');
  };

  const handleMouseEnter = (cardId: string, mediaUrl?: string) => {
    setHoveredCard(cardId);
    if (mediaUrl && isVideoUrl(mediaUrl)) {
      const video = videoRefs.current[cardId];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => { });
      }
    }
  };

  const handleMouseLeave = (cardId: string) => {
    const video = videoRefs.current[cardId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setHoveredCard(null);
  };

  return (
    <div className="bg-[#FAFAFA] py-20">
      {/* Header */}
      <div className="flex flex-col gap-4 justify-center items-center mb-8 lg:mb-12">
        <h1 className="text-center bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-4xl">
          {t('travelCoordinator.meetCoordinator.title')}
        </h1>
        <p className="text-center text-[#221E33]" dangerouslySetInnerHTML={{ __html: t('travelCoordinator.meetCoordinator.subtitle').replace(/\n/g, '<br />') }} />
      </div>

      {/* Coordinators Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-6 lg:gap-8 px-4 sm:px-8 lg:px-12 py-8">
        {coordinatorData?.coordinators?.map((item: any, index: number) => {
          const cardId = item.id ?? `coordinator-${index}`;
          // Get media URL (video or gif) — fallback to demo GIF
          const mediaUrl = item.profileVideo || item.profileGif || item.gif || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx66F9C7Pa/giphy.gif";
          const hasMedia = !!mediaUrl;
          const isVideo = hasMedia && isVideoUrl(mediaUrl);

          return (
            <Dialog key={cardId}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter(cardId, mediaUrl)}
                  onMouseLeave={() => handleMouseLeave(cardId)}
                  className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#E5E5E5] text-center shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#221E33]/20 focus:ring-offset-2 cursor-pointer"
                >
                  {/* 1. Static Profile Image (visible by default, hidden on hover if media exists) */}
                  <img
                    src={item.profilePicture || "https://github.com/shadcn.png"}
                    alt={item.fullName}
                    className={`absolute inset-0 h-full w-full object-cover rounded-2xl transition-opacity duration-300 ${hoveredCard === cardId && hasMedia ? "opacity-0" : "opacity-100"
                      }`}
                  />

                  {/* 2. Video Element (shows if isVideo is true and hovered) */}
                  {hasMedia && isVideo && (
                    <video
                      ref={(el) => { videoRefs.current[cardId] = el; }}
                      src={mediaUrl}
                      muted
                      playsInline
                      loop
                      className={`absolute inset-0 h-full w-full object-cover rounded-2xl transition-opacity duration-300 ${hoveredCard === cardId ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  )}

                  {/* 3. GIF Element (shows if isVideo is false and hovered) */}
                  {hasMedia && !isVideo && (
                    <img
                      src={mediaUrl}
                      alt={`${item.fullName} moving`}
                      className={`absolute inset-0 h-full w-full object-cover rounded-2xl transition-opacity duration-300 ${hoveredCard === cardId ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  )}

                  {/* Overlay with Name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end justify-center pb-4 px-3">
                    <span className="text-lg font-semibold text-white drop-shadow-lg text-center">
                      {item.fullName}
                    </span>
                  </div>
                </button>
              </DialogTrigger>
              <Coordinatordetailmodal coordinatorId={item.id} role="user" />
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};

export default MeetCoordinator;