
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, PackageCheck, PackageX, Info } from "lucide-react";
import { useState } from "react";

const INCLUDED_LOOKUP: Record<string, { title: string; description: string; color: string }> = {
    camp: { title: "Accommodation", description: "Boutique stays with cozy shared spaces.", color: "bg-[#E6F7F3] text-[#0DAC87]" },
    breakfast: { title: "Meals Provided", description: "Daily fresh and healthy breakfasts included.", color: "bg-[#FFF9E6] text-[#FFB800]" },
    transfer: { title: "Transfers", description: "Arrival & departure transfers for a smooth start.", color: "bg-[#E6F0FF] text-[#0066FF]" },
    coordinator: { title: "Guide Support", description: "Professional English-speaking coordinator.", color: "bg-[#F3E6FF] text-[#9900FF]" },
    tour: { title: "Guided Experiences", description: "Skip-the-line entries and local tours.", color: "bg-[#FFE6E6] text-[#FF0000]" },
};

const NOT_INCLUDED_LOOKUP: Record<string, { title: string; description: string }> = {
    flight: { title: "International Flights", description: "Flights to/from the destination not covered." },
    insurance: { title: "Travel Insurance", description: "Personal insurance must be arranged separately." },
    shopping: { title: "Personal Expenses", description: "Personal purchases and souvenirs." },
};

function normalizeItems(raw: any[] | null | undefined, lookup: any) {
    if (!raw || !Array.isArray(raw)) return [];
    return raw.map((item: any) => {
        if (item && typeof item === "object") {
            const id = item.id ?? item.title;
            const fromLookup = typeof id === "string" ? lookup[id.toLowerCase()] : undefined;
            
            let title = item.title ?? fromLookup?.title ?? String(id);
            let description = item.description ?? item.desc ?? fromLookup?.description ?? "";
            let color = item.color ?? fromLookup?.color ?? "bg-gray-100 text-gray-500";

            if (description.toLowerCase().startsWith(title.toLowerCase())) {
                description = description.substring(title.length).replace(/^[:\s-]+/, "").trim();
            }

            return {
                title,
                description,
                color,
            };
        }
        const id = typeof item === "string" ? item : String(item);
        const fromLookup = lookup[id.toLowerCase()];
        return {
            title: fromLookup?.title ?? id,
            description: fromLookup?.description ?? "",
            color: fromLookup?.color ?? "bg-gray-100 text-gray-500"
        };
    });
}

