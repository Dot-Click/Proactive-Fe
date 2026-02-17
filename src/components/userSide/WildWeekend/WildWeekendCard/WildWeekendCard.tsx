import React from "react";
import { MapPin, Plane, UserCheck, Users, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

// New color palette - no red/purple
const COLORS = {
  yellow: "#f7cb0b",
  blue: "#2fabe9",
  teal: "#00828f",
  olive: "#96a53a",
  orange: "#f3722c",
  offWhite: "#f2f2f5",
  black: "#000000",
  // Light versions
  lightYellow: "#fef7d0",
  lightBlue: "#d5eefb",
  lightTeal: "#ccf0f3",
  lightOlive: "#e8eed0",
  lightOrange: "#f9e5d9",
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
    icon: Users,
    title: t('wildWeekend.similarAgeGroups'),
    description: t('wildWeekend.similarAgeGroupsDesc'),
    emoji: "🏕️",
    color: COLORS.olive,
    bgColor: COLORS.lightOlive,
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
    icon: Globe,
    title: t('wildWeekend.enjoyBestTrip'),
    description: t('wildWeekend.enjoyBestTripDesc'),
    emoji: "", // Emoji is already in the translation string
    color: COLORS.orange,
    bgColor: COLORS.lightOrange,
  },
];

const WildWeekendCard = () => {
  const { t } = useTranslation();
  const STEPS = getSteps(t);
  return (
    <section className="w-full px-4 py-8 lg:py-16" style={{ backgroundColor: COLORS.offWhite }}>
      <div className="mx-auto max-w-[1280px]">
        {/* Main Section Header */}
        <h2 className="mb-10 text-center text-3xl lg:text-4xl font-bold" style={{ color: COLORS.black }}>
          {t('wildWeekend.howItWorks')}
        </h2>

        {/* Colorful Cards */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <React.Fragment key={index}>
                <article
                  className="flex flex-1 flex-col items-center px-6 py-8 text-center rounded-[30px] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: step.bgColor }}
                >
                  {/* Icon Container */}
                  <div className="mb-6 flex items-center justify-center p-4 rounded-full bg-white/50 shadow-inner">
                    <Icon
                      size={40}
                      strokeWidth={1.5}
                      fill="none"
                      style={{ color: step.color }}
                    />
                  </div>

                  {/* Step Title */}
                  <h3 className="mb-3 text-lg lg:text-xl font-extrabold tracking-tight leading-snug" style={{ color: COLORS.black }}>
                    {step.title} {step.emoji && <span>{step.emoji}</span>}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm lg:text-[15px] leading-relaxed opacity-80" style={{ color: "#2d3748" }}>
                    {step.description}
                  </p>
                </article>

                {/* Vertical Divider for desktop */}
                {!isLast && (
                  <div className="hidden w-[2px] lg:block self-center h-20 opacity-10" style={{ backgroundColor: COLORS.black }} />
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

