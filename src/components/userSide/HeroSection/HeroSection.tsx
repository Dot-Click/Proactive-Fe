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
import type { JSX } from "react";
import type React from "react";

interface HeroContent {
  image: React.ReactNode;
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
  imageClass: string;
  buttons?: {
    text: string;
    className: string;
  }[];
  downloadimg?: string
}

const heroData: Record<string, HeroContent> = {
  "/": {
    image: <img src={carousel} alt="carousel" />,
    title: (
      <div className="flex flex-wrap justify-center items-center md:mt-30 mt-70">
        <span className="text-white font-bold text-[14px] md:text-4xl text-nowrap md:mt-12 ">
          Your Next
        </span>
        <div className="flex items-center justify-center">
          <span className="text-[14px] lg:text-8xl font-extrabold text-stroke-1 text-transparent bg-clip-text bg-linear-to-b from-[#F7ECBE] to-[#F7ECBE]">
            ADV
          </span>
          <span className="text-[14px] lg:text-8xl font-extrabold text-stroke md:-translate-y-2">
            E
          </span>
          <span className="text-[14px] lg:text-8xl font-extrabold text-stroke md:-translate-y-2">
            N
          </span>
          <span className="text-[14px] lg:text-8xl font-extrabold text-stroke-1 text-transparent bg-clip-text bg-linear-to-b from-[#F7ECBE] to-[#F7ECBE]">
            TURE
          </span>
        </div>
        <span className="text-white font-bold text-[14px] md:text-4xl text-nowrap md:mt-12">
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
    imageClass: "sm:h-[70vh] lg:h-[100vh]",
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-bold text-[14px] md:text-6xl text-nowrap md:mt-12 mt-40">Open Opportunities</h1>
    ),
    subtitle: (
      <span className="text-[10px] md:text-[16px]">
        Discover amazing destinations and join our community of adventurers
      </span>
    ),
    imageClass: "sm:h-[60vh] lg:h-[60vh]",
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] md:text-6xl text-nowrap lg:mt-12 md:mt-0 mt-40 ">Wild Weekend</h1>
    ),
    subtitle: (
      <span className="text-[10px] md:text-[16px]">Your escape into nature, connection, and unforgettable memories</span>
    ),
    imageClass: "sm:h-[60vh] lg:h-[60vh]",
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] md:text-6xl text-nowrap lg:mt-12 md:mt-0 mt-40 ">Wild Trip</h1>
    ),
    subtitle: (
      <span>From deserts to glaciers – trips that change your perspective.</span>
    ),
    imageClass: "sm:h-[60vh] lg:h-[60vh] "
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] md:text-6xl text-nowrap lg:mt-12 md:mt-0 mt-40 ">Erasmus +</h1>
    ),
    subtitle: (
      <span>Discover, connect, and learn with Erasmus+ journeys.</span>
    ),
    imageClass: 'sm:h-[60vh] lg:h-[60vh]',
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
      <h1 className="bg-linear-to-b from-[#F7ECBE] from-60% to-[#F7ECBE]/18 text-transparent bg-clip-text font-extrabold text-[14px] md:text-7xl text-nowrap lg:mt-12 md:mt-0 mt-40 ">Internal events</h1>
    ),
    subtitle: (
      <span>Building connections, sharing moments, growing together.</span>
    ),
    imageClass: 'sm:h-[60vh] lg:h-[60vh]',
    // downloadimg: downloadimg
  }
};
const HeroSection = () => {
  const location = useLocation();
  const path = location.pathname;
  const hero = heroData[path];

  if (!hero) return null;

  return (
    <div key={path} className={`relative w-full ${hero.imageClass}`}>

      {/* Background Image */}
      {/* <img
        src={hero.image as string}
        alt="hero"
        className="w-full object-cover absolute inset-0 z-0"
      /> */}
      <div className="w-full object-cover absolute inset-0 z-0">
        {hero.image}
      </div>
      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-xl md:text-4xl font-bold">{hero.title}</h1>
        <p className="text-xs md:text-lg lg:mt-4">{hero.subtitle}</p>
        {hero.buttons && (
          <div className="flex md:flex-row gap-4 md:mt-4 mt-2">
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