const Includeditem = ({ trip }: { trip: any }) => {
    const data = trip?.trip?.[0] || trip?.trip || trip;
    const [showAllIncluded, setShowAllIncluded] = useState(false);
    const [showAllExcluded, setShowAllExcluded] = useState(false);

    let rawIncluded = data?.included ?? data?.Included ?? [];
    let rawNotIncluded = data?.notIncluded ?? data?.not_included ?? data?.NotIncluded ?? [];

    const IncludedItem = normalizeItems(rawIncluded, INCLUDED_LOOKUP);
    const NotIncludedItem = normalizeItems(rawNotIncluded, NOT_INCLUDED_LOOKUP);

    const visibleIncluded = showAllIncluded ? IncludedItem : IncludedItem.slice(0, 4);
    const visibleExcluded = showAllExcluded ? NotIncludedItem : NotIncludedItem.slice(0, 4);

    return (
        <div id="included-section" className="space-y-12 mt-12 bg-white">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Included Column */}
                <div className="flex-1 bg-[#F9FEFB] rounded-[32px] p-8 border border-[#E8F5EE] shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-[#0DAC87] p-2.5 rounded-2xl shadow-lg shadow-[#0DAC87]/20">
                            <PackageCheck className="text-white" size={24} />
                        </div>
                        <div>
                            <h3 className="text-[#1F1B2C] font-black text-2xl tracking-tight leading-none">Included</h3>
                            <p className="text-[#0DAC87] text-xs font-bold uppercase tracking-widest mt-1">What's Covered</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {IncludedItem.length > 0 ? visibleIncluded.map((item, index) => (
                            <div key={index} className="flex gap-4 group bg-white p-4 rounded-2xl border border-transparent hover:border-[#0DAC87]/20 hover:shadow-sm transition-all">
                                <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-xl ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                    <CheckCircle2 size={24} className="opacity-90" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-[#221E33] text-lg leading-tight">{item.title}</h4>
                                    <p className="text-[#666373] text-sm leading-relaxed font-medium">{item.description}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-10 opacity-30">
                                <Info size={40} />
                                <p className="text-sm font-bold mt-2">See description for details</p>
                            </div>
                        )}
                    </div>

                    {IncludedItem.length > 4 && (
                        <button 
                            type="button"
                            onClick={(e) => { 
                                e.preventDefault(); 
                                if (showAllIncluded) {
                                    // Anchoring view when closing so the user sees the list shrink
                                    document.getElementById('included-section')?.scrollIntoView({ behavior: 'smooth' });
                                }
                                setShowAllIncluded(!showAllIncluded); 
                            }}
                            className="w-full mt-8 flex items-center justify-center gap-2 py-4 border-2 border-[#E8F5EE] rounded-2xl text-[#1F1B2C] font-bold text-sm hover:bg-white hover:border-[#0DAC87] transition-all cursor-pointer group"
                        >
                            {showAllIncluded ? (
                                <><ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" /> Show Less</>
                            ) : (
                                <><ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" /> Show All {IncludedItem.length} Items</>
                            )}
                        </button>
                    )}
                </div>

                {/* Not Included Column */}
                <div className="flex-1 bg-[#FFF9F9] rounded-[32px] p-8 border border-[#FBEAEA] shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-[#EF4444] p-2.5 rounded-2xl shadow-lg shadow-[#EF4444]/20">
                            <PackageX className="text-white" size={24} />
                        </div>
                        <div>
                            <h3 className="text-[#1F1B2C] font-black text-2xl tracking-tight leading-none">Excluded</h3>
                            <p className="text-[#EF4444] text-xs font-bold uppercase tracking-widest mt-1">What's Not Covered</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {NotIncludedItem.length > 0 ? visibleExcluded.map((item, index) => (
                            <div key={index} className="flex gap-4 group bg-white p-4 rounded-2xl border border-transparent hover:border-[#EF4444]/20 hover:shadow-sm transition-all">
                                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-red-50 text-red-400 shadow-sm group-hover:scale-110 transition-transform">
                                    <XCircle size={24} className="opacity-90" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-[#221E33] text-lg leading-tight">{item.title}</h4>
                                    <p className="text-[#666373] text-sm leading-relaxed font-medium">{item.description}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-10 text-[#0DAC87] opacity-60">
                                <div className="w-16 h-16 bg-[#E6F7F3] rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 size={32} />
                                </div>
                                <p className="text-sm font-bold uppercase tracking-widest text-center">Everything is Included!</p>
                            </div>
                        )}
                    </div>

                    {NotIncludedItem.length > 4 && (
                        <button 
                            type="button"
                            onClick={(e) => { 
                                e.preventDefault(); 
                                if (showAllExcluded) {
                                    document.getElementById('included-section')?.scrollIntoView({ behavior: 'smooth' });
                                }
                                setShowAllExcluded(!showAllExcluded); 
                            }}
                            className="w-full mt-8 flex items-center justify-center gap-2 py-4 border-2 border-[#FBEAEA] rounded-2xl text-[#1F1B2C] font-bold text-sm hover:bg-white hover:border-[#EF4444] transition-all cursor-pointer group"
                        >
                            {showAllExcluded ? (
                                <><ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" /> Show Less</>
                            ) : (
                                <><ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" /> Show All {NotIncludedItem.length} Items</>
                            )}
                        </button>
                    )}
                </div>
            </div>
            
            {/* Information Note */}
            <div className="bg-[#F8F9FB] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 border border-[#ECECF1]">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Info className="text-[#666373]" size={20} />
                </div>
                <p className="text-[#646464] text-sm font-medium leading-relaxed text-center sm:text-left">
                    Prices and inclusions are based on group bookings. For custom requirements or special accommodations, please contact our support team.
                </p>
            </div>
        </div>
    );
};

export default Includeditem;