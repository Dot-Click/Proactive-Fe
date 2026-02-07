import React from "react";
import { MapPin, Plane, UserCheck, Users, Globe } from "lucide-react";

// Exact colors from the image
const ACCENT_COLOR = "#D63384"; // The pink/magenta used for icons
const TEXT_DARK = "#1A1A1A"; // Heavy black for titles
const TEXT_GRAY = "#4A5568"; // Balanced gray for descriptions
const DIVIDER_COLOR = "#EDF2F7"; // Very light gray for vertical lines

const STEPS = [
  {
    icon: MapPin,
    title: "Elige tu destino",
    description:
      "Descubre nuestras próximas salidas en grupo, puedes elegir por destino, mes o tipo de viaje. Estamos seguros de que tenemos ese viaje con el que llevas tiempo soñando.",
    emoji: "🌍",
  },
  {
    icon: Plane,
    title: "Reserva tus vuelos",
    description:
      "Cuando recibas un email de que tu viaje está 'Confirmado', ¡querrá decir que es oficial, nos vamos de viaje! No incluimos los vuelos, así que tienes total libertad de elección.",
    emoji: "✈️",
  },
  {
    icon: UserCheck,
    title: "Coordinador experto",
    description:
      "En nuestro viaje nos acompañará un coordinador, es un compañero de aventuras más que se encarga de la logística y organización del viaje.",
    emoji: "🚩",
  },
  {
    icon: Users,
    title: "Grupos de edades similares",
    description:
      "El grupo de viaje estará formado por gente de tu edad (25-35 y 35-45 años). De esta manera compartirás la experiencia con gente afin a ti y a tus intereses.",
    emoji: "",
  },
  {
    icon: Globe,
    title: "¡Disfruta del mejor viaje en grupo!",
    description:
      "Conecta con tus nuevos amigos, explora el destino que hayas elegido y emociónate viviendo la experiencia de tu vida, te aseguramos que será inolvidable.",
    emoji: "💗",
  },
];

const WildWeekendCard = () => {
  return (
    <section className="w-full px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        {/* Main Section Header */}
        <h2 className="mb-12 text-center text-[32px] font-bold text-[#2D3748] lg:mb-16">
          ¿Cómo funciona?
        </h2>

        {/* The Single Content Card - Exactly as per image_01ba18.png */}
        <div className="overflow-hidden rounded-[40px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:p-14">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === STEPS.length - 1;

              return (
                <React.Fragment key={index}>
                  <article className="flex flex-1 flex-col items-center px-4 py-8 text-center lg:py-0">
                    {/* Icon Circle - Thin Border, Centered Icon */}
                    <div className="mb-8 flex h-[84px] w-[84px] items-center justify-center rounded-full border border-[#FADDE9] bg-white">
                      <Icon
                        size={36}
                        strokeWidth={1.2}
                        style={{ color: ACCENT_COLOR }}
                      />
                    </div>

                    {/* Step Title */}
                    <h3 className="mb-4 text-lg font-bold tracking-tight text-[#1A202C]">
                      {step.title} {step.emoji && <span>{step.emoji}</span>}
                    </h3>

                    {/* Step Description */}
                    <p className="text-[14.5px] leading-[1.6] text-[#4A5568]">
                      {step.description}
                    </p>
                  </article>

                  {/* Vertical Divider - Only visible on desktop between items */}
                  {!isLast && (
                    <div
                      className="hidden w-[1px] bg-[#E2E8F0] lg:block"
                      style={{ margin: "20px 0" }}
                    />
                  )}
                  {/* Horizontal Divider for mobile */}
                  {!isLast && (
                    <div className="h-[1px] w-full bg-[#E2E8F0] lg:hidden" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WildWeekendCard;
