// import impact2 from "../../../../assets/impact2.png"
// import impact4 from "../../../../assets/impact4.png"
// import CountUp from 'react-countup';
// import { Tent, Users } from 'lucide-react';

// const ImpactCard = () => {
//   return (
//     // <div className="grid lg:grid-cols-4 grid-cols-2 justify-center items-center lg:mt-30 gap-6">
//     //   <div className="lg:w-60 lg:px-8 lg:py-8 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
//     //     <div className="flex flex-col items-center gap-8">
//     //       <img src={impact1} alt="impact1" />
//     //       <div className="flex flex-col gap-2 justify-center items-center">
//     //         <h4 className="text-[#FFFFFF] font-bold text-4xl">2500+</h4>
//     //         <p className="text-[#FFFFFF]">Adventures Completed</p>
//     //       </div>
//     //     </div>
//     //   </div>
//     //   <div className="w-60 px-8 py-8 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
//     //     <div className="flex flex-col items-center gap-10">
//     //       <img src={impact2} alt="impact2" />
//     //       <div className="flex flex-col gap-2 justify-center items-center">
//     //         <h4 className="text-[#FFFFFF] font-bold text-4xl">15000+</h4>
//     //         <p className="text-[#FFFFFF]">Happy Travelers</p>
//     //       </div>
//     //     </div>
//     //   </div>
//     //   <div className="w-60 px-8 py-8 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
//     //     <div className="flex flex-col items-center gap-13">
//     //       <img src={impact3} alt="impact3" />
//     //       <div className="flex flex-col gap-2 justify-center items-center">
//     //         <h4 className="text-[#FFFFFF] font-bold text-4xl">50+</h4>
//     //         <p className="text-[#FFFFFF]">Countries Visited</p>
//     //       </div>
//     //     </div>
//     //   </div>
//     //   <div className="w-60 px-8 py-8 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
//     //     <div className="flex flex-col items-center gap-10">
//     //       <img src={impact4} alt="impact4" />
//     //       <div className="flex flex-col gap-2 justify-center items-center">
//     //         <h4 className="text-[#FFFFFF] font-bold text-4xl">897/5</h4>
//     //         <p className="text-[#FFFFFF]">Average Rating</p>
//     //       </div>
//     //     </div>
//     //   </div>

//     // </div>
//     <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-4 lg:mt-30 mt-6">
//       <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-2 py-2 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
//         <div className="flex flex-col items-center gap-10">
//           <Tent className="h-12 w-12 text-white" strokeWidth={2} aria-hidden />
//           <div className="flex flex-col lg:gap-2 justify-center items-center">
//             <h4 className="text-[#FFFFFF] font-bold lg:text-4xl"><CountUp start={0} end={2500} delay={0} separator="">
//               {({ countUpRef }) => (
//                 <div>
//                   <span ref={countUpRef} />
//                   <span>+</span>
//                 </div>
//               )}
//             </CountUp>
//             </h4>
//             <p className="text-[#FFFFFF] text-[12px] lg:text-[16px]">Adventures Completed</p>
//           </div>
//         </div>
//       </div>

//       <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-2 py-2 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
//         <div className="flex flex-col items-center gap-10">
//           <img src={impact2} alt="impact2" className="h-12" />
//           <div className="flex flex-col lg:gap-2 justify-center items-center">
//             <h4 className="text-[#FFFFFF] font-bold lg:text-4xl"><CountUp start={0} end={150000} delay={0} separator="">
//               {({ countUpRef }) => (
//                 <div>
//                   <span ref={countUpRef} />
//                   <span>+</span>
//                 </div>
//               )}
//             </CountUp>
//             </h4>
//             <p className="text-[#FFFFFF] text-sm lg:text-[16px]">Happy Travelers</p>
//           </div>
//         </div>
//       </div>

