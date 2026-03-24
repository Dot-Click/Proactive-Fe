import { Info } from "lucide-react";
import { useState } from "react";

interface InfoItemProps {
    icon: React.ReactNode;
    title: string;
    description: string | React.ReactNode;
}

const InfoItem = ({ icon, title, description }: InfoItemProps) => (
    <div className="flex gap-4 items-start group">
        <div className="shrink-0 w-8 h-8 flex items-center justify-center text-[#221E33] group-hover:text-[#0DAC87] transition-colors mt-1">
            {icon}
        </div>
        <div className="space-y-2">
            <h4 className="text-[#221E33] font-bold text-lg font-quicksand">{title}</h4>
            <div className="text-[#646464] text-sm leading-[1.7] font-quicksand whitespace-pre-line">
                {description}
            </div>
        </div>
    </div>
);

const ThingsToKnow = ({ trip: _trip }: { trip?: any }) => {
    const [showAll, setShowAll] = useState(false);
    // normalize to top-level object
    const data = _trip?.trip?.[0] || _trip?.trip || _trip;

    const items: Array<{ title: string; description: string | React.ReactNode }> =
        Array.isArray(data?.thingsToKnow) && data.thingsToKnow.length > 0
            ? data.thingsToKnow
            : [
                  {
                      title: "Transportes",
                      description:
                          "Furgoneta privada con chófer, autobuses locales, trenes, vuelos de línea internos y barcos para descubrir los paraísos terrestres de Vietnam.",
                  },
                  {
                      title: "Alojamientos",
                      description: (
                          <>
                              Hoteles pequeños, dos noches en ecolodge (alojamientos eco-friendly) y homestay (alojamientos familiares) en dormitorios exclusivos de WeRoad, literas en el tren nocturno y una embarcación tradicional en Halong Bay.{"\n"}
                              <strong>Muy importante:</strong> No es posible garantizar que las cabinas en el tren nocturno sean compartidas exclusivamente por personas del grupo. En ocasiones, en función de la disponibilidad de billetes, es posible que se comparta con personas ajenas al mismo.{"\n"}
                              La opción "no-sharing room" no está disponible para las noches en homestay, en el tren y en el barco.{"\n"}
                              La opción "no-sharing room" no está disponible en todos los turnos.
                          </>
                      ),
                  },
                  {
                      title: "Pasaporte",
                      description: (
                          <>
                              Para este viaje, <strong>es obligatorio presentar una imagen del pasaporte al menos 30 días antes de la salida</strong> y el pasaporte debe tener una validez de al menos 6 meses a partir del día de regreso a España. Esto nos permite proceder a la reserva de todos los servicios de viaje. Si no se proporciona o el pasaporte no es válido, no podemos asegurar la plaza en el viaje. La imagen se puede cargar en el área personal tras hacer la reserva.
                          </>
                      ),
                  },
                  {
                      title: "Opción de Habitación Privada",
                      description: (
                          <button className="text-[#221E33] font-bold text-sm underline underline-offset-4 hover:text-[#0DAC87] transition-colors">
                              Ver todos los detalles
                          </button>
                      ),
                  },
              ];

    const visibleItems = showAll ? items : items.slice(0, 2);

    const toggleShow = () => {
        if (showAll) {
            // Scroll back to top of section when closing
            const element = document.getElementById('things-to-know-section');
            if (element) {
                const yOffset = -100; // Account for sticky header
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
        setShowAll(!showAll);
    };

    return (
        <div id="things-to-know-section" className="border-t border-[#ECECF1] pt-12 mt-16 pb-12 transition-all duration-500">
            <h3 className="text-[#221E33] font-extrabold text-3xl mb-4 font-quicksand tracking-tight">
                Cosas que saber
            </h3>
            <p className="text-[#646464] text-base mb-12 font-quicksand">
                Descubre más sobre alojamientos, medios de transporte e información extra útil para el viaje.
            </p>

            <div className={`space-y-10 max-w-4xl transition-all duration-500`}>
                {visibleItems.map((item, idx) => (
                    <InfoItem
                        key={idx}
                        icon={<Info size={24} />}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>

            {items.length > 2 && (
                <div className="mt-12">
                    <button 
                        type="button"
                        onClick={toggleShow}
                        className="px-8 py-3 border border-[#D1D5DB] rounded-full text-[#221E33] font-bold text-sm hover:bg-gray-50 transition-all bg-white shadow-sm font-quicksand active:scale-95 cursor-pointer"
                    >
                        {showAll ? "Mostrar menos" : `Mostrar todo (${items.length})`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThingsToKnow;
