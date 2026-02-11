// import { useLocation } from "react-router-dom";
// import carousel from "../../../assets/Group 1410091220.png"
// import oppHero from "../../../assets/openoppurtunities.png"
// import downloadimg from "../../../assets/Download.png"
// import wwHero from "../../../assets/wildweekend.png"
// import wtHero from "../../../assets/wildtrip.png"
// import erasmusHero from "../../../assets/Erasmus+.png"
// import InternalEvents from "../../../assets/Internalevents.png"
// import greenshadow from "../../../assets/greenshadow.png"
// import lightgreenshadow from "../../../assets/lightgreenshadow.png"
// import About from "../../../assets/About.png"
// import Member from "../../../assets/BecomeMember.png"
// import TravelCoordinatore from "../../../assets/Travelcoordinator.png"
// import advantages from "../../../assets/benefits.png"
// import contact from "../../../assets/Contact.png"
// import faq from "../../../assets/FAQ.png"
// import type { JSX } from "react";
// import type React from "react";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import PaymentModal from "@/components/userDashboard/Alert/PaymentModal";

// interface HeroContent {
//   image: React.ReactNode;
//   title: string | JSX.Element;
//   subtitle?: string | JSX.Element;
//   imageClass: string;
//   buttons?: {
//     text: string;
//     className: string;
//     openModal?: boolean;
//   }[];
//   downloadimg?: string;
//   CTA?: string | JSX.Element;
// }
// const heroData: Record<string, HeroContent> = {
//   "/": {
//     image: (
//       <div className="bg-linear-to-r from-[#F0F5FD]/18 to-[#F0F5FD]">
//         <img  src={carousel} 
//     alt="carousel" 
//     className="w-full h-full object-cover object-center md:object-top"
//  />
//       </div>
//     ),
//     title: (
//       <div className="flex flex-wrap justify-center items-center md:mt-30 mt-60">
//         <span className="text-white font-bold text-[14px] md:text-4xl text-nowrap lg:mt-12 ">
//           Your Next
//         </span>
//         <div className="flex items-center justify-center">
//           <span className="text-[14px] lg:text-8xl md:text-4xl font-extrabold bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text">
//             ADV
//           </span>
//           <span className="text-[14px] lg:text-8xl md:text-4xl font-extrabold text-stroke md:mb-8">
//             E
//           </span>
//           <span className="text-[14px] lg:text-8xl md:text-4xl font-extrabold text-stroke md:mt-4">
//             N
//           </span>
//           <span className="text-[14px] lg:text-8xl md:text-4xl font-extrabold bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text">
//             TURE
//           </span>
//         </div>
//         <span className="text-white font-bold text-[14px] md:text-4xl text-nowrap lg:mt-12">
//           Awaits
//         </span>
//       </div>
//     ),
//     subtitle: (
//       <span className="text-[12px] md:text-lg">
//         Discover extraordinary experiences,<br className="lg:block hidden" />
//         connect with fellow adventurers, and create memories that last a
//         lifetime with Proactive Future.
//       </span>
//     ),
//     imageClass: "sm:h-[70vh] lg:h-[100vh] md:h-[30vh]",
//     buttons: [
//       {
//         text: "Join the Adventure",
//         className:
//           "bg-[#0DAC87] hover:bg-[#0f9e7d] cursor-pointer rounded-full px-4 py-3 md:py-3 md:px-7 font-medium text-sm md:text-base",
//       },
//       {
//         text: "Get to Know Us",
//         className:
//           "bg-[#FFFFFF] hover:bg-[#e7d9d9] cursor-pointer rounded-full px-4 py-3 md:py-3 md:px-7 text-[#000000] font-medium text-sm lg:text-base",
//       },
//     ],
//     downloadimg: downloadimg
//   },

