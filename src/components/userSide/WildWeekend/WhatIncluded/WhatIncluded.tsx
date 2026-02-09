import {
  Bed,
  UtensilsCrossed,
  Bus,
  Ticket,
  Users,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const PINK_ICON = "#D81B60";
const PURPLE_ICON = "#7C3AED";

const getItems = (t: (key: string) => string) => [
  {
    icon: Bed,
    text: t('wildWeekend.whatIncluded.sharedAccommodation'),
    color: PINK_ICON,
  },
  {
    icon: UtensilsCrossed,
    text: t('wildWeekend.whatIncluded.meals'),
    color: PINK_ICON,
  },
  {
    icon: Bus,
    text: t('wildWeekend.whatIncluded.transport'),
    color: PINK_ICON,
  },
  {
    icon: Ticket,
    text: t('wildWeekend.whatIncluded.activities'),
    color: PURPLE_ICON,
  },
  {
    icon: Users,
    text: t('wildWeekend.whatIncluded.coordinatorTeam'),
    color: PURPLE_ICON,
  },
  {
    icon: Sparkles,
    text: t('wildWeekend.whatIncluded.everything'),
    color: PURPLE_ICON,
  },
];

const WhatIncluded = () => {
  const { t } = useTranslation();
  const items = getItems(t);
  return (
    <section className="w-full bg-neutral-100 py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-neutral-800 mb-12 lg:mb-16">
          {t('wildWeekend.whatIncluded.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {items.map(({ icon: Icon, text, color }, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4"
            >
              <Icon
                className="w-14 h-14 lg:w-16 lg:h-16 shrink-0"
                strokeWidth={1.5}
                stroke={color}
                fill="none"
                aria-hidden
              />
              <p className="text-neutral-800 text-sm lg:text-base font-normal leading-snug">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIncluded;
