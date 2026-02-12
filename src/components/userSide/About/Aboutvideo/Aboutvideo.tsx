import { useRef, useState } from "react";
import WonderPeoplebg from "../../../../assets/WonderPeoplebg.png";
import { FaPlay } from "react-icons/fa";
import Youtube1 from "../../../../assets/Youtube1.png";
import Youtube2 from "../../../../assets/Youtube2.png";
import locationIcon from "../../../../assets/footerlocation.png";

const VIDEO_CARDS = [
  {
    id: 1,
    image: "https://preview.redd.it/indian-head-in-the-clouds-on-9-26-v0-01wzvujr2bsf1.jpg?width=640&crop=smart&auto=webp&s=87e76e77f0a2c2d21e07b8e0b1c204bec214824a",
    title: "Community moments",
    location: "Global Reach",
    videoUrl: "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462860/6010648_Couple_Man_3840x2160_exvauy.mp4",
  },
  {
    id: 2,
    image: Youtube2,
    title: "Adventure together",
    location: "Nature Park",
    videoUrl: "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462900/4911591_Sandstone_Landscape_3840x2160_i4fqui.mp4",
  },
  {
    id: 3,
    image: Youtube1,
    title: "Explore with us",
    location: "Wilderness",
    videoUrl: "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462726/457098_United_States_Fish_And_Wildlife_Service_USFWS_1920x1080_bykwra.mp4",
  }
];

const Aboutvideo = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const handleMouseEnter = (cardId: number) => {
    setHoveredCard(cardId);
    const video = videoRefs.current[cardId];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (cardId: number) => {
    const video = videoRefs.current[cardId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setHoveredCard(null);
  };

  return (
    <>
      <div className="relative w-full h-[600px] sm:h-[700px] lg:h-[85vh] overflow-hidden">
        <img
          src={WonderPeoplebg}
          alt="WonderPeoplebg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full w-full px-4 pt-10">
          <h1 className="text-center bg-gradient-to-r from-white to-[#E3E3E3] text-transparent bg-clip-text font-bold text-2xl sm:text-3xl lg:text-5xl mb-10 lg:mb-14 leading-tight">
            We are all part of a large and
            <br />
            vibrant community
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 lg:gap-6">
            {VIDEO_CARDS.map((card) => (
              <div
                key={card.id}
                className="relative rounded-[20px] overflow-hidden cursor-pointer w-[140px] sm:w-[160px] md:w-[180px] lg:w-[220px] aspect-[9/16] flex-shrink-0 shadow-xl"
                onClick={() => setActiveVideo(card.videoUrl)}
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={() => handleMouseLeave(card.id)}
              >
                {/* Static Image - disappears on hover */}
                <img
                  src={card.image}
                  alt={card.title}
                  className={`absolute inset-0 w-full h-[500px] object-cover transition-opacity duration-300 ${
                    hoveredCard === card.id ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Video - shows on hover */}
                <video
                  ref={(el) => { videoRefs.current[card.id] = el; }}
                  src={card.videoUrl}
                  muted
                  playsInline
                  loop
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    hoveredCard === card.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Constant Gradient for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Play Button - Only visible when NOT hovering */}
                <div className={`absolute inset-0 flex justify-center items-center mb-16 transition-opacity duration-300 ${
                  hoveredCard === card.id ? "opacity-0" : "opacity-100"
                }`}>
                  <div className="bg-[#FC1616]/80 p-4 rounded-full shadow-2xl">
                    <FaPlay color="#FFFFFF" size={18} />
                  </div>
                </div>

                {/* Text Content - No movement animations */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
                  <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1">
                    {card.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <img src={locationIcon} alt="loc" className="h-4 w-auto" />
                    <p className="text-gray-200 text-xs lg:text-sm font-medium">{card.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-14 right-0 text-white hover:text-red-500 p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-black">
              <video src={activeVideo} controls autoPlay className="absolute inset-0 w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Aboutvideo;