//   "/open-oppurtunities": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={oppHero} alt="oppHero" className="relative" />
//           <img
//             src={greenshadow}
//             alt="greenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-bold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">Open Opportunities</h1>
//     ),
//     subtitle: (
//       <span className="text-[10px] md:text-[16px]">
//         Discover amazing destinations and join our community of adventurers
//       </span>
//     ),
//     imageClass: "sm:h-[60vh] lg:h-[60vh] md:h-[20vh]",
//   },

//   "/what-we-do": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={oppHero} alt="What We Do" className="relative" />
//           <img
//             src={lightgreenshadow}
//             alt="lightgreenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">What We Do</h1>
//     ),
//     subtitle: (
//       <span className="text-[10px] md:text-[16px]">
//         Transformative experiences that connect people with adventure and culture
//       </span>
//     ),
//     imageClass: "sm:h-[60vh] lg:h-[60vh] md:h-[20vh]",
//   },

//   "/wild-weekend": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={wwHero} alt="wwHero" className="relative" />
//           <img
//             src={lightgreenshadow}
//             alt="lightgreenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">Wild Weekend</h1>
//     ),
//     subtitle: (
//       <span className="text-[10px] md:text-[16px]">Your escape into nature, connection, and unforgettable memories</span>
//     ),
//     imageClass: "sm:h-[60vh] lg:h-[60vh] md:h-[20vh]",
//   },

//   "/wild-trip": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={wtHero} alt="wtHero" className="relative" />
//           <img
//             src={greenshadow}
//             alt="greenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30 ">Wild Trip</h1>
//     ),
//     subtitle: (
//       <span>From deserts to glaciers – trips that change your perspective.</span>
//     ),
//     imageClass: "sm:h-[60vh] lg:h-[60vh] md:h-[20vh]"
//   },

//   "/erasmus-plus": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={erasmusHero} alt="erasmusHero" className="relative" />
//           <img
//             src={lightgreenshadow}
//             alt="lightgreenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">Erasmus +</h1>
//     ),
//     subtitle: (
//       <span>Discover, connect, and learn with Erasmus+ journeys.</span>
//     ),
//     imageClass: 'sm:h-[60vh] lg:h-[60vh] md:h-[20vh]',
//     // downloadimg: downloadimg
//   },

//   "/internal-events": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={InternalEvents} alt="InternalEvents" className="relative" />
//           <img
//             src={lightgreenshadow}
//             alt="lightgreenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">Internal events</h1>
//     ),
//     subtitle: (
//       <span>Building connections, sharing moments, growing together.</span>
//     ),
//     imageClass: 'sm:h-[60vh] lg:h-[60vh] md:h-[20vh]',
//     // downloadimg: downloadimg
//   },

//   "/about": {
//     image: (
//       <>
//         <div className="relative bg-linear-to-r from-[#F0F5FD]/18 to-[#F0F5FD]">
//           <img src={About} alt="About" className="relative" />
//           <img
//             src={lightgreenshadow}
//             alt="lightgreenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">About US</h1>
//     ),
//     subtitle: (
//       <span className="text-[10px] lg:text-xl">Discover extraordinary experiences, <br className="lg:flex hidden" /> connect with fellow adventurers, and create memories that last a lifetime with Proactive Future.</span>
//     ),
//     imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
//     // downloadimg: downloadimg
//   },

//   "/member": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={Member} alt="Member" className="relative" />
//           <img
//             src={lightgreenshadow}
//             alt="lightgreenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="md:flex hidden bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-10">Become a Member</h1>
//     ),
//     subtitle: (
//       <span className="text-[12px] md:flex hidden">Unlock exclusive benefits and join our travel community of adventurous souls exploring the world together.</span>
//     ),
//     imageClass: 'sm:h-[38vh] lg:h-[60vh] md:h-[20vh]',
//     // downloadimg: downloadimg
//     buttons: (
//       [
//         {
//           text: 'Join Now for €50',
//           className: "lg:mt-4 md:mt-0 mt-30 bg-[#0DAC87] hover:bg-[#0f9e7d] cursor-pointer rounded-full px-2 py-1 md:py-3 md:px-5 font-medium text-sm md:text-base",
//           openModal: true,
//         },
//       ]
//     )
//   },

