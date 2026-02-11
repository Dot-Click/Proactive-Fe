import {
  Bed,
  UtensilsCrossed,
  Bus,
  Compass,
  Users,
  Sparkles,
} from "lucide-react";

const RED_ICON = "#E63946"; // Red color for top row
const PURPLE_ICON = "#7C3AED"; // Purple color for bottom row

const ITEMS = [
  {
    icon: Bed,
    text: "Alojamiento compartido",
    color: RED_ICON,
  },
  {
    icon: UtensilsCrossed,
    text: "Comidas (desayuno, comida y cena)",
    color: RED_ICON,
  },
  {
    icon: Bus,
    text: "Transporte a las actividades",
    color: RED_ICON,
  },
  {
    icon: Compass,
    text: "Participar en todas actividades",
    color: PURPLE_ICON,
  },
  {
    icon: Users,
    text: "Equipo coordinador",
    color: PURPLE_ICON,
  },
  {
    icon: Sparkles,
    text: "Básicamente desde que estás con nosotros: TODO.",
    color: PURPLE_ICON,
  },
];

const WhatIncluded = () => {
  return (
    <section className="w-full bg-neutral-100 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-neutral-800 mb-10 lg:mb-12">
          ¿Qué incluye un viaje con Proactive Future?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {ITEMS.map(({ icon: Icon, text, color }, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4"
            >
              {/* Outline icon - no background */}
              <Icon
                className="w-16 h-16 lg:w-20 lg:h-20 shrink-0"
                strokeWidth={2}
                stroke={color}
                fill="none"
                aria-hidden
              />
              <p className="text-neutral-800 text-sm lg:text-base font-normal leading-relaxed max-w-xs">
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
