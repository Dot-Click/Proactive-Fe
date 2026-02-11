// import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";

const JoinAdventureCommunity = () => {
  // const { t } = useTranslation();
  
  // WhatsApp community link - update with actual link
  const whatsappLink = "https://chat.whatsapp.com/YOUR_COMMUNITY_LINK";

  return (
    <section className="w-full bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-black mb-8 lg:mb-12">
          ¿Quieres conocer a tus futuros compis de aventuras?
        </h2>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Column - Image with Purple Border Effect */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Purple shadow/border effect on bottom and right */}
              <div 
                className="absolute -bottom-2 -right-2 w-full h-full rounded-xl z-0"
                style={{ backgroundColor: "#7C3AED", opacity: 0.3 }}
              />
              {/* Image Container */}
              <div className="relative rounded-xl overflow-hidden z-10">
                <img
                  src="/src/assets/connect1.png" // Update with actual adventure group image
                  alt="Grupo de aventureros en la playa"
                  className="w-full h-auto object-cover rounded-xl"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551632811-561732d7e918?w=800&q=80";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Text and CTA */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {/* Secondary Heading */}
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6" style={{ color: "#E63946" }}>
              Somos una familia de exploradores. ¿Te vienes?
            </h3>

            {/* First Paragraph */}
            <p className="text-base lg:text-lg text-gray-700 mb-4 leading-relaxed">
              Huakai se caracteriza por muchas cosas, pero sobre todo por crear nuevas rutas a raíz de experiencias únicas.
            </p>

            {/* Second Paragraph */}
            <p className="text-base lg:text-lg text-gray-700 mb-6 lg:mb-8 leading-relaxed">
              Forma parte de nuestro grupo de Facebook y conoce a otros viajeros como tú.
            </p>

            {/* WhatsApp CTA Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg transition-transform hover:scale-105 shadow-lg"
              style={{
                background: "linear-gradient(90deg, #E63946 0%, #7C3AED 100%)"
              }}
            >
              <MessageCircle size={24} />
              ¡Quiero unirme!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAdventureCommunity;
