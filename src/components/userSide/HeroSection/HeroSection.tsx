import { useLocation } from "react-router-dom";
import carousel from "../../../assets/carousel.png"
import oppHero from "../../../assets/openoppurtunities.png"
import downloadimg from "../../../assets/Download.png"
import wwHero from "../../../assets/wildweekend.png"
import wtHero from "../../../assets/wildtrip.png"
import erasmusHero from "../../../assets/Erasmus+.png"
import InternalEvents from "../../../assets/Internalevents.png"
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

interface HeroContent {
  image: React.ReactNode;
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  imageClass: string;
  buttons?: {
    text: string;
    className: string;
  }[];
  downloadimg?: string;
  CTA?: string | JSX.Element;
}
const heroData: Record<string, HeroContent> = {
  "/": {
    image: (
      <div className="bg-linear-to-r from-[#F0F5FD]/18 to-[#F0F5FD]">
        <img src={carousel} alt="carousel" />
      </div>
    ),
    title: (
      <div className="flex flex-wrap justify-center items-center md:mt-30 mt-70">
        <span className="text-white font-bold text-[14px] md:text-4xl text-nowrap lg:mt-12 ">
          Your Next
        </span>
        <div className="flex items-center justify-center">
          <span className="text-[14px] lg:text-8xl md:text-4xl font-extrabold bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text">
            ADV
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
          Awaits
        </span>
      </div>
    ),
    subtitle: (
      <span className="text-[12px] md:text-lg">
        Discover extraordinary experiences,<br className="lg:block hidden" />
        connect with fellow adventurers, and create memories that last a
        lifetime with Proactive Future.
      </span>
    ),
    imageClass: "sm:h-[70vh] lg:h-[100vh] md:h-[30vh] h-[50vh]",
    buttons: [
      {
        text: "Join the Adventure",
        className:
          "bg-[#0DAC87] hover:bg-[#0f9e7d] cursor-pointer rounded-full px-4 py-3 md:py-3 md:px-7 font-medium text-sm md:text-base",
      },
      {
        text: "Get to Know Us",
        className:
          "bg-[#FFFFFF] hover:bg-[#e7d9d9] cursor-pointer rounded-full px-4 py-3 md:py-3 md:px-7 text-[#000000] font-medium text-sm lg:text-base",
      },
    ],
    downloadimg: downloadimg
  },

  "/open-oppurtunities": {
    image: (
      <>
        <div className="relative">
          <img src={oppHero} alt="oppHero" className="relative" />
          <img
            src={greenshadow}
            alt="greenshadow"
            className="absolute inset-0 z-0"
          />
        </div>
      </>
    ),
    title: (
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-bold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-40">Open Opportunities</h1>
    ),
    subtitle: (
      <span className="text-[10px] md:text-[16px]">
        Discover amazing destinations and join our community of adventurers
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-40">Wild Weekend</h1>
    ),
    subtitle: (
      <span className="text-[10px] md:text-[16px]">Your escape into nature, connection, and unforgettable memories</span>
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-40 ">Wild Trip</h1>
    ),
    subtitle: (
      <span>From deserts to glaciers – trips that change your perspective.</span>
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-6xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-40 ">Erasmus +</h1>
    ),
    subtitle: (
      <span>Discover, connect, and learn with Erasmus+ journeys.</span>
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-40 ">Internal events</h1>
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-40 ">About US</h1>
    ),
    subtitle: (
      <span className="text-[12px] lg:text-xl">Discover extraordinary experiences, <br className="lg:flex hidden" /> connect with fellow adventurers, and create memories that last a lifetime with Proactive Future.</span>
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
      <h1 className="md:flex hidden bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-12 md:mt-10 mt-40">Become a Member</h1>
    ),
    subtitle: (
      <span className="text-[12px] md:flex hidden">Unlock exclusive benefits and join our travel community of adventurous souls exploring the world together.</span>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[60vh] md:h-[20vh]',
    // downloadimg: downloadimg
    buttons: (
      [
        {
          text: 'Join Now for €50',
          className:
            "lg:mt-4 md:mt-0 mt-40 bg-[#0DAC87] hover:bg-[#0f9e7d] cursor-pointer rounded-full px-2 py-1 md:py-3 md:px-5 font-medium text-sm md:text-base",
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
      <h1 className="md:flex hidden bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl text-nowrap lg:mt-30 md:mt-0 mt-40">Our Travel Coordinators</h1>
    ),
    subtitle: (
      <span className="text-[16px] md:flex hidden">The passionate travelers who turn every trip into an unforgettable journey</span>
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
      <h1 className="md:flex hidden bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] md:text-7xl text-nowrap lg:mt-50 mt-20">Advantages</h1>
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-40">Contact</h1>
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] lg:text-7xl md:text-2xl text-nowrap lg:mt-30 md:mt-10 mt-40">Frequently Asked Questions</h1>
    ),
    imageClass: 'sm:h-[38vh] lg:h-[50vh] md:h-[20vh]',
    // downloadimg: downloadimg
  },

};
const HeroSection = () => {
  const location = useLocation();
  const path = location.pathname;
  const hero = heroData[path];

  if (!hero) return null;

  return (
    <div key={path} className={`relative w-full ${hero.imageClass}`}>
      <div className="w-full object-cover absolute inset-0 z-0">
        {hero.image}
      </div>
      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-xl md:text-4xl font-bold">{hero.title}</h1>
        <p className="text-xs md:text-lg lg:mt-4">{hero.subtitle}</p>
        {hero.buttons && (
          <div className="flex md:flex-row flex-col gap-4 md:mt-4 mt-2">
            {hero.buttons.map((button, index) => (
              <button key={index} className={button.className}>
                {button.text}
              </button>
            ))}
          </div>
        )}
        {hero.downloadimg && (
          <div className="hidden absolute right-24 -bottom-31 lg:flex md:flex-row gap-4 md:mt-4 mt-2">
            <img src={hero.downloadimg} alt="Download" className="w-16" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
