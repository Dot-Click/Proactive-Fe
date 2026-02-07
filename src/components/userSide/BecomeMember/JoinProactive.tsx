import React from "react";
import {
  Clock,
  MapPin,
  Tag,
  Users,
  UserCircle2,
  CalendarCheck,
} from "lucide-react";
import box1 from "../../../assets/box.png";

const CARDS = [
  {
    id: "exclusive-trips",
    icon: MapPin,
    title: "Access to Exclusive Trips",
    description:
      "Get priority access to limited Wild Trips, Wild Weekends, and Erasmus+ programs before they're released to the public.",
    color: "#2DD4BF",
    shadowColor: "#14B8A6",
  },
  {
    id: "member-discounts",
    icon: Tag,
    title: "Member Discounts",
    description:
      "Enjoy exclusive discounts on all Wild Trips & Weekends, plus special offers on accommodation and activities.",
    color: "#FACC15",
    shadowColor: "#CA8A04",
  },
  {
    id: "early-access",
    icon: Clock,
    title: "Early Access",
    description:
      "Be the first to know about new destinations and opportunities. Book your spot before anyone else.",
    color: "#A3E635",
    shadowColor: "#65A30D",
  },
  {
    id: "exclusive-communities",
    icon: Users,
    title: "Exclusive Communities",
    description:
      "Join our members-only WhatsApp and Telegram groups to connect with fellow travelers and coordinators.",
    color: "#F87171",
    shadowColor: "#DC2626",
  },
  {
    id: "coordinator-support",
    icon: UserCircle2,
    title: "Free Coordinator Support",
    description:
      "Get personalized travel advice and support from our experienced coordinators at no extra cost.",
    color: "#34D399",
    shadowColor: "#059669",
  },
  {
    id: "validity",
    icon: CalendarCheck,
    title: "365 Days Valid",
    description:
      "Your membership is valid for a full year from the date of purchase, giving you maximum flexibility.",
    color: "#A78BFA",
    shadowColor: "#7C3AED",
  },
] as const;

const JoinProactive = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-white py-16 lg:py-24"
      style={{
        background: `radial-gradient(50% 50% at 100% 50%, rgba(118, 240, 212, 0.32) 0%, rgba(250, 250, 250, 0) 100%)`,
        backgroundColor: "#FAFAFA",
      }}
    >
      {/* Background Gradient Orbs - matching the soft look of the image */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-teal-50/50 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-4xl mb-20 flex flex-col items-center gap-4 text-center">
        <h1 className="bg-gradient-to-r from-[#221E33] to-[#565070] bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
          Why Join Proactive?
        </h1>
        <img
          src={box1}
          alt=""
          className="absolute left-[52%] top-0 w-28 -translate-x-1/2 opacity-20 lg:block hidden"
        />
        <p className="max-w-2xl text-base font-medium text-gray-700">
          Unlock a world of exclusive travel opportunities and connect with
          like-minded adventurers
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center">
          {CARDS.map((card, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === CARDS.length - 1;
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className={`relative flex w-full max-w-[850px] mb-12 lg:mb-4 ${
                  isEven ? "justify-start" : "justify-end"
                }`}
              >
                {/* Curved Path Connector */}
                {!isLast && (
                  <div
                    className={`absolute top-[65%] h-[140%] w-1/2 border-[20px] border-transparent z-0 hidden lg:block
                    ${
                      isEven
                        ? "left-1/2 -translate-x-[7px] border-t-[#EEF2F9] border-r-[#EEF2F9] rounded-tr-[120px]"
                        : "right-1/2 translate-x-[7px] border-t-[#EEF2F9] border-l-[#EEF2F9] rounded-tl-[120px]"
                    }`}
                  />
                )}

                {/* Feature Card */}
                <div className="relative z-10 w-full max-w-[400px] pt-12 lg:pt-14">
                  {/* 3D Double Circle Icon - Exact look from image_ffd93d.png */}
                  <div className="absolute top-2 left-[-20px] z-20 w-16 h-16 lg:w-20 lg:h-20">
                    {/* Shadow Layer */}
                    <div
                      className="absolute inset-0 rounded-full translate-x-2 -translate-y-2"
                      style={{ backgroundColor: card.shadowColor }}
                    />
                    {/* Icon Layer */}
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: card.color }}
                    >
                      <Icon size={32} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="rounded-[32px] bg-white p-8 pl-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50/50">
                    <h2 className="mb-2 text-xl font-bold text-[#1e1b4b]">
                      {card.title}
                    </h2>
                    <p className="text-[15px] leading-relaxed text-gray-500">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JoinProactive;
