// // import Play from "../../../../assets/play2.png";
// // import momentscard1 from "../../../../assets/momentscard1.png";
// // import momentscard2 from "../../../../assets/momentscard2.png";
// // import momentscard3 from "../../../../assets/momentscard3.png";
// // import location from "../../../../assets/footerlocation.png";
// // const Adventuremomentscards = () => {
// //   return (
// //     <div className="flex flex-col lg:flex-row gap-2 mb-8">
// //       <div className="relative rounded-[14px] overflow-hidden">
// //         <img src={momentscard1} alt="momentscard1" className="h-full w-90" />

// //         <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
// //           <img src={Play} alt="Play" className="h-10 cursor-pointer" />
// //         </div>
// //         <div className="flex flex-col justify-end px-8 py-16 lg:gap-8 absolute inset-0">
// //           <h4 className="text-[#FFFFFF] font-bold  text-lg">
// //             Travel forest with guider
// //           </h4>
// //           <div className="flex items-center gap-3">
// //             <img src={location} alt="location" className="h-5" />
// //             <p className="text-[#FFFFFF]">Mexico</p>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="relative rounded-[14px] overflow-hidden">
// //         <img src={momentscard2} alt="momentscard2" className="h-full w-90" />

// //         <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
// //           <img src={Play} alt="Play" className="h-10 cursor-pointer" />
// //         </div>
// //         <div className="flex flex-col justify-end px-8 py-15 lg:gap-4 absolute inset-0">
// //           <h4 className="text-[#FFFFFF] font-bold text-lg">
// //             Vibrant orange and pink <br /> canyon landscape
// //           </h4>
// //           <div className="flex items-center gap-3">
// //             <img src={location} alt="location" className="h-5" />
// //             <p className="text-[#FFFFFF]">Red Valley, Peru</p>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="relative rounded-[14px] overflow-hidden">
// //         <img src={momentscard3} alt="momentscard3" className="h-full w-90" />

// //         <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
// //           <img src={Play} alt="Play" className="h-10 cursor-pointer" />
// //         </div>
// //         <div className="flex flex-col justify-end px-8 py-15 lg:gap-4 absolute inset-0">
// //           <h4 className="text-[#FFFFFF] font-bold  text-lg">
// //             Underwater adventure scuba <br /> diver
// //           </h4>
// //           <div className="flex items-center gap-3">
// //             <img src={location} alt="location" className="h-5" />
// //             <p className="text-[#FFFFFF]">Gili Island, Indonsia</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Adventuremomentscards;


// import { useState } from "react";
// import Play from "../../../../assets/play2.png";
// import momentscard1 from "../../../../assets/momentscard1.png";
// import momentscard2 from "../../../../assets/momentscard2.png";
// import momentscard3 from "../../../../assets/momentscard3.png";
// import location from "../../../../assets/footerlocation.png";
// // import video1 from "../../../../assets/6010648_Couple_Man_3840x2160.mp4"
// // import video2 from "../../../../assets/4911591_Sandstone_Landscape_3840x2160.mp4"
// // import video3 from "../../../../assets/457098_United_States_Fish_And_Wildlife_Service_USFWS_1920x1080.mp4";

// const Adventuremomentscards = () => {
//   const [activeVideo, setActiveVideo] = useState(null);

//   const cards = [
//     {
//       id: 1,
//       image: momentscard1,
//       title: "Travel forest with guider",
//       location: "Mexico",
//       videoUrl: "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462860/6010648_Couple_Man_3840x2160_exvauy.mp4", // Replace with your actual video URLs
//     },
//     {
//       id: 2,
//       image: momentscard2,
//       title: "Vibrant orange and pink canyon landscape",
//       location: "Red Valley, Peru",
//       videoUrl: "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462900/4911591_Sandstone_Landscape_3840x2160_i4fqui.mp4",
//     },
//     {
//       id: 3,
//       image: momentscard3,
//       title: "Underwater adventure scuba diver",
//       location: "Gili Island, Indonesia",
//       videoUrl: "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462726/457098_United_States_Fish_And_Wildlife_Service_USFWS_1920x1080_bykwra.mp4",
//     },
//   ];

//   const openVideo = (videoUrl:any) => {
//     setActiveVideo(videoUrl);
//   };

//   const closeVideo = () => {
//     setActiveVideo(null);
//   };

//   return (
//     <>
//       <div className="flex flex-col lg:flex-row gap-2 mb-8">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             className="relative rounded-[14px] overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl"
//             onClick={() => openVideo(card.videoUrl)}
//           >
//             <img
//               src={card.image}
//               alt={`momentscard${card.id}`}
//               className="h-full w-90 object-cover transition-transform duration-500 group-hover:scale-110"
//             />

//             {/* Overlay gradient */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

