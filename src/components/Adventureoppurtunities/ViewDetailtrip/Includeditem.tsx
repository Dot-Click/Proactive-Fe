import included1 from "../../../assets/included1.png";
import included2 from "../../../assets/included2.png";
import included3 from "../../../assets/included3.png";
import included4 from "../../../assets/included4.png";
import included5 from "../../../assets/included5.png";

const INCLUDED_LOOKUP: Record<string, { title: string; description: string; img: string }> = {
    camp: { title: "3 Nights Camp Stay", description: "Boutique camp accommodation with cozy shared spaces.", img: included1 },
    breakfast: { title: "Daily Breakfasts", description: "Fresh and healthy breakfasts included throughout the trip", img: included2 },
    transfer: { title: "Airport Transfers", description: "Arrival & departure transfers for a smooth start & end.", img: included3 },
    coordinator: { title: "Trip Coordinator", description: "Professional English-speaking coordinator for full guidance.", img: included4 },
    tour: { title: "Sagrada Familia Tour", description: "Skip-the-line entry with guided experience.", img: included5 },
};

const NOT_INCLUDED_LOOKUP: Record<string, { title: string; description: string; img: string }> = {
    flight: { title: "International Flights", description: "Flights to/from Barcelona not covered.", img: included1 },
    insurance: { title: "Travel Insurance", description: "Personal insurance must be arranged separately.", img: included2 },
    shopping: { title: "Shopping & Souvenirs", description: "Personal purchases not included.", img: included3 },
};

function normalizeItems(raw: any[] | null | undefined, lookup: Record<string, { title: string; description: string; img: string }>, fallbackImg: string) {
    if (!raw || !Array.isArray(raw)) return [];
    return raw.map((item: any) => {
        if (item && typeof item === "object") {
            const id = item.id ?? item.title;
            const fromLookup = typeof id === "string" ? lookup[id.toLowerCase()] : undefined;
            const itemImg = item.img || item.icon;

            let title = item.title ?? fromLookup?.title ?? String(id);
            let description = item.description ?? item.desc ?? fromLookup?.description ?? "";

            if (description.toLowerCase().startsWith(title.toLowerCase())) {
                description = description.substring(title.length).replace(/^[:\s-]+/, "").trim();
            }

            return {
                title,
                description,
                img: (itemImg && itemImg.trim() !== "") ? itemImg : (fromLookup?.img ?? fallbackImg),
            };
        }
        const id = typeof item === "string" ? item : String(item);
        const fromLookup = lookup[id.toLowerCase()];
        return {
            title: fromLookup?.title ?? id,
            description: fromLookup?.description ?? "",
            img: fromLookup?.img ?? fallbackImg
        };
    });
}

const Includeditem = ({ trip }: { trip: any }) => {
    const data = trip?.trip?.[0] || trip?.trip || trip;
    let rawIncluded = data?.included ?? data?.Included ?? [];
    let rawNotIncluded = data?.notIncluded ?? data?.not_included ?? data?.NotIncluded ?? [];

    const IncludedItem = normalizeItems(rawIncluded, INCLUDED_LOOKUP, included1);
    const NotIncludedItem = normalizeItems(rawNotIncluded, NOT_INCLUDED_LOOKUP, included1);

    return (
        <div className="space-y-16 mt-8">
            {/* What's Included */}
            <div className="border-t border-[#ECECF1] pt-12">
                <h3 className="text-[#221E33] font-extrabold text-3xl mb-10 font-quicksand tracking-tight">
                    What's included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {IncludedItem.length > 0 ? IncludedItem.map((item, index) => (
                        <div key={index} className="flex gap-4 group">
                            <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                                <img src={item.img} alt={item.title} className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => { (e.target as HTMLImageElement).src = included1; }} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-[#221E33] text-lg font-quicksand leading-tight">{item.title}</h4>
                                <p className="text-[#646464] text-sm leading-relaxed font-quicksand">{item.description}</p>
                            </div>
                        </div>
                    )) : <p className="text-sm text-[#646464] font-quicksand italic">No items specified.</p>}
                </div>
                {IncludedItem.length > 0 && (
                    <button className="mt-10 px-6 py-2.5 border border-[#D1D5DB] rounded-lg text-[#221E33] font-bold text-sm hover:bg-gray-50 transition-colors bg-white shadow-sm font-quicksand">
                        Show all {IncludedItem.length} included
                    </button>
                )}
            </div>

            {/* What's Not Included */}
            <div className="border-t border-[#ECECF1] pt-12">
                <h3 className="text-[#221E33] font-extrabold text-3xl mb-10 font-quicksand tracking-tight">
                    What's not included
                </h3>
                <div className="space-y-6">
                    {NotIncludedItem.length > 0 ? NotIncludedItem.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 group">
                            <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                                <span className="text-red-500 text-xl font-bold">✕</span>
                            </div>
                            <span className="text-[#221E33] font-medium text-base font-quicksand group-hover:text-red-600 transition-colors">
                                {item.title} {item.description && <span className="text-[#646464] font-normal">- {item.description}</span>}
                            </span>
                        </div>
                    )) : <p className="text-sm text-[#646464] font-quicksand italic">Everything mentioned above is included!</p>}
                </div>
                {NotIncludedItem.length > 0 && (
                    <button className="mt-8 px-6 py-2.5 border border-[#D1D5DB] rounded-lg text-[#221E33] font-bold text-sm hover:bg-gray-50 transition-colors bg-white shadow-sm font-quicksand">
                        Show all {NotIncludedItem.length} not included
                    </button>
                )}
            </div>
        </div>
    );
};

export default Includeditem;