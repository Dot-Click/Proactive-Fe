import day1 from "../../../assets/day1.png";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";
import { ShieldCheck, Zap } from "lucide-react";

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

const getImageUrl = (img: string | null) => {
    if (!img) return day1;
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_API_URL || ""}/uploads/${img}`;
};

interface DaybydayProps {
    trip?: any;
}

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

    if (daysItinerary.length === 0) return null;

    const getCoordinates = (coordString: string): [number, number] | null => {
        if (!coordString) return null;
        const parts = coordString.split(/[,\s]+/).map((p) => parseFloat(p.trim()));
        if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) return [parts[0], parts[1]];
        return null;
    };

    const spainCenter: [number, number] = [40.4637, -3.7492];
    const destinationCoord = getCoordinates(tripData?.mapCoordinates);
    const mapCenter = destinationCoord || spainCenter;
    const path: [number, number][] = destinationCoord ? [spainCenter, destinationCoord] : [];

    return (
        <div className="py-16">
            <h3 className="text-[#221E33] font-bold text-3xl mb-12 font-sans tracking-tight">Itinerary</h3>
            <div className="flex lg:flex-row flex-col gap-12">
                {/* Itinerary Accordion - Legacy Look restored */}
                <div className="w-full lg:w-[58%]">
                    <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
                        {daysItinerary.map((day: any, index: number) => {
                            const dayNumber = day.day ?? index + 1;
                            const dayDescription = day.description || "No description available.";
                            const descriptionLines = dayDescription.split("\n").filter((line: string) => line.trim());
                            const dayTitle = descriptionLines[0]?.trim() || `Day ${dayNumber}`;
                            const dayContent = descriptionLines.slice(1).join("\n") || dayDescription;

                            return (
                                <AccordionItem
                                    key={`day-${dayNumber}-${index}`}
                                    value={`item-${index}`}
                                    className="border border-[#ECECF1] rounded-[20px] px-6 py-2 overflow-hidden bg-white shadow-sm data-[state=open]:border-[#0DAC87] transition-all duration-300"
                                >
                                    <AccordionTrigger className="hover:no-underline py-4 group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-10 h-10 rounded-full bg-[#E6F7F3] flex items-center justify-center shrink-0 group-data-[state=open]:bg-[#0DAC87] transition-colors">
                                                <span className="text-[#0DAC87] group-data-[state=open]:text-white font-bold text-lg font-sans">
                                                    {dayNumber}
                                                </span>
                                            </div>
                                            <span className="text-[#221E33] font-bold text-xl font-sans group-hover:text-[#0DAC87] transition-colors">
                                                {dayTitle}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-6">
                                        <div className="pl-[60px] space-y-6">
                                            <p className="text-[#514D4D] text-base leading-[1.8] whitespace-pre-line font-sans">
                                                {dayContent}
                                            </p>
                                            {day.image && (
                                                <div className="rounded-2xl overflow-hidden shadow-md border border-[#ECECF1]">
                                                    <img
                                                        src={getImageUrl(day.image)}
                                                        alt={`Day ${dayNumber}`}
                                                        className="w-full h-auto object-cover max-h-[400px] hover:scale-[1.02] transition-transform duration-700"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>

                {/* Map Container - Improved Responsiveness */}
                <div className="w-full lg:w-[42%] flex flex-col items-stretch lg:sticky lg:top-28 h-fit lg:max-h-[calc(100vh-160px)]">
                    <div className="relative aspect-square md:aspect-video lg:aspect-[4/5] rounded-[30px] overflow-hidden border border-[#ECECF1] shadow-2xl group/map">
                        <MapContainer
                            center={mapCenter}
                            zoom={5}
                            scrollWheelZoom={false}
                            style={{ height: "100%", width: "100%", zIndex: 0 }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <ChangeView center={mapCenter} zoom={destinationCoord ? 5 : 4} />
                            <Marker position={spainCenter}><Popup>Starting Point: Spain</Popup></Marker>
                            {destinationCoord && (
                                <>
                                    <Marker position={destinationCoord}><Popup>Trip Destination</Popup></Marker>
                                    <Polyline positions={path} color="#0DAC87" weight={4} opacity={0.6} dashArray="10, 10" />
                                </>
                            )}
                        </MapContainer>

                        {/* Floating Pricing/Person Card */}
                        <div className="absolute bottom-6 left-6 right-6 z-[10] group-hover/map:translate-y-[-4px] transition-transform duration-500">
                            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="w-12 h-12 border-2 border-[#0DAC87] shadow-sm">
                                            <AvatarImage src={tripData?.coordinator?.profilePicture || "https://i.pravatar.cc/150?u=coord"} className="object-cover" />
                                            <AvatarFallback className="bg-[#221E33] text-white font-bold">C</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 bg-[#0DAC87] text-white p-0.5 rounded-full shadow-sm">
                                            <ShieldCheck size={12} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[#221E33] font-black text-xl tracking-tight">€{tripData?.perHeadPrice || "1,250"}</span>
                                            <span className="text-[#666373] text-[10px] uppercase font-bold tracking-wider pt-1">Person</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="size-1.5 rounded-full bg-[#0DAC87] animate-pulse" />
                                            <span className="text-[#0DAC87] text-[10px] font-bold uppercase tracking-widest">Confirmed Trip</span>
                                        </div>
                                    </div>
                                </div>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="bg-[#0DAC87] hover:bg-[#119b7b] text-white h-12 px-6 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#0DAC87]/20 transition-all active:scale-95">
                                            <Zap size={16} fill="currentColor" />
                                            Join Now
                                        </Button>
                                    </DialogTrigger>
                                    <ApplicationForm />
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Daybyday;
