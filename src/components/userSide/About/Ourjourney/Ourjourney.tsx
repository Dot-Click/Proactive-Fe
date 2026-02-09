import box1 from "../../../../assets/box.png";

const MILESTONES = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Founded by a group of former Erasmus students who wanted to continue the magic of cultural exchange.",
    color: "#2DD4BF", // Brighter Teal
    shadowColor: "#14B8A6", // Darker Teal for the 3D effect
  },
  {
    year: "2020",
    title: "Digital Pivot",
    description:
      "Adapted to virtual exchanges and built our online community during challenging times.",
    color: "#FACC15",
    shadowColor: "#CA8A04",
  },
  {
    year: "2021",
    title: "Wild Weekends Launch",
    description:
      "Introduced short-format adventures perfect for busy young professionals.",
    color: "#A3E635",
    shadowColor: "#65A30D",
  },
  {
    year: "2022",
    title: "Expansion",
    description: "Reached 1,000+ participants across 20 European countries.",
    color: "#F87171",
    shadowColor: "#DC2626",
  },
  {
    year: "2023",
    title: "Recognition",
    description:
      "Awarded 'Best Youth Travel Organization' by European Travel Association.",
    color: "#34D399",
    shadowColor: "#059669",
  },
  {
    year: "2024",
    title: "Growth",
    description:
      "Welcomed our 2,500th member and launched Wild Trip adventures.",
    color: "#A78BFA",
    shadowColor: "#7C3AED",
  },
] as const;

const OurJourney = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      {/* Header Section */}
      <div className="relative flex flex-col justify-center items-center gap-4 py-10 mb-16">
        <h1
          className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                       font-bold text-4xl lg:text-5xl relative z-10"
        >
          Our Journey
        </h1>
        <img
          src={box1}
          alt="background decoration"
          className="w-28 h-28 absolute top-4 left-[52%] opacity-30 lg:flex hidden z-0 pointer-events-none"
        />
        <p className="z-10 text-gray-400 font-medium text-center">
          From a small idea to a Europe-wide community
        </p>
      </div>

      {/* Timeline Section */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative flex flex-col items-center">
          {MILESTONES.map((item, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === MILESTONES.length - 1;

            return (
              <div
                key={item.year}
                className={`relative flex w-full max-w-[780px] mb-4 ${
                  isEven ? "justify-start" : "justify-end"
                }`}
              >
                {/* Curved Path Logic */}
                {!isLast && (
                  <div
                    className={`absolute top-[65%] h-[135%] w-1/2 border-[25px] border-transparent z-0
                    ${
                      isEven
                        ? "left-1/2 -translate-x-[120px] border-t-[#F1F5F9] border-r-[#F1F5F9] rounded-tr-[100px]"
                        : "right-1/2 translate-x-[120px] border-t-[#F1F5F9] border-l-[#F1F5F9] rounded-tl-[100px]"
                    }`}
                  />
                )}

                {/* Card Container */}
                <div className="relative z-10 w-full max-w-[360px] pt-10">
                  {/* --- THE EXACT CIRCLE BADGE (3D EFFECT) --- */}
                  <div className="absolute -top-2 left-[-15px] z-20 w-16 h-16 lg:w-20 lg:h-20">
                    {/* Background Circle (The darker shadow part) */}
                    <div
                      className="absolute inset-0 rounded-full translate-x-2 -translate-y-2"
                      style={{ backgroundColor: item.shadowColor }}
                    />
                    {/* Foreground Circle (The main year part) */}
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-sm"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.year}
                    </div>
                  </div>

                  {/* Text Card */}
                  <div className="rounded-[32px] bg-white p-8 pl-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50">
                    <h3 className="mb-2 text-[1.1rem] font-bold text-[#1e1b4b]">
                      {item.title}
                    </h3>
                    <p className="text-[0.95rem] leading-relaxed text-gray-400">
                      {item.description}
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

export default OurJourney;