//       <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-3 py-2 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
//         <div className="flex flex-col items-center gap-10">
//           <Users className="h-12 w-12 text-white" strokeWidth={2} aria-hidden />
//           <div className="flex flex-col lg:gap-2 justify-center items-center">
//             <h4 className="text-[#FFFFFF] font-bold lg:text-4xl"><CountUp start={0} end={50} delay={0} separator="">
//               {({ countUpRef }) => (
//                 <div>
//                   <span ref={countUpRef} />
//                   <span>+</span>
//                 </div>
//               )}
//             </CountUp>
//             </h4>
//             <p className="text-[#FFFFFF] text-sm lg:text-[16px]">Countries Visited</p>
//           </div>
//         </div>
//       </div>

//       <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-3 py-2 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
//         <div className="flex flex-col items-center gap-10">
//           <img src={impact4} alt="impact4" className="h-12" />
//           <div className="flex flex-col lg:gap-2 justify-center items-center">
//             <h4 className="text-[#FFFFFF] font-bold lg:text-4xl">897/5</h4>
//             <p className="text-[#FFFFFF] text-sm lg:text-[16px]">Average Rating</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ImpactCard



import {  FaUserFriends, FaGlobeAmericas, FaStar } from "react-icons/fa";
import {TentIcon} from "lucide-react";
import CountUp from 'react-countup';

const ImpactCard = () => {
  const cardStyle = "lg:w-[240px] mx-auto lg:px-8 lg:py-10 px-4 py-6 rounded-[24px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-white/20 shadow-2xl backdrop-blur-md hover:translate-y-[-5px] transition-all duration-300";
  const iconStyle = "text-white text-5xl mb-2"; // Styling for the Font Awesome icons

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 lg:mt-30 mt-6">
      
      {/* 1. CAMPING (Changed from Mountain) */}
      <div className={cardStyle}>
        <div className="flex flex-col items-center gap-6">
          <TentIcon className={iconStyle} /> 
          <div className="flex flex-col lg:gap-2 justify-center items-center">
            <h4 className="text-[#FFFFFF] font-bold lg:text-4xl text-2xl">
                <CountUp start={0} end={2500} separator="," suffix="+" />
            </h4>
            <p className="text-[#FFFFFF] text-[12px] lg:text-[16px] opacity-90 uppercase tracking-wider">Camping Spots</p>
          </div>
        </div>
      </div>

      {/* 2. PEOPLE ADVENTURE (Changed from Plane) */}
      <div className={cardStyle}>
        <div className="flex flex-col items-center gap-6">
          <FaUserFriends className={iconStyle} />
          <div className="flex flex-col lg:gap-2 justify-center items-center">
            <h4 className="text-[#FFFFFF] font-bold lg:text-4xl text-2xl">
                <CountUp start={0} end={150000} separator="," suffix="+" />
            </h4>
            <p className="text-[#FFFFFF] text-sm lg:text-[16px] opacity-90 uppercase tracking-wider">Active Explorers</p>
          </div>
        </div>
      </div>

      {/* 3. COUNTRIES */}
      <div className={cardStyle}>
        <div className="flex flex-col items-center gap-6">
          <FaGlobeAmericas className={iconStyle} />
          <div className="flex flex-col lg:gap-2 justify-center items-center">
            <h4 className="text-[#FFFFFF] font-bold lg:text-4xl text-2xl">
                <CountUp start={0} end={50} suffix="+" />
            </h4>
            <p className="text-[#FFFFFF] text-sm lg:text-[16px] opacity-90 uppercase tracking-wider">Countries</p>
          </div>
        </div>
      </div>

      {/* 4. RATING */}
      <div className={cardStyle}>
        <div className="flex flex-col items-center gap-6">
          <FaStar className={iconStyle} />
          <div className="flex flex-col lg:gap-2 justify-center items-center">
            <h4 className="text-[#FFFFFF] font-bold lg:text-4xl text-2xl">4.9 / 5</h4>
            <p className="text-[#FFFFFF] text-sm lg:text-[16px] opacity-90 uppercase tracking-wider">Top Rating</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ImpactCard;