//             {/* Play button with pop animation */}
//             <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
//               <div className="relative">
//                 {/* Pulse ring animation */}
//                 <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
//                 {/* Play icon with scale effect */}
//                 <img
//                   src={Play}
//                   alt="Play"
//                   className="h-10 relative z-10 transform transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-lg"
//                 />
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex flex-col justify-end px-8 py-16 lg:gap-4 absolute inset-0 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
//               <h4 className="text-[#FFFFFF] font-bold text-lg drop-shadow-md">
//                 {card.title.includes("<br />") ? (
//                   <span dangerouslySetInnerHTML={{ __html: card.title.replace(/<br \/>/g, '<br />') }} />
//                 ) : (
//                   card.title
//                 )}
//               </h4>
//               <div className="flex items-center gap-3 transform transition-transform duration-300 group-hover:translate-x-1">
//                 <img src={location} alt="location" className="h-5 drop-shadow" />
//                 <p className="text-[#FFFFFF] drop-shadow-md">{card.location}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Video Modal */}
//       {activeVideo && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
//           onClick={closeVideo}
//         >
//           <div
//             className="relative w-full max-w-4xl mx-4 animate-in zoom-in-95 duration-200"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button */}
//             <button
//               onClick={closeVideo}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             {/* Video iframe */}
//             <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-2xl">
//               <iframe
//                 src={activeVideo + "?autoplay=1"}
//                 title="Adventure Video"
//                 className="absolute inset-0 w-full h-full"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Adventuremomentscards;


import { useRef, useState } from "react";
import momentscard1 from "../../../../assets/momentscard1.png";
import momentscard2 from "../../../../assets/momentscard2.png";
import momentscard3 from "../../../../assets/momentscard3.png";
import location from "../../../../assets/footerlocation.png";
// import video1 from "../../../../assets/6010648_Couple_Man_3840x2160.mp4"
// import video2 from "../../../../assets/4911591_Sandstone_Landscape_3840x2160.mp4"
// import video3 from "../../../../assets/457098_United_States_Fish_And_Wildlife_Service_USFWS_1920x1080.mp4";

const Adventuremomentscards = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const cards = [
    {
      id: 1,
      image: momentscard1,
      title: "Travel forest with guider",
      location: "Mexico",
      videoUrl: "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462860/6010648_Couple_Man_3840x2160_exvauy.mp4", // Replace with your actual video URLs
    },
    {
      id: 2,
      image: momentscard2,
      title: "Vibrant orange and pink canyon landscape",
      location: "Red Valley, Peru",
      videoUrl: "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462900/4911591_Sandstone_Landscape_3840x2160_i4fqui.mp4",
    },
    {
      id: 3,
      image: momentscard3,
      title: "Underwater adventure scuba diver",
      location: "Gili Island, Indonesia",
      videoUrl: "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462726/457098_United_States_Fish_And_Wildlife_Service_USFWS_1920x1080_bykwra.mp4",
    },
  ];

  const openVideo = (videoUrl: string) => {
    setActiveVideo(videoUrl);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  const handleMouseEnter = (cardId: number) => {
    setHoveredCard(cardId);
    const video = videoRefs.current[cardId];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        /* ignore play interruptions */
      });
    }
  };

  const handleMouseLeave = (cardId: number) => {
    const video = videoRefs.current[cardId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setHoveredCard((prev) => (prev === cardId ? null : prev));
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative rounded-[14px] overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-2xl"
            onClick={() => openVideo(card.videoUrl)}
            onMouseEnter={() => handleMouseEnter(card.id)}
            onMouseLeave={() => handleMouseLeave(card.id)}
          >
            <img
              src={card.image}
              alt={`momentscard${card.id}`}
              className={`h-full w-90 object-cover transition-all duration-300 ${
                hoveredCard === card.id
                  ? "opacity-0 scale-105"
                  : " group-hover:scale-110"
              }`}
            />

            <video
              ref={(element) => {
                videoRefs.current[card.id] = element;
              }}
              src={card.videoUrl}
              muted
              playsInline
              loop
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                hoveredCard === card.id ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t  transition-opacity duration-300" />

            {/* Content */}
            <div className="flex flex-col justify-end px-8 py-16 lg:gap-4 absolute inset-0 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
              <h4 className="text-[#FFFFFF] font-bold text-lg drop-shadow-md">
                {card.title.includes("<br />") ? (
                  <span dangerouslySetInnerHTML={{ __html: card.title.replace(/<br \/>/g, '<br />') }} />
                ) : (
                  card.title
                )}
              </h4>
              <div className="flex items-center gap-3 transform transition-transform duration-300 group-hover:translate-x-1">
                <img src={location} alt="location" className="h-5 drop-shadow" />
                <p className="text-[#FFFFFF] drop-shadow-md">{card.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-4xl mx-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video iframe */}
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={activeVideo + "?autoplay=1"}
                title="Adventure Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Adventuremomentscards;