import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import day1 from "../../../assets/day1.png";
// import mapPlaceholder from "../../../assets/map.png";
import { MapContainer, TileLayer, Marker, Polyline,Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface DaybydayProps {
    trip?: any;
}

// Component to handle map centering when coordinates change
const ChangeView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const Daybyday = ({ trip }: DaybydayProps) => {
    const tripData = trip?.trip?.[0] || trip?.trip || trip;

    const parseDaysItinerary = () => {
        const raw = tripData?.daysItenary || tripData?.daysItinerary;
        if (!raw) return [];

        if (Array.isArray(raw)) {
            return raw.map((day: any, index: number) => ({
                day: day.day ?? index + 1,
                description: day.description ?? "",
                image: day.image ?? day.img ?? null,
            }));
        }

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

    if (daysItinerary.length === 0) {
        return null;
    }

    // Coordinate parsing logic
    const getCoordinates = (coordString: string): [number, number] | null => {
        if (!coordString) return null;
        // Handle coordinates like "lat, lng" or "lat lng"
        const parts = coordString.split(/[,\s]+/).map((p) => parseFloat(p.trim()));
        if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return [parts[0], parts[1]];
        }
        return null;
    };

    const spainCenter: [number, number] = [40.4637, -3.7492];
    const destinationCoord = getCoordinates(tripData?.mapCoordinates);

    const mapCenter = destinationCoord || spainCenter;
    const path: [number, number][] = [];

    if (destinationCoord) {
        path.push(spainCenter, destinationCoord);
    }

    return (
        <div className="px-4 sm:px-16 py-10">
            <span className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-2xl">
                Day by Day Itinerary
            </span>
            <div className="flex lg:flex-row flex-col justify-between gap-10 mt-6 pt-2">
                {/* accordion */}
                <div className="w-full lg:w-3/5">
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                        {daysItinerary.map((day: any, index: number) => {
                            const dayImage = day.image || day1;
                            const dayNumber = day.day ?? index + 1;
                            const dayDescription = day.description || "No description available.";
                            const descriptionLines = dayDescription.split("\n").filter((line: string) => line.trim());
                            const dayTitle = descriptionLines[0]?.trim() || `Day ${dayNumber}`;
                            const dayContent = descriptionLines.slice(1).join("\n") || dayDescription;

                            return (
                                <AccordionItem
                                    key={`day-${dayNumber}-${index}`}
                                    value={`item-${index + 1}`}
                                    className="bg-[#FFFFFF] border border-[#E9E9E9] rounded-[20px] px-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <AccordionTrigger className="flex items-center py-4">
                                        <div className="flex items-center gap-6">
                                            <div className="relative">
                                                <img
                                                    src={dayImage}
                                                    alt={`day${dayNumber}`}
                                                    className="w-24 h-24 rounded-[15px] object-cover shadow-sm"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = day1;
                                                    }}
                                                />
                                                <div className="absolute -top-2 -left-2 bg-[#221E33] text-white text-xs px-2 py-1 rounded-full font-bold">
                                                    Day {dayNumber}
                                                </div>
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <span className="text-xl font-bold text-[#221E33]">{dayTitle}</span>
                                                <span className="text-sm text-gray-500 line-clamp-1">{dayContent.slice(0, 100)}...</span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-gray-700 leading-relaxed pb-6">
                                        <div className="h-[1px] w-full bg-[#F0F0F0] mb-2" />
                                        <p className="whitespace-pre-line">{dayDescription}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>

                {/* map container */}
                <div className="w-full lg:w-2/5 h-[500px] lg:h-auto lg:min-h-[500px] rounded-[20px] overflow-hidden border border-[#E9E9E9] shadow-xl relative mt-0 lg:sticky lg:top-24">
                    <MapContainer
                        center={mapCenter}
                        zoom={5}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%", zIndex: 0 }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <ChangeView center={mapCenter} zoom={destinationCoord ? 5 : 4} />

                        <Marker position={spainCenter}>
                            <Popup>Starting Point: Spain</Popup>
                        </Marker>

                        {destinationCoord && (
                            <>
                                <Marker position={destinationCoord}>
                                    <Popup>Trip Destination</Popup>
                                </Marker>
                                <Polyline
                                    positions={path}
                                    color="#565070"
                                    weight={4}
                                    opacity={0.8}
                                    dashArray="10, 10"
                                />
                            </>
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Daybyday;
