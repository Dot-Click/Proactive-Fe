import { Beer, Coffee, Trees, Building2, Landmark, Gauge, Compass } from "lucide-react";

interface CharacteristicProps {
    label: string;
    value: number; // 1 to 5
    icon: React.ReactNode;
}

const Characteristic = ({ label, value, icon }: CharacteristicProps) => (
    <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
            <div className="text-[#606066] group-hover:text-[#221E33] transition-colors">
                {icon}
            </div>
            <span className="text-[#221E33] font-medium text-base font-quicksand">{label}</span>
        </div>
        <div className="flex gap-1.5 ring-offset-2 ring-[#0DAC87]/10 rounded-full">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i < value ? "bg-[#514D4D] scale-110" : "bg-[#ECECF1]"
                        }`}
                />
            ))}
        </div>
    </div>
);

const Tripmood = ({ trip }: { trip?: any }) => {
    // Values may come from trip.mood which is stored as array of {label,value}
    const raw: any[] = trip?.mood || [];
    const defaultChars = [
        { label: "Fiesta y Nightlife", icon: <Beer size={20} /> },
        { label: "Relax", icon: <Coffee size={20} /> },
        { label: "Naturaleza y aventura", icon: <Trees size={20} /> },
        { label: "Ciudad y culturas", icon: <Building2 size={20} /> },
        { label: "Monumentos e historia", icon: <Landmark size={20} /> },
    ];
    const characteristics =
        raw.length > 0
            ? raw.map((item, idx) => ({
                  label: item.label || defaultChars[idx]?.label || "",
                  value:
                      typeof item.value === "number" ? item.value : 0,
                  icon: defaultChars[idx]?.icon,
              }))
            : defaultChars.map((c) => ({ ...c, value: 0 }));

    return (
        <div className="py-12 border-t border-[#ECECF1] mt-8">
            <h2 className="text-[#221E33] font-extrabold text-3xl mb-12 font-quicksand tracking-tight">
                ¿Este viaje es para mí?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
                {/* Left Column: Ratings */}
                <div className="space-y-6">
                    {characteristics.map((item, idx) => (
                        <Characteristic key={idx} {...item} />
                    ))}
                </div>

                {/* Right Column: Status Indicators */}
                <div className="space-y-10">
                    <div className="group">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ECECF1] group-hover:border-[#0DAC87] transition-colors">
                            <div className="flex items-center gap-3">
                                <Gauge size={22} className="text-[#606066]" />
                                <span className="text-[#221E33] font-medium text-lg font-quicksand">Esfuerzo físico</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-end gap-1 h-5">
                                    <div className="w-1.5 h-2 bg-[#0DAC87] rounded-full" />
                                    <div className="w-1.5 h-4 bg-[#0DAC87] rounded-full" />
                                    <div className="w-1.5 h-3 bg-[#D1D5DB] rounded-full" />
                                </div>
                                <span className="text-[#221E33] font-bold text-lg font-quicksand underline decoration-[#0DAC87] decoration-2 underline-offset-4">
                                    Medio
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ECECF1] group-hover:border-[#0DAC87] transition-colors">
                            <div className="flex items-center gap-3">
                                <Compass size={22} className="text-[#606066]" />
                                <span className="text-[#221E33] font-medium text-lg font-quicksand">Tipo de viaje</span>
                            </div>
                            <span className="text-[#221E33] font-bold text-lg font-quicksand underline decoration-[#0DAC87] decoration-2 underline-offset-4">
                                360°
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tripmood;