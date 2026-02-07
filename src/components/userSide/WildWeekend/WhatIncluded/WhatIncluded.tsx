import {
  Bed,
  UtensilsCrossed,
  Bus,
  Ticket,
  Users,
  Sparkles,
} from "lucide-react";

const PINK_ICON = "#D81B60";
const PURPLE_ICON = "#7C3AED";

const items = [
  {
    icon: Bed,
    text: "Alojamiento compartido",
    color: PINK_ICON,
  },
  {
    icon: UtensilsCrossed,
    text: "Comidas (desayuno, comida y cena)",
    color: PINK_ICON,
  },
  {
    icon: Bus,
    text: "Transporte a las actividades",
    color: PINK_ICON,
  },
  {
    icon: Ticket,
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
    <section className="w-full bg-neutral-100 py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-neutral-800 mb-12 lg:mb-16">
          ¿Qué incluye un viaje con Proactive Future?
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
