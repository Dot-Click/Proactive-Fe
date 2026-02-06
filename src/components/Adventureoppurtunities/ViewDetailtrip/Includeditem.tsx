import included1 from "../../../assets/included1.png"
import included2 from "../../../assets/included2.png"
import included3 from "../../../assets/included3.png"
import included4 from "../../../assets/included4.png"
import included5 from "../../../assets/included5.png"

// Lookup for included/notIncluded items by ID (matches form options in TripOppurtunities/Included.tsx)
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

/** Normalize raw API value (array of IDs or array of objects) to display shape { title, description, img } */
function normalizeItems(
  raw: any[] | null | undefined,
  lookup: Record<string, { title: string; description: string; img: string }>,
  fallbackImg: string
): { title: string; description: string; img: string }[] {
  if (!raw || !Array.isArray(raw)) return [];
  return raw.map((item: any) => {
    if (item && typeof item === "object" && (item.title != null || item.id != null)) {
      const id = item.id ?? item.title;
      const fromLookup = typeof id === "string" ? lookup[id.toLowerCase()] : undefined;
      // Use img from item only if it's truthy and not empty, otherwise fall back to lookup or fallback
      const itemImg = item.img || item.icon;
      return {
        title: item.title ?? fromLookup?.title ?? String(id),
        description: item.description ?? item.desc ?? fromLookup?.description ?? "",
        img: (itemImg && itemImg.trim() !== "") ? itemImg : (fromLookup?.img ?? fallbackImg),
      };
    }
    const id = typeof item === "string" ? item : String(item);
    const fromLookup = lookup[id.toLowerCase()];
    return {
      title: fromLookup?.title ?? id,
      description: fromLookup?.description ?? "",
      img: fromLookup?.img ?? fallbackImg,
    };
  });
}

const Includeditem = ({ trip }: { trip: any }) => {
    const data = trip?.trip?.[0] || trip?.trip || trip;
    
    // Handle both camelCase and snake_case field names from database
    // Also handle if included/notIncluded is a JSON string that needs parsing
    let rawIncluded = data?.included ?? data?.Included ?? [];
    let rawNotIncluded = data?.notIncluded ?? data?.not_included ?? data?.NotIncluded ?? [];
    
    // Parse if they're JSON strings
    if (typeof rawIncluded === "string") {
        try {
            rawIncluded = JSON.parse(rawIncluded);
        } catch {
            rawIncluded = [];
        }
    }
    if (typeof rawNotIncluded === "string") {
        try {
            rawNotIncluded = JSON.parse(rawNotIncluded);
        } catch {
            rawNotIncluded = [];
        }
    }
    
    // Normalize so we support both array of IDs (from form) and array of objects
    const IncludedItem = normalizeItems(rawIncluded, INCLUDED_LOOKUP, included1);
    const NotIncludedItem = normalizeItems(rawNotIncluded, NOT_INCLUDED_LOOKUP, included1);
    
    return (
        <>

            <div className=" bg-[#F9F9F9]">
                <div className="w-full h-6 bg-[url('/zigzag.png')] bg-repeat-x bg-top"></div>

                <div className="flex flex-col px-4 sm:px-16 py-6">

                    <h4 className="font-bold text-[#000000] text-lg">What's Included</h4>
                    {/* included */}
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 py-4">
                        {IncludedItem.length > 0 ? (
                            IncludedItem.map((item, index) => (
                                <div key={index} className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                                    <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                        <img 
                                            src={item.img} 
                                            alt={item.title} 
                                            className="w-10 h-8 object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = included1;
                                            }}
                                        />
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <span className="text-[#606066] text-[11px] text-center">
                                            {item.description || "—"}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No items available</p>
                        )}

                        {/* <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included2} alt="included2" className="w-10 h-8" />
                                <h4 className="font-semibold">Daily Breakfasts</h4>
                                <span className="text-[#606066] text-[11px] text-center">Fresh and healthy breakfasts <br /> included throughout the trip</span>
                            </div>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included3} alt="included3" className="w-10 h-8" />
                                <h4 className="font-semibold">Airport Transfers</h4>
                                <span className="text-[#606066] text-[11px] text-center">Arrival & departure transfers for a smooth start & end.</span>
                            </div>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included4} alt="included4" className="w-10 h-8" />
                                <h4 className="font-semibold">Trip Coordinator</h4>
                                <span className="text-[#606066] text-[11px] text-center">Professional English-speaking coordinator for full guidance.</span>
                            </div>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included5} alt="included5" className="w-10 h-8" />
                                <h4 className="font-semibold">Sagrada Familia Tour</h4>
                                <span className="text-[#606066] text-[11px] text-center">Skip-the-line entry with guided experience.</span>
                            </div>
                        </div> */}

                    </div>

                    <h4 className="font-bold text-[#B80505] text-lg">Not Included</h4>
                    {/* Not included */}
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 py-4">
                        {NotIncludedItem.length > 0 ? (
                            NotIncludedItem.map((item, index) => (
                                <div key={index} className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                                    <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                        <img 
                                            src={item.img} 
                                            alt={item.title} 
                                            className="w-10 h-8 object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = included1;
                                            }}
                                        />
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <span className="text-[#606066] text-[11px] text-center">
                                            {item.description || "—"}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No items available</p>
                        )}
                        {/* <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included2} alt="included2" className="w-10 h-8" />
                                <h4 className="font-semibold">Travel Insurance</h4>
                                <span className="text-[#606066] text-[11px] text-center">Personal insurance must be <br /> arranged separately.</span>
                            </div>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included3} alt="included3" className="w-10 h-8" />
                                <h4 className="font-semibold">Shopping & Souvenirs</h4>
                                <span className="text-[#606066] text-[11px] text-center">Personal purchases not included.</span>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="w-full h-6 bg-[url('/zigzagbottom.png')] "></div>
            </div>
        </>
    )
}

export default Includeditem