//   "/travel-coordinator": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={TravelCoordinatore} alt="TravelCoordinatore" className="relative" />
//           <img
//             src={lightgreenshadow}
//             alt="lightgreenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl text-nowrap lg:mt-30 md:mt-0 mt-30">Our Travel Coordinators</h1>
//     ),
//     subtitle: (
//       <span className="lg:text-[16px] text-[10px]">The passionate travelers who turn every trip into an unforgettable journey</span>
//     ),
//     imageClass: 'sm:h-[38vh] lg:h-[40vh] md:h-[20vh]',
//     // downloadimg: downloadimg
//   },

//   "/advantages": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={advantages} alt="advantages" className="relative" />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className=" bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[16px] md:text-7xl text-nowrap lg:mt-50 mt-50">Advantages</h1>
//     ),
//     imageClass: 'sm:h-[38vh] lg:h-[66vh] md:h-[28vh]',
//     downloadimg: downloadimg,
//   },

//   "/contact": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={contact} alt="contact" className="relative" />
//           <img
//             src={lightgreenshadow}
//             alt="lightgreenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[16px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-40">Contact</h1>
//     ),
//     imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
//     // downloadimg: downloadimg
//   },

//   "/faq": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={faq} alt="faq" className="relative" />
//           <img
//             src={lightgreenshadow}
//             alt="lightgreenshadow"
//             className="absolute inset-0 z-0"
//           />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-30">Frequently Asked Questions</h1>
//     ),
//     imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
//   },

//   "/privacy-policy": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={faq} alt="Privacy" className="relative" />
//           <img src={lightgreenshadow} alt="" className="absolute inset-0 z-0" />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-30">Privacy Policy</h1>
//     ),
//     imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
//   },

//   "/terms": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={faq} alt="Terms" className="relative" />
//           <img src={lightgreenshadow} alt="" className="absolute inset-0 z-0" />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-30">Terms of Services</h1>
//     ),
//     imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
//   },

//   "/cookie-policy": {
//     image: (
//       <>
//         <div className="relative">
//           <img src={faq} alt="Cookie Policy" className="relative" />
//           <img src={lightgreenshadow} alt="" className="absolute inset-0 z-0" />
//         </div>
//       </>
//     ),
//     title: (
//       <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-30">Cookie Policy</h1>
//     ),
//     imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
//   },

// };

// const HeroSection = () => {
//   const location = useLocation();
//   const path = location.pathname;
//   const hero = heroData[path];

//   if (!hero) return null;

//   return (
//     <div key={path} className={`relative w-full ${hero.imageClass}`}>
//       <div className="w-full object-cover absolute inset-0 z-0">
//         {hero.image}
//       </div>
//       {/* Text */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
//         <div className="text-xl md:text-4xl font-bold">{hero.title}</div>
//         <p className="text-xs md:text-lg lg:mt-4">{hero.subtitle}</p>
//         {hero.buttons && (
//           <div className="flex md:flex-row gap-4 md:mt-4 mt-2">
//             {hero.buttons.map((button, index) =>
//               button.openModal ? (
//                 <Dialog key={index}>
//                   <DialogTrigger asChild>
//                     <button className={button.className}>
//                       {button.text}
//                     </button>
//                   </DialogTrigger>
//                   <PaymentModal />
//                 </Dialog>
//               ) : (
//                 <button key={index} className={button.className}>
//                   {button.text}
//                 </button>
//               )
//             )}
//           </div>
//         )}
//         {hero.downloadimg && (
//           <div className="hidden absolute right-24 -bottom-31 lg:flex md:flex-row gap-4 md:mt-4 mt-2">
//             <img src={hero.downloadimg} alt="Download" className="w-16" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



