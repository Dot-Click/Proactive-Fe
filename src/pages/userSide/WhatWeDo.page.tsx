import { Link } from "react-router-dom";
import Whatwedo1 from "@/assets/whatwedo1.png";
import Whatwedo2 from "@/assets/whatwedo2.png";
import Whatwedo3 from "@/assets/whatwedo3.png";
import Whatwedo4 from "@/assets/whatwedo4.png";
import Whatwedo5 from "@/assets/whatwedo5.png";
import Whatwedo6 from "@/assets/whatwedo6.png";
import { ArrowRight } from "lucide-react";

const whatWeDoItems = [
  {
    title: "Wild Weekend",
    description: "Short adventures full of energy and excitement for quick getaways.",
    to: "/wild-weekend",
    img: Whatwedo1,
    overlayImg: Whatwedo6,
    featured: true,
  },
  {
    title: "Wild Trip",
    description: "Longer trips with cultural immersion and deep adventure experiences.",
    to: "/wild-trip",
    img: Whatwedo5,
    featured: false,
  },
  {
    title: "Erasmus+",
    description: "International youth programs fostering cultural exchange and learning.",
    to: "/erasmus-plus",
    img: Whatwedo4,
    featured: false,
  },
  {
    title: "Internal Events",
    description: "Professional training and internal events for skill development.",
    to: "/internal-events",
    img: Whatwedo2,
    overlayImg: Whatwedo3,
    featured: true,
  },
];

const WhatWeDoPage = () => {
  return (
    <div>
      <section className="bg-[#FAFAFA] py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 justify-center items-center text-center max-w-2xl mx-auto mb-12">
            <h1 className="lg:text-4xl text-2xl bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold">
              What We Do
            </h1>
            <p className="text-[#221E33] text-sm lg:text-base">
              We create transformative experiences that connect people with adventure and culture. Explore our programs below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whatWeDoItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0DAC87] focus-visible:ring-offset-2 rounded-2xl overflow-hidden"
              >
                {item.featured ? (
                  <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden border border-[#58DD00]/30 bg-[#FAFAFA] hover:border-[#0DAC87] transition-colors">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 top-2 left-2 right-2">
                      <img
                        src={item.overlayImg}
                        alt=""
                        className="w-full h-28 object-cover rounded-lg opacity-90"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-xs opacity-90 line-clamp-2">{item.description}</p>
                      <span className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-[#58DD00] group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-72 lg:h-80 border border-[#58DD00]/30 bg-[#FAFAFA] hover:border-[#0DAC87] rounded-2xl p-4 flex flex-col transition-colors group-hover:shadow-lg">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-[#221E33] text-lg mb-2">{item.title}</h3>
                      <p className="text-xs text-[#221E33] font-medium flex-1">{item.description}</p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#0DAC87] group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/open-oppurtunities"
              className="inline-flex items-center gap-2 bg-[#0DAC87] hover:bg-[#0f9e7d] text-white font-semibold rounded-full px-6 py-3 transition-colors"
            >
              View Open Opportunities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDoPage;
