
import { PackageCheck, PackageX, Info } from "lucide-react";
import included1 from "../../../assets/included1.png";
import included2 from "../../../assets/included2.png";
import included3 from "../../../assets/included3.png";
import included4 from "../../../assets/included4.png";
import included5 from "../../../assets/included5.png";

const getImageUrl = (img: string | null) => {
    if (!img) return null;
    if (typeof img !== "string") return null;
    if (img.trim() === "") return null;

    // If it's a full URL, Base64 data, or a local Vite asset path
    if (img.startsWith("http") || img.startsWith("data:") || img.startsWith("/") || img.startsWith("./") || img.startsWith("src/")) {
        return img;
    }

    // Trim potential duplicate uploads/ prefix
    const cleanPath = img.replace(/^uploads\//, "");

    // Assume it's a relative filename from the backend uploads folder
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
    return `${apiBase}/uploads/${cleanPath}`;
};

const INCLUDED_LOOKUP: Record<string, { title: string; description: string; color: string; icon: string }> = {
    camp: { title: "Accommodation", description: "Boutique stays with cozy shared spaces.", color: "text-[#0DAC87]", icon: included1 },
    accommodation: { title: "Accommodation", description: "Boutique stays with cozy shared spaces.", color: "text-[#0DAC87]", icon: included1 },
    "3 nights camp stay": { title: "3 Nights Camp Stay", description: "Boutique camp accommodation.", color: "text-[#0DAC87]", icon: included1 },
    breakfast: { title: "Daily Breakfasts", description: "Fresh and healthy breakfasts included.", color: "text-[#FFB800]", icon: included2 },
    "daily breakfasts": { title: "Daily Breakfasts", description: "Fresh and healthy breakfasts included.", color: "text-[#FFB800]", icon: included2 },
    transfer: { title: "Transfers", description: "Arrival & departure transfers for a smooth start.", color: "text-[#0066FF]", icon: included3 },
    "airport transfers": { title: "Airport Transfers", description: "Arrival & departure transfers for a smooth start.", color: "text-[#0066FF]", icon: included3 },
    coordinator: { title: "Guide Support", description: "Professional English-speaking coordinator.", color: "text-[#9900FF]", icon: included4 },
    "trip coordinator": { title: "Trip Coordinator", description: "Professional English-speaking coordinator.", color: "text-[#9900FF]", icon: included4 },
    tour: { title: "Guided Experiences", description: "Skip-the-line entries and local tours.", color: "text-[#FF0000]", icon: included5 },
    "sagrada familia tour": { title: "Sagrada Familia Tour", description: "Skip-the-line entries and local tours.", color: "text-[#FF0000]", icon: included5 },
};

const NOT_INCLUDED_LOOKUP: Record<string, { title: string; description: string; icon: string }> = {
    flight: { title: "International Flights", description: "Flights to/from the destination not covered.", icon: included1 },
    "international flights": { title: "International Flights", description: "Flights to/from the destination not covered.", icon: included1 },
    insurance: { title: "Travel Insurance", description: "Personal insurance must be arranged separately.", icon: included2 },
    "travel insurance": { title: "Travel Insurance", description: "Personal insurance must be arranged separately.", icon: included2 },
    shopping: { title: "Personal Expenses", description: "Personal purchases and souvenirs.", icon: included3 },
    "shopping & souvenirs": { title: "Shopping & Souvenirs", description: "Personal purchases and souvenirs.", icon: included3 },
    "personal expenses": { title: "Personal Expenses", description: "Personal purchases and souvenirs.", icon: included3 },
};

function normalizeItems(raw: any[] | null | undefined, lookup: any) {
    if (!raw || !Array.isArray(raw)) return [];
    return raw.map((item: any) => {
        if (item && typeof item === "object") {
            const id = (item.id || item.title || "").toString().toLowerCase().trim();
            const fromLookup = lookup[id];

            let title = item.title || fromLookup?.title || String(id || "");
            let description = item.description || item.desc || fromLookup?.description || "";

            // Collect all possible image properties from backend payload or local state
            let img = item.img || item.icon || item.image || item.iconFile || item.iconPreview || fromLookup?.icon || null;

            if (description && title && description.toLowerCase().startsWith(title.toLowerCase())) {
                description = description.substring(title.length).replace(/^[:\s-]+/, "").trim();
            }

            return { title, description, img };
        }

        const id = (item || "").toString().toLowerCase().trim();
        const fromLookup = lookup[id];
        return {
            title: fromLookup?.title ?? id,
            description: fromLookup?.description ?? "",
            img: fromLookup?.icon ?? null
        };
    });
}

const Includeditem = ({ trip }: { trip: any }) => {
    const data = trip?.trip?.[0] || trip?.trip || trip;

    let rawIncluded = data?.included ?? data?.Included ?? [];
    let rawNotIncluded = data?.notIncluded ?? data?.not_included ?? data?.NotIncluded ?? [];

    const IncludedItem = normalizeItems(rawIncluded, INCLUDED_LOOKUP);
    const NotIncludedItem = normalizeItems(rawNotIncluded, NOT_INCLUDED_LOOKUP);

    return (
        <div id="included-section" className="space-y-20 mt-16 bg-white">

            {/* Included Section */}
            <div className="space-y-10">
                <div className="flex items-center gap-4">
                    <h3 className="text-[#221E33] font-extrabold text-3xl tracking-tight font-quicksand">What's Included</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {IncludedItem.length > 0 ? IncludedItem.map((item, index) => {
                        const iconUrl = getImageUrl(item.img);
                        return (
                            <div key={index} className="flex flex-col items-center text-center p-10 bg-[#FFFFFF] border border-[#ECECF1] rounded-[24px] transition-all duration-300">
                                <div className="w-16 h-12 mb-8 flex items-center justify-center">
                                    {iconUrl ? (
                                        <img src={iconUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                            <PackageCheck className="text-gray-300" size={24} />
                                        </div>
                                    )}
                                </div>
                                <h4 className="font-bold text-[#221E33] text-[18px] mb-3 font-quicksand">
                                    {item.title}
                                </h4>
                                <p className="text-[#646464] text-[13px] leading-relaxed font-quicksand overflow-hidden line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        );
                    }) : (
                        <p className="text-[#A3A1AC] text-sm italic">Refer to trip description for details.</p>
                    )}
                </div>
            </div>

            {/* Not Included Section */}
            <div className="space-y-10">
                <div className="flex items-center gap-4">
                    <h3 className="text-[#221E33] font-extrabold text-3xl tracking-tight font-quicksand">What's Not Included</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {NotIncludedItem.length > 0 ? NotIncludedItem.map((item, index) => {
                        const iconUrl = getImageUrl(item.img);
                        return (
                            <div key={index} className="flex flex-col items-center text-center p-10 bg-[#FFFFFF] border border-[#ECECF1] rounded-[24px] transition-all duration-300">
                                <div className="w-16 h-12 mb-8 flex items-center justify-center">
                                    {iconUrl ? (
                                        <img src={iconUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                            <PackageX className="text-gray-300" size={24} />
                                        </div>
                                    )}
                                </div>
                                <h4 className="font-bold text-[#221E33] text-[18px] mb-3 font-quicksand">
                                    {item.title}
                                </h4>
                                <p className="text-[#646464] text-[13px] leading-relaxed font-quicksand overflow-hidden line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        );
                    }) : (
                        <div className="col-span-full py-10 text-center bg-[#F8F9FB] rounded-[24px] border border-dashed border-[#ECECF1]">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#666373] font-quicksand">Everything is included!</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Information Note */}
            <div className="bg-[#FFFFFF] rounded-[30px] p-10 flex items-start gap-8 border border-[#ECECF1]">
                <div className="w-14 h-14 bg-[#F8F9FB] rounded-2xl flex items-center justify-center shrink-0 border border-[#ECECF1]">
                    <Info className="text-[#221E33]" size={28} />
                </div>
                <div className="space-y-2">
                    <h5 className="text-[#221E33] font-bold text-xl font-quicksand tracking-tight">Terms & Conditions</h5>
                    <p className="text-[#646464] text-[15px] font-medium leading-[1.8] font-quicksand max-w-2xl">
                        Prices and inclusions are based on group dynamics. For customized requirements or
                        special accommodations, please message our coordinator team directly before booking.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Includeditem;


