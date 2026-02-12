import { UsegetCoordinator } from "@/hooks/getCoordinatorhook";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MeetCoordinator = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: coordinatorData } = UsegetCoordinator();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handleMouseEnter = (cardId: string, videoUrl?: string) => {
    setHoveredCard(cardId);
    if (videoUrl) {
      const video = videoRefs.current[cardId];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = (cardId: string) => {
    const video = videoRefs.current[cardId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setHoveredCard((prev) => (prev === cardId ? null : prev));
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

      {/* Coordinators Grid - Improved spacing */}
      <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-6 lg:gap-8 px-4 sm:px-8 lg:px-12 py-8">
        {coordinatorData?.coordinators?.map((item: any, index: number) => {
          const cardId = item.id ?? `coordinator-${index}`;
          const hasVideo = item.profileVideo || item.profileGif;
          const videoUrl = item.profileVideo || item.profileGif;

          return (
            <button
              key={cardId}
              type="button"
              onClick={() => navigate(`/coordinator/${item.id}`)}
              onMouseEnter={() => handleMouseEnter(cardId, videoUrl)}
              onMouseLeave={() => handleMouseLeave(cardId)}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#E5E5E5] text-center shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#221E33]/20 focus:ring-offset-2"
            >
                  {/* Coordinator Image - shown when not hovering or no video */}
                  <img
                    src={item.profilePicture || "https://github.com/shadcn.png"}
                    alt={item.fullName}
                    className={`absolute inset-0 h-full w-full object-cover rounded-2xl transition-opacity duration-300 ${
                      hoveredCard === cardId && hasVideo ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Video/GIF - shown on hover if available */}
                  {hasVideo && (
                    <video
                      ref={(el) => {
                        videoRefs.current[cardId] = el;
                      }}
                      src={videoUrl}
                      muted
                      playsInline
                      loop
                      className={`absolute inset-0 h-full w-full object-cover rounded-2xl transition-opacity duration-300 ${
                        hoveredCard === cardId ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}

                  {/* Improved Overlay with Name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-4 px-3">
                    <span className="text-lg font-semibold text-white drop-shadow-lg text-center">
                      {item.fullName}
                    </span>
                  </div>
                </button>
          );
        })}
      </div>
    </div>
  );
};

export default MeetCoordinator;