import carousel from "../../../assets/Group 1410091220.png"
import oppHero from "../../../assets/openoppurtunities.png"
import downloadimg from "../../../assets/Download.png"
import wwHero from "../../../assets/wildweekend.png"
import wtHero from "../../../assets/wildtrip.png"
import erasmusHero from "../../../assets/Erasmus+.png"
import InternalEvents from "../../../assets/Internalevents.png"
import {useLocation} from "react-router-dom";
import greenshadow from "../../../assets/greenshadow.png"
import lightgreenshadow from "../../../assets/lightgreenshadow.png"
import About from "../../../assets/About.png"
import Member from "../../../assets/BecomeMember.png"
import TravelCoordinatore from "../../../assets/Travelcoordinator.png"
import advantages from "../../../assets/benefits.png"
import contact from "../../../assets/Contact.png"
import faq from "../../../assets/FAQ.png"
import type { JSX } from "react";
import type React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PaymentModal from "@/components/userDashboard/Alert/PaymentModal";
import { useTranslation } from "react-i18next";

interface HeroContent {
  image: React.ReactNode;
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  imageClass: string;
  buttons?: {
    text: string;
    className: string;
    openModal?: boolean;
  }[];
  downloadimg?: string;
  CTA?: string | JSX.Element;
}

const getHeroData = (t: (key: string) => string): Record<string, HeroContent> => ({
  "/": {
    image: (
      <div className="bg-linear-to-r from-[#F0F5FD]/18 to-[#F0F5FD]">
        <img  src={carousel} 
    alt="carousel" 
    className="w-full h-full object-cover object-center md:object-top"
 />
      </div>
    ),
    title: (
      <div className="flex flex-wrap justify-center items-center lg:mt-2 md:mt-[240px]  sm:mt-[50px] mt-[290px]">
        <span className="text-white font-bold text-[14px] md:text-4xl text-nowrap lg:mt-12 ">
          {t('hero.yourNext')}
        </span>
        <div className="flex items-center justify-center">
          <span className="text-[14px] lg:text-8xl md:text-4xl font-extrabold bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text">
            {t('hero.adventure').split(' ')[0]}
          </span>
          <span className="text-[14px] lg:text-8xl md:text-4xl font-extrabold text-stroke md:mb-8">
            E
          </span>
          <span className="text-[14px] lg:text-8xl md:text-4xl font-extrabold text-stroke md:mt-4">
            N
          </span>
          <span className="text-[14px] lg:text-8xl md:text-4xl font-extrabold bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text">
            TURE
          </span>
        </div>
        <span className="text-white font-bold text-[14px] md:text-4xl text-nowrap lg:mt-12">
          {t('hero.awaits')}
        </span>
      </div>
    ),
    subtitle: (
      <span className="text-[12px] md:text-lg" dangerouslySetInnerHTML={{ __html: t('hero.subtitle').replace(/\n/g, '<br className="lg:block hidden" />') }} />
    ),
    imageClass: "sm:h-[70vh] lg:h-[100vh] md:h-[30vh]",
    buttons: [
      {
        text: t('hero.joinAdventure'),
        className:
          "bg-[#0DAC87] hover:bg-[#0f9e7d] cursor-pointer rounded-full px-4 py-2 md:py-3 md:px-7 font-medium text-sm md:text-base",
      },
      {
        text: t('hero.getToKnowUs'),
        className:
          "bg-[#FFFFFF] hover:bg-[#e7d9d9] cursor-pointer rounded-full px-4 py-3 md:py-3 md:px-7 text-[#000000] font-medium text-sm lg:text-base",
      },
    ],
    // downloadimg: downloadimg
  },

  "/open-oppurtunities": {
    image: (
      <>
        <div className="relative">
          <img src={oppHero} alt="oppHero" className="relative" />
          <img
            src={greenshadow}
            alt="greenshadow"
            // className="absolute inset-0 z-0"
            className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-bold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">{t('hero.openOpportunitiesTitle')}</h1>
    ),
    subtitle: (
      <span className="text-[10px] md:text-[16px]">
        {t('hero.openOpportunitiesSubtitle')}
      </span>
    ),
    imageClass: "sm:h-[60vh] lg:h-[60vh] md:h-[20vh]",
  },

  "/what-we-do": {
    image: (
      <>
        <div className="relative">
          <img src={oppHero} alt="What We Do" className="relative" />
          <img
            src={lightgreenshadow}
            alt="lightgreenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">{t('hero.whatWeDoTitle')}</h1>
    ),
    subtitle: (
      <span className="text-[10px] md:text-[16px]">
        {t('hero.whatWeDoSubtitle')}
      </span>
    ),
    imageClass: "sm:h-[60vh] lg:h-[60vh] md:h-[20vh]",
  },

  "/wild-weekend": {
    image: (
      <>
        <div className="relative">
          <img src={wwHero} alt="wwHero" className="relative" />
          <img
            src={lightgreenshadow}
            alt="lightgreenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">{t('hero.wildWeekendTitle')}</h1>
    ),
    subtitle: (
      <span className="text-[10px] md:text-[16px]">{t('hero.wildWeekendSubtitle')}</span>
    ),
    imageClass: "sm:h-[60vh] lg:h-[60vh] md:h-[20vh]",
  },

  "/wild-trip": {
    image: (
      <>
        <div className="relative">
          <img src={wtHero} alt="wtHero" className="relative" />
          <img
            src={greenshadow}
            alt="greenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30 ">{t('hero.wildTripTitle')}</h1>
    ),
    subtitle: (
      <span>{t('hero.wildTripSubtitle')}</span>
    ),
    imageClass: "sm:h-[60vh] lg:h-[60vh] md:h-[20vh]"
  },

  "/erasmus-plus": {
    image: (
      <>
        <div className="relative">
          <img src={erasmusHero} alt="erasmusHero" className="relative" />
          <img
            src={lightgreenshadow}
            alt="lightgreenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">{t('hero.erasmusPlusTitle')}</h1>
    ),
    subtitle: (
      <span>{t('hero.erasmusPlusSubtitle')}</span>
    ),
    imageClass: 'sm:h-[60vh] lg:h-[60vh] md:h-[20vh]',
    // downloadimg: downloadimg
  },

  "/internal-events": {
    image: (
      <>
        <div className="relative">
          <img src={InternalEvents} alt="InternalEvents" className="relative" />
          <img
            src={lightgreenshadow}
            alt="lightgreenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">Internal events</h1>
    ),
    subtitle: (
      <span>Building connections, sharing moments, growing together.</span>
    ),
    imageClass: 'sm:h-[60vh] lg:h-[60vh] md:h-[20vh]',
    // downloadimg: downloadimg
  },

  "/about": {
    image: (
      <>
        <div className="relative bg-linear-to-r from-[#F0F5FD]/18 to-[#F0F5FD]">
          <img src={About} alt="About" className="relative" />
          <img
            src={lightgreenshadow}
            alt="lightgreenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-30">{t('hero.aboutUsTitle')}</h1>
    ),
    subtitle: (
      <span className="text-[10px] lg:text-xl" dangerouslySetInnerHTML={{ __html: t('hero.aboutUsSubtitle').replace(/\n/g, '<br className="lg:flex hidden" />') }} />
    ),
    imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
    // downloadimg: downloadimg
  },

  "/member": {
    image: (
      <>
        <div className="relative">
          <img src={Member} alt="Member" className="relative" />
          <img
            src={lightgreenshadow}
            alt="lightgreenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="md:flex hidden bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-10">{t('hero.becomeMemberTitle')}</h1>
    ),
    subtitle: (
      <span className="text-[12px] md:flex hidden">{t('hero.becomeMemberSubtitle')}</span>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[60vh] md:h-[20vh]',
    // downloadimg: downloadimg
    buttons: (
      [
        {
          text: t('hero.joinNowFor'),
          className: "lg:mt-4 md:mt-0 mt-30 bg-[#0DAC87] hover:bg-[#0f9e7d] cursor-pointer rounded-full px-2 py-1 md:py-3 md:px-5 font-medium text-sm md:text-base",
          openModal: true,
        },
      ]
    )
  },

  "/travel-coordinator": {
    image: (
      <>
        <div className="relative">
          <img src={TravelCoordinatore} alt="TravelCoordinatore" className="relative" />
          <img
            src={lightgreenshadow}
            alt="lightgreenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl text-nowrap lg:mt-30 md:mt-0 mt-30">{t('hero.travelCoordinatorTitle')}</h1>
    ),
    subtitle: (
      <span className="lg:text-[16px] text-[10px]">{t('hero.travelCoordinatorSubtitle')}</span>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[40vh] md:h-[20vh]',
    // downloadimg: downloadimg
  },

  "/advantages": {
    image: (
      <>
        <div className="relative">
          <img src={advantages} alt="advantages" className="relative" />
        </div>
      </>
    ),
    title: (
      <h1 className=" bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[16px] md:text-7xl text-nowrap lg:mt-50 mt-50">{t('hero.advantagesTitle')}</h1>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[66vh] md:h-[28vh]',
    downloadimg: downloadimg,
  },

  "/contact": {
    image: (
      <>
        <div className="relative">
          <img src={contact} alt="contact" className="relative" />
          <img
            src={lightgreenshadow}
            alt="lightgreenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[16px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-40">{t('hero.contactTitle')}</h1>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
    // downloadimg: downloadimg
  },

  "/faq": {
    image: (
      <>
        <div className="relative">
          <img src={faq} alt="faq" className="relative" />
          <img
            src={lightgreenshadow}
            alt="lightgreenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-30">{t('hero.faqTitle')}</h1>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
  },

  "/privacy-policy": {
    image: (
      <>
        <div className="relative">
          <img src={faq} alt="Privacy" className="relative" />
          <img src={lightgreenshadow} alt="" className="absolute inset-0 z-0" />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-30">{t('hero.privacyPolicyTitle')}</h1>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
  },

  "/terms": {
    image: (
      <>
        <div className="relative">
          <img src={faq} alt="Terms" className="relative" />
          <img src={lightgreenshadow} alt="" className="absolute inset-0 z-0" />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-30">{t('hero.termsTitle')}</h1>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
  },

  "/cookie-policy": {
    image: (
      <>
        <div className="relative">
          <img src={faq} alt="Cookie Policy" className="relative" />
          <img src={lightgreenshadow} alt="" className="absolute inset-0 z-0" />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-30">{t('hero.cookiePolicyTitle')}</h1>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
  },

});

const HeroSection = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const path = location.pathname;
  const hero = getHeroData(t)[path];

  const scrollDown = () => {
    window.scrollBy({
      top: 2000, // scroll 1 screen down
      behavior: "smooth",
    });
  };
  
  

  if (!hero) return null;

  return (
    <div key={path} className={`relative w-full ${hero.imageClass}`}>
      <div className="w-full object-cover absolute inset-0 z-0">
        {hero.image}
      </div>
      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <div className="text-xl md:text-4xl font-bold">{hero.title}</div>
        <p className="text-xs md:text-lg lg:mt-4">{hero.subtitle}</p>
        {hero.buttons && (
          <div className="flex md:flex-row gap-4 md:mt-4 mt-2">
            {hero.buttons.map((button, index) =>
              button.openModal ? (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <button className={button.className}>
                      {button.text}
                    </button>
                  </DialogTrigger>
                  <PaymentModal />
                </Dialog>
              ) : (
                <button key={index} className={button.className}>
                  {button.text}
                </button>
              )
            )}
          </div>
        )}
        {hero.downloadimg && (
          <div className="hidden absolute right-24 -bottom-31 lg:flex md:flex-row gap-4 md:mt-4 mt-2">
            <img src={hero.downloadimg} alt="Download" className="w-16" />
          </div>
        )}
      </div>
      {/*just a div to scroll down*/}
      <div className="absolute bottom-[-38px]  opacity-100 left-[85%] right-[500px] w-full h-20   cursor-pointer" onClick={scrollDown}> </div>
    </div>
  );
};

export default HeroSection;