import Explore1 from "../../../../assets/Explore1.png";
import { useTranslation } from "react-i18next";

const JOIN_WHATSAPP_URL = "https://chat.whatsapp.com/";

const JoinExplorers = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white w-full py-12 lg:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left: Larger, wider image container */}
          <div className="relative w-full lg:w-[55%] flex justify-start">
            {/* The Purple Decorative Block - Positioned absolutely behind */}
            <div
              className="absolute top-6 left-6 w-full h-full bg-[#4B0082] rounded-[2.5rem] z-0"
              style={{ transform: "translate(10px, 10px)" }}
            />

            {/* The Main Image */}
            <div className="relative z-10 w-full">
              <img
                src={Explore1}
                alt="Explorers group"
                // object-cover ensures it fills the taller height without stretching
                className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-[2rem] shadow-md"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6 lg:pl-4">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold leading-[1.1] text-[#E53E3E]">
              {t('wildWeekend.joinExplorers.title')}
            </h2>

            <div className="flex flex-col gap-4 text-gray-700 text-lg lg:text-xl">
              <p className="leading-relaxed">
                {t('wildWeekend.joinExplorers.desc1')}
              </p>
              <p className="leading-relaxed">
                {t('wildWeekend.joinExplorers.desc2')}
              </p>
            </div>

            <div className="mt-4 flex justify-center items-center">
              <a
                href={JOIN_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 rounded-2xl text-white font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  background:
                    "linear-gradient(90deg, #E53E3E 0%, #6B21A8 100%)",
                }}
              >
                {t('wildWeekend.joinExplorers.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinExplorers;
