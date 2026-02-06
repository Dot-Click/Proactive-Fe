import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import day1 from "../../../assets/day1.png"
import map from "../../../assets/map.png"

interface DaybydayProps {
    trip?: any
}

const Daybyday = ({ trip }: DaybydayProps) => {
    // Extract trip data - handle both direct trip object and nested structure
    const tripData = trip?.trip?.[0] || trip?.trip || trip;
    
    // Parse daysItenary (database column name) or daysItinerary
    const parseDaysItinerary = () => {
        const raw = tripData?.daysItenary || tripData?.daysItinerary;
        if (!raw) return [];

        // If it's an array, use it directly
        if (Array.isArray(raw)) {
            return raw.map((day: any, index: number) => ({
                day: day.day ?? index + 1,
                description: day.description ?? "",
                image: day.image ?? day.img ?? null,
            }));
        }

        // If it's an object with day keys (day1, day2, etc.), convert to array
        if (typeof raw === "object") {
            const days: any[] = [];
            Object.keys(raw).forEach((key) => {
                if (key.startsWith("day") && key !== "days") {
                    const dayNum = parseInt(key.replace("day", ""));
                    if (!isNaN(dayNum)) {
                        days[dayNum - 1] = {
                            day: dayNum,
                            description: raw[key]?.description ?? "",
                            image: raw[key]?.img ?? raw[key]?.image ?? null,
                        };
                    }
                }
            });
            return days.filter(Boolean);
        }

        return [];
    };

    const daysItinerary = parseDaysItinerary();

    // Don't render if no days itinerary data
    if (daysItinerary.length === 0) {
        return null;
    }

    return (
        <>
        <div className="px-4 sm:px-16 py-6">
            <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">Day by Day Itinerary</span>
            <div className="flex lg:flex-row flex-col justify-between gap-8">
                {/* accordion */}
                <div className="py-8 mb-2 w-full">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full flex flex-col gap-4"
                    >
                        {daysItinerary.map((day: any, index: number) => {
                            const dayImage = day.image || day1;
                            const dayNumber = day.day ?? index + 1;
                            const dayDescription = day.description || "No description available.";
                            
                            // Extract title from description (first line or first sentence)
                            const descriptionLines = dayDescription.split('\n').filter((line: string) => line.trim());
                            const dayTitle = descriptionLines[0]?.trim() || `Day ${dayNumber}`;
                            const dayContent = descriptionLines.slice(1).join('\n') || dayDescription;

                            return (
                                <AccordionItem 
                                    key={`day-${dayNumber}-${index}`} 
                                    value={`item-${index + 1}`} 
                                    className="bg-[#FFFFFF] border border-[#E9E9E9] rounded-[15px] px-6 shadow-xl/4"
                                >
                                    <AccordionTrigger className="flex items-center">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={dayImage} 
                                                alt={`day${dayNumber}`} 
                                                className="w-20 h-20 rounded-[15px] object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = day1;
                                                }}
                                            />
                                            <div className="flex flex-col">
                                                <span>Day {dayNumber}</span>
                                                <span className="text-left">{dayTitle}</span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <p>{dayContent}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>

                {/* map */}
                <div>
                    <img 
                        src={tripData?.mapCoordinates ? `https://maps.googleapis.com/maps/api/staticmap?center=${tripData.mapCoordinates}&zoom=10&size=400x400&markers=color:red%7C${tripData.mapCoordinates}&key=YOUR_API_KEY` : map} 
                        alt="map"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = map;
                        }}
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default Daybyday