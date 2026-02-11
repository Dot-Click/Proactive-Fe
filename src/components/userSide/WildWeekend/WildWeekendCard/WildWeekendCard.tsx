import React from "react";
import { MapPin, Plane, UserCheck, Users, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

// New color palette - no red/purple
const COLORS = {
  yellow: "#f7cb0b",
  blue: "#2fabe9",
  teal: "#00828f",
  olive: "#96a53a",
  offWhite: "#f2f2f5",
  black: "#000000",
  // Light versions
  lightYellow: "#fef7d0",
  lightBlue: "#d5eefb",
  lightTeal: "#ccf0f3",
  lightOlive: "#e8eed0",
};

const getSteps = (t: (key: string) => string) => [
  {
    icon: MapPin,
    title: t('wildWeekend.chooseDestination'),
    description: t('wildWeekend.chooseDestinationDesc'),
    emoji: "🌍",
    color: COLORS.yellow,
    bgColor: COLORS.lightYellow,
  },
  {
    icon: Plane,
    title: t('wildWeekend.bookFlights'),
    description: t('wildWeekend.bookFlightsDesc'),
    emoji: "✈️",
    color: COLORS.blue,
    bgColor: COLORS.lightBlue,
  },
  {
    icon: UserCheck,
    title: t('wildWeekend.expertCoordinator'),
    description: t('wildWeekend.expertCoordinatorDesc'),
    emoji: "🚩",
    color: COLORS.teal,
    bgColor: COLORS.lightTeal,
  },
  {
    icon: Users,
    title: t('wildWeekend.similarAgeGroups'),
    description: t('wildWeekend.similarAgeGroupsDesc'),
    emoji: "",
    color: COLORS.olive,
    bgColor: COLORS.lightOlive,
  },
  {
    icon: Globe,
    title: t('wildWeekend.enjoyBestTrip'),
    description: t('wildWeekend.enjoyBestTripDesc'),
    emoji: "💗",
    color: COLORS.teal,
    bgColor: COLORS.lightTeal,
  },
];

const WildWeekendCard = () => {
  const { t } = useTranslation();
  const STEPS = getSteps(t);
  return (
    <section className="w-full px-4 py-8 lg:py-12" style={{ backgroundColor: COLORS.offWhite }}>
      <div className="mx-auto max-w-[1280px]">
        {/* Main Section Header - Reduced spacing */}
        <h2 className="mb-6 text-center text-2xl lg:text-3xl font-bold" style={{ color: COLORS.black }}>
          {t('wildWeekend.howItWorks')}
        </h2>

        {/* Colorful Cards - More friendly and colorful design */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <React.Fragment key={index}>
                <article 
                  className="flex flex-1 flex-col items-center px-4 py-6 text-center rounded-2xl transition-transform hover:scale-105"
                  style={{ backgroundColor: step.bgColor }}
                >
                  {/* Outline Icon - No background, just colored stroke */}
                  <div className="mb-4 flex items-center justify-center">
                    <Icon
                      size={48}
                      strokeWidth={2}
                      fill="none"
                      style={{ color: step.color }}
                    />
                  </div>

                  {/* Step Title */}
                  <h3 className="mb-2 text-base lg:text-lg font-bold tracking-tight" style={{ color: COLORS.black }}>
                    {step.title} {step.emoji && <span>{step.emoji}</span>}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm leading-relaxed" style={{ color: "#4A5568" }}>
                    {step.description}
                  </p>
                </article>

                {/* Vertical Divider - Only visible on desktop between items */}
                {!isLast && (
                  <div
                    className="hidden w-[1px] lg:block"
                    style={{ backgroundColor: COLORS.offWhite, margin: "10px 0" }}
                  />
                )}
                {/* Horizontal Divider for mobile */}
                {!isLast && (
                  <div className="h-[1px] w-full lg:hidden" style={{ backgroundColor: COLORS.offWhite }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WildWeekendCard;





// import React from "react";
// import { MapPin, Plane, UserCheck, Users, Globe } from "lucide-react";
// import { useTranslation } from "react-i18next";

// // Exact colors from the image
// const ACCENT_COLOR = "#D63384"; // The pink/magenta used for icons

// const getSteps = (t: (key: string) => string) => [
//   {
//     icon: MapPin,
//     title: t('wildWeekend.chooseDestination'),
//     description: t('wildWeekend.chooseDestinationDesc'),
//     emoji: "🌍",
//   },
//   {
//     icon: Plane,
//     title: t('wildWeekend.bookFlights'),
//     description: t('wildWeekend.bookFlightsDesc'),
//     emoji: "✈️",
//   },
//   {
//     icon: UserCheck,
//     title: t('wildWeekend.expertCoordinator'),
//     description: t('wildWeekend.expertCoordinatorDesc'),
//     emoji: "🚩",
//   },
//   {
//     icon: Users,
//     title: t('wildWeekend.similarAgeGroups'),
//     description: t('wildWeekend.similarAgeGroupsDesc'),
//     emoji: "",
//   },
//   {
//     icon: Globe,
//     title: t('wildWeekend.enjoyBestTrip'),
//     description: t('wildWeekend.enjoyBestTripDesc'),
//     emoji: "💗",
//   },
// ];

// const WildWeekendCard = () => {
//   const { t } = useTranslation();
//   const STEPS = getSteps(t);
//   return (
//     <section className="w-full px-4 py-16 lg:py-24">
//       <div className="mx-auto max-w-[1280px]">
//         {/* Main Section Header */}
//         <h2 className="mb-12 text-center text-[32px] font-bold text-[#2D3748] lg:mb-16">
//           {t('wildWeekend.howItWorks')}
//         </h2>

//         {/* The Single Content Card - Exactly as per image_01ba18.png */}
//         <div className="overflow-hidden rounded-[40px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:p-14">
//           <div className="flex flex-col lg:flex-row lg:items-stretch">
//             {STEPS.map((step, index) => {
//               const Icon = step.icon;
//               const isLast = index === STEPS.length - 1;

//               return (
//                 <React.Fragment key={index}>
//                   <article className="flex flex-1 flex-col items-center px-4 py-8 text-center lg:py-0">
//                     {/* Icon Circle - Thin Border, Centered Icon */}
//                     <div className="mb-8 flex h-[84px] w-[84px] items-center justify-center rounded-full border border-[#FADDE9] bg-white">
//                       <Icon
//                         size={36}
//                         strokeWidth={1.2}
//                         style={{ color: ACCENT_COLOR }}
//                       />
//                     </div>

//                     {/* Step Title */}
//                     <h3 className="mb-4 text-lg font-bold tracking-tight text-[#1A202C]">
//                       {step.title} {step.emoji && <span>{step.emoji}</span>}
//                     </h3>

//                     {/* Step Description */}
//                     <p className="text-[14.5px] leading-[1.6] text-[#4A5568]">
//                       {step.description}
//                     </p>
//                   </article>

//                   {/* Vertical Divider - Only visible on desktop between items */}
//                   {!isLast && (
//                     <div
//                       className="hidden w-[1px] bg-[#E2E8F0] lg:block"
//                       style={{ margin: "20px 0" }}
//                     />
//                   )}
//                   {/* Horizontal Divider for mobile */}
//                   {!isLast && (
//                     <div className="h-[1px] w-full bg-[#E2E8F0] lg:hidden" />
//                   )}
//                 </React.Fragment>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WildWeekendCard;
