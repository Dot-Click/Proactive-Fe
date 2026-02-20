import { Bus, Home, FileText, Lock } from "lucide-react";

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
    return (
        <div className="border-t border-[#ECECF1] pt-12 mt-16 pb-12">
            <h3 className="text-[#221E33] font-extrabold text-3xl mb-4 font-quicksand tracking-tight">
                Cosas que saber
            </h3>
            <p className="text-[#646464] text-base mb-12 font-quicksand">
                Descubre más sobre alojamientos, medios de transporte e información extra útil para el viaje.
            </p>

            <div className="space-y-10 max-w-4xl">
                <InfoItem
                    icon={<Bus size={24} />}
                    title="Transportes"
                    description="Furgoneta privada con chófer, autobuses locales, trenes, vuelos de línea internos y barcos para descubrir los paraísos terrestres de Vietnam."
                />

                <InfoItem
                    icon={<Home size={24} />}
                    title="Alojamientos"
                    description={
                        <>
                            Hoteles pequeños, dos noches en ecolodge (alojamientos eco-friendly) y homestay (alojamientos familiares) en dormitorios exclusivos de WeRoad, literas en el tren nocturno y una embarcación tradicional en Halong Bay.{"\n"}
                            <strong>Muy importante:</strong> No es posible garantizar que las cabinas en el tren nocturno sean compartidas exclusivamente por personas del grupo. En ocasiones, en función de la disponibilidad de billetes, es posible que se comparta con personas ajenas al mismo.{"\n"}
                            La opción "no-sharing room" no está disponible para las noches en homestay, en el tren y en el barco.{"\n"}
                            La opción "no-sharing room" no está disponible en todos los turnos.
                        </>
                    }
                />

                <InfoItem
                    icon={<FileText size={24} />}
                    title="Pasaporte"
                    description={
                        <>
                            Para este viaje, <strong>es obligatorio presentar una imagen del pasaporte al menos 30 días antes de la salida</strong> y el pasaporte debe tener una validez de al menos 6 meses a partir del día de regreso a España. Esto nos permite proceder a la reserva de todos los servicios de viaje. Si no se proporciona o el pasaporte no es válido, no podemos asegurar la plaza en el viaje. La imagen se puede cargar en el área personal tras hacer la reserva.
                        </>
                    }
                />

                <InfoItem
                    icon={<Lock size={24} />}
                    title="Opción de Habitación Privada"
                    description={
                        <button className="text-[#221E33] font-bold text-sm underline underline-offset-4 hover:text-[#0DAC87] transition-colors">
                            Ver todos los detalles
                        </button>
                    }
                />
            </div>

            <button className="mt-12 px-6 py-2.5 border border-[#D1D5DB] rounded-lg text-[#221E33] font-bold text-sm hover:bg-gray-50 transition-colors bg-white shadow-sm font-quicksand">
                Mostrar menos
            </button>
        </div>
    );
};

export default ThingsToKnow;
