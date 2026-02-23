import { useEffect, useRef, useState } from "react";
import day1 from "../../../assets/day1.png";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";
import { ShieldCheck, Zap, MapPin } from "lucide-react";

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

// ─── Numbered Day Marker ──────────────────────────────────────────────────────
const createDayIcon = (dayNumber: number, isActive: boolean) =>
    L.divIcon({
        className: "",
        iconAnchor: [20, 20],
        popupAnchor: [0, -24],
        html: `
            <div style="
                width: 40px;
                height: 40px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                background: ${isActive ? "#0DAC87" : "#221E33"};
                border: 3px solid ${isActive ? "#0DAC87" : "#221E33"};
                box-shadow: 0 4px 14px rgba(0,0,0,0.25);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s, border-color 0.3s;
            ">
                <span style="
                    transform: rotate(45deg);
                    color: white;
                    font-weight: 800;
                    font-size: 14px;
                    font-family: 'Quicksand', sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                ">${dayNumber}</span>
            </div>
        `,
    });

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getImageUrl = (img: string | null) => {
    if (!img) return day1;
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_API_URL || ""}/uploads/${img}`;
};

interface DaybydayProps {
    trip?: any;
}

// ─── FlyToActive: smoothly pans map to the active day's coordinate ────────────
const FlyToActive = ({
    coords,
    activeDayIndex,
}: {
    coords: ([number, number] | null)[];
    activeDayIndex: number;
}) => {
    const map = useMap();
    const prevIndex = useRef<number>(-1);

    useEffect(() => {
        const coord = coords[activeDayIndex];
        if (!coord) return;
        // Only fly if something actually changed
        if (prevIndex.current === activeDayIndex) return;
        prevIndex.current = activeDayIndex;
        map.flyTo(coord, Math.max(map.getZoom(), 8), { animate: true, duration: 1.2 });
    }, [activeDayIndex, coords, map]);

    return null;
};

// ─── FitBounds: auto-zoom to show all geocoded markers ──────────────────────
// Refits every time positions array changes length (so Day 1 is included)
const FitBounds = ({ positions }: { positions: [number, number][] }) => {
    const map = useMap();
    const lastLen = useRef(0);

    useEffect(() => {
        if (positions.length === 0) return;
        if (positions.length === lastLen.current) return; // nothing new
        lastLen.current = positions.length;

        if (positions.length > 1) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, { padding: [55, 55], maxZoom: 10 });
        } else {
            map.setView(positions[0], 9);
        }
    }, [positions, map]);

    return null;
};

// ─── Geocoding ────────────────────────────────────────────────────────────────
// Primary  : Photon (komoot) — no API key, no rate limit, fast
// Fallback : Nominatim (OpenStreetMap) — 1 req/sec limit
// Only successful coords are cached; nulls are never cached so retries work.
const geocodeCache = new Map<string, [number, number]>();

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Try Photon API first (no rate limit), fall back to Nominatim */
const geocodeSingle = async (query: string): Promise<[number, number] | null> => {
    const key = query.toLowerCase().trim();
    if (geocodeCache.has(key)) return geocodeCache.get(key)!;

    // ── Strategy 1: Photon by Komoot (fast, CORS-enabled, no rate limit) ──
    try {
        const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1&lang=en`;
        const res = await fetch(photonUrl);
        if (res.ok) {
            const data = await res.json();
            const feature = data?.features?.[0];
            if (feature) {
                const [lon, lat] = feature.geometry.coordinates;
                const coord: [number, number] = [lat, lon];
                geocodeCache.set(key, coord);
                return coord;
            }
        }
    } catch (_) { }

    // ── Strategy 2: Nominatim fallback ────────────────────────────────────
    try {
        const nomUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&accept-language=en`;
        const res = await fetch(nomUrl);
        if (res.ok) {
            const data = await res.json();
            if (data?.length > 0) {
                const coord: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                geocodeCache.set(key, coord);
                return coord;
            }
        }
    } catch (_) { }

    return null; // Not cached — allow retry next render
};

// ─── Extract location name from the first line of a day description ───────────
// Handles these formats:
//   "Lahore – Group Assembly\n..."         → "Lahore"
//   "Day 1: Islamabad – Arrival\n..."       → "Islamabad"
//   "Sierra Nevada, Granada\nMorning..."    → "Sierra Nevada, Granada"
//   "Barcelona\nCity vibes..."              → "Barcelona"
const extractLocationHint = (description: string): string => {
    if (!description) return "";
    // Take only the first line
    const firstLine = description.split(/\n/)[0]?.trim() ?? "";
    // Remove "Day N", "Day N:", "Day N -" prefix
    const withoutDay = firstLine.replace(/^day\s*\d+\s*[:\-–]?\s*/i, "").trim();
    // Everything before the FIRST separator (– / - / :) is the location name
    const location = withoutDay.split(/\s*[–\-:]\s*/)[0].trim();
    return location || withoutDay;
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Daybyday = ({ trip }: DaybydayProps) => {
    const tripData = trip?.trip?.[0] || trip?.trip || trip;

    const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
    // dayCoords[i] = null means "not geocoded yet OR failed", [lat,lng] means success
    const [dayCoords, setDayCoords] = useState<([number, number] | null)[]>([]);
    const [geocodingDone, setGeocodingDone] = useState(false);

    // ── Parse itinerary ──────────────────────────────────────────────────────
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

    // ── Fallback: parse mapCoordinates field ─────────────────────────────────
    const getCoordinates = (coordString: string): [number, number] | null => {
        if (!coordString) return null;
        const parts = coordString.split(/[,\s]+/).map((p) => parseFloat(p.trim()));
        if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) return [parts[0], parts[1]];
        return null;
    };

    const spainCenter: [number, number] = [40.4637, -3.7492];
    const destinationCoord = getCoordinates(tripData?.mapCoordinates);

    // ── Geocode each day PROGRESSIVELY ───────────────────────────────────────
    // ONE request per day only — avoids rate-limit that caused Day 1 to fail.
    // Photon (primary) has no rate limit; Nominatim (fallback) needs 1 req/sec.
    // We add a 1.2s gap between days, which satisfies both providers.
    useEffect(() => {
        if (daysItinerary.length === 0) return;

        // Reset to all-null so previous trip's pins don't bleed through
        setDayCoords(new Array(daysItinerary.length).fill(null));
        setGeocodingDone(false);

        let cancelled = false;

        const geocodeAll = async () => {
            const tripCountry = tripData?.location?.name || tripData?.locationName || "";

            for (let i = 0; i < daysItinerary.length; i++) {
                if (cancelled) break;

                const hint = extractLocationHint(daysItinerary[i].description);
                if (!hint) {
                    // No location found in description — leave as null
                    continue;
                }

                // Build ONE smart query (avoid "Lahore, Lahore" if country == city)
                const isRedundant =
                    tripCountry && tripCountry.toLowerCase().trim() === hint.toLowerCase().trim();
                const searchQuery =
                    tripCountry && !isRedundant ? `${hint}, ${tripCountry}` : hint;

                // Single geocode call (Photon → Nominatim internally)
                const coord = await geocodeSingle(searchQuery);

                if (cancelled) break;

                // ✅ Update state immediately — pin appears as soon as resolved
                setDayCoords((prev) => {
                    const next = [...prev];
                    next[i] = coord;
                    return next;
                });

                // 1.2s gap — safe for both Photon (no limit) and Nominatim (1/sec)
                if (i < daysItinerary.length - 1) {
                    await delay(1200);
                }
            }

            if (!cancelled) setGeocodingDone(true);
        };

        geocodeAll();

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripData?.id]);

    if (daysItinerary.length === 0) return null;

    // ── Compute map state ────────────────────────────────────────────────────
    const validCoords = dayCoords.filter((c): c is [number, number] => c !== null);

    const mapCenter: [number, number] =
        validCoords.length > 0
            ? validCoords[0]
            : destinationCoord || spainCenter;

    const activeCoord = dayCoords[activeDayIndex];

    // Route polyline — only between days that have coords, in order
    const polylinePath: [number, number][] = dayCoords.filter(
        (c): c is [number, number] => c !== null
    );

    return (
        <div className="py-16">
            <h3 className="text-[#221E33] font-bold text-3xl mb-12 font-quicksand tracking-tight">
                Itinerary
            </h3>
            <div className="flex lg:flex-row flex-col gap-12">

                {/* ── Left: Accordion ─────────────────────────────────────── */}
                <div className="w-full lg:w-[58%]">
                    <Accordion
                        type="single"
                        collapsible
                        defaultValue="item-0"
                        onValueChange={(val) => {
                            const idx = parseInt(val.replace("item-", ""));
                            if (!isNaN(idx)) setActiveDayIndex(idx);
                        }}
                        className="w-full space-y-4"
                    >
                        {daysItinerary.map((day: any, index: number) => {
                            const dayNumber = day.day ?? index + 1;
                            const dayDescription = day.description || "No description available.";
                            const descriptionLines = dayDescription.split("\n").filter((line: string) => line.trim());
                            const dayTitle = descriptionLines[0]?.trim() || `Day ${dayNumber}`;
                            const dayContent = descriptionLines.slice(1).join("\n") || dayDescription;
                            const isActive = activeDayIndex === index;
                            // null = not geocoded yet, [lat,lng] = success
                            const coordState = dayCoords[index];
                            const isPinned = coordState !== null && coordState !== undefined;

                            return (
                                <AccordionItem
                                    key={`day-${dayNumber}-${index}`}
                                    value={`item-${index}`}
                                    className="border border-[#ECECF1] rounded-[20px] px-6 py-2 overflow-hidden bg-white shadow-sm data-[state=open]:border-[#0DAC87] transition-all duration-300"
                                >
                                    <AccordionTrigger className="hover:no-underline py-4 group">
                                        <div className="flex items-center gap-5">
                                            {/* Day number badge */}
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive
                                                    ? "bg-[#0DAC87]"
                                                    : "bg-[#E6F7F3] group-data-[state=open]:bg-[#0DAC87]"
                                                    }`}
                                            >
                                                <span
                                                    className={`font-bold text-lg font-quicksand transition-colors ${isActive
                                                        ? "text-white"
                                                        : "text-[#0DAC87] group-data-[state=open]:text-white"
                                                        }`}
                                                >
                                                    {dayNumber}
                                                </span>
                                            </div>

                                            <div className="flex flex-col items-start gap-0.5">
                                                <span className="text-[#221E33] font-bold text-xl font-quicksand group-hover:text-[#0DAC87] transition-colors text-left">
                                                    {dayTitle}
                                                </span>

                                                {/* Map pin status badge */}
                                                <span
                                                    className={`text-[11px] font-semibold flex items-center gap-1 transition-all ${!geocodingDone && !isPinned
                                                        ? "text-[#ccc] animate-pulse"
                                                        : isPinned
                                                            ? "text-[#0DAC87]"
                                                            : "text-[#bbb]"
                                                        }`}
                                                >
                                                    <MapPin size={11} />
                                                    {!geocodingDone && !isPinned
                                                        ? "Locating…"
                                                        : isPinned
                                                            ? "Pinned on map"
                                                            : "Location not found"}
                                                </span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="pt-2 pb-6">
                                        <div className="pl-[60px] space-y-6">
                                            <p className="text-[#514D4D] text-base leading-[1.8] whitespace-pre-line font-quicksand">
                                                {dayContent}
                                            </p>
                                            {day.image && (
                                                <div className="rounded-2xl overflow-hidden shadow-md border border-[#ECECF1]">
                                                    <img
                                                        src={getImageUrl(day.image)}
                                                        alt={`Day ${dayNumber}`}
                                                        className="w-full h-auto object-cover max-h-[400px] hover:scale-[1.02] transition-transform duration-700"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = "none";
                                                        }}
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

                {/* ── Right: Map ──────────────────────────────────────────── */}
                <div className="w-full lg:w-[42%] flex flex-col items-stretch lg:sticky lg:top-28 h-fit lg:max-h-[calc(100vh-160px)]">
                    <div className="relative aspect-square md:aspect-video lg:aspect-[4/5] rounded-[30px] overflow-hidden border border-[#ECECF1] shadow-2xl group/map">
                        <MapContainer
                            center={mapCenter}
                            zoom={5}
                            scrollWheelZoom={false}
                            style={{ height: "100%", width: "100%", zIndex: 0 }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            {/* ✅ Auto-fit all day markers once geocoding done */}
                            {geocodingDone && validCoords.length > 0 && (
                                <FitBounds positions={validCoords} />
                            )}

                            {/* ✅ Fly to whichever day is active in the accordion */}
                            <FlyToActive coords={dayCoords} activeDayIndex={activeDayIndex} />

                            {/* ── Dashed route polyline ─────────────────────── */}
                            {polylinePath.length > 1 && (
                                <Polyline
                                    positions={polylinePath}
                                    color="#0DAC87"
                                    weight={3}
                                    opacity={0.55}
                                    dashArray="8, 10"
                                />
                            )}

                            {/* ── Numbered day markers (appear progressively) ── */}
                            {daysItinerary.map((day: any, index: number) => {
                                const coord = dayCoords[index];
                                if (!coord) return null;
                                const dayNumber = day.day ?? index + 1;
                                const descLines = day.description?.split("\n").filter((l: string) => l.trim()) ?? [];
                                const popupTitle = descLines[0]?.trim() || `Day ${dayNumber}`;
                                const isActive = activeDayIndex === index;

                                return (
                                    <Marker
                                        key={`marker-day-${dayNumber}`}
                                        position={coord}
                                        icon={createDayIcon(dayNumber, isActive)}
                                        eventHandlers={{
                                            click: () => setActiveDayIndex(index),
                                        }}
                                    >
                                        <Popup>
                                            <div style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                                    <div style={{
                                                        width: "22px", height: "22px", borderRadius: "50%",
                                                        background: "#0DAC87", display: "flex", alignItems: "center",
                                                        justifyContent: "center",
                                                    }}>
                                                        <span style={{ color: "white", fontSize: "11px", fontWeight: 800 }}>{dayNumber}</span>
                                                    </div>
                                                    <span style={{ fontWeight: 700, color: "#221E33", fontSize: "13px" }}>Day {dayNumber}</span>
                                                </div>
                                                <p style={{ color: "#514D4D", fontSize: "11px", lineHeight: "1.5", maxWidth: "180px", margin: 0 }}>
                                                    {popupTitle}
                                                </p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                            {/* Fallback: no geocoded coords yet — show raw coord if available */}
                            {validCoords.length === 0 && destinationCoord && (
                                <Marker position={destinationCoord}>
                                    <Popup>Trip Destination</Popup>
                                </Marker>
                            )}
                        </MapContainer>

                        {/* Geocoding in-progress pill */}
                        {!geocodingDone && (
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[20] bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-[#ECECF1] flex items-center gap-2 pointer-events-none">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#0DAC87] animate-ping" />
                                <span className="text-[#221E33] text-xs font-semibold font-quicksand">
                                    Pinning day stops…
                                </span>
                            </div>
                        )}

                        {/* Map Legend (top-left) — only once geocoding completes */}
                        {geocodingDone && validCoords.length > 0 && (
                            <div className="absolute top-3 left-3 z-[20] bg-white/95 backdrop-blur-sm px-3 py-2.5 rounded-xl shadow-md border border-[#ECECF1]">
                                <p className="text-[9px] text-[#999] font-bold uppercase tracking-widest font-quicksand mb-2">
                                    Route
                                </p>
                                <div className="flex flex-col gap-1">
                                    {daysItinerary.map((day: any, index: number) => {
                                        const dayNumber = day.day ?? index + 1;
                                        const isPinned = !!dayCoords[index];
                                        const descLines = day.description?.split("\n").filter((l: string) => l.trim()) ?? [];
                                        const label =
                                            descLines[0]
                                                ?.replace(/^day\s*\d+[\s:\-–]*/i, "")
                                                .split(/[\s]*[–\-:]\s*/)[0]
                                                .trim() || `Day ${dayNumber}`;

                                        return (
                                            <button
                                                key={`legend-${index}`}
                                                onClick={() => setActiveDayIndex(index)}
                                                className={`flex items-center gap-2 text-left rounded-lg px-2 py-0.5 transition-all ${activeDayIndex === index ? "bg-[#E6F7F3]" : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white transition-colors ${isPinned ? "bg-[#0DAC87]" : "bg-[#ccc]"
                                                        }`}
                                                >
                                                    {dayNumber}
                                                </div>
                                                <span
                                                    className={`text-[10px] font-quicksand max-w-[100px] truncate font-semibold ${activeDayIndex === index ? "text-[#0DAC87]" : "text-[#514D4D]"
                                                        }`}
                                                >
                                                    {label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Floating price card */}
                        <div className="absolute bottom-6 left-6 right-6 z-[10] group-hover/map:translate-y-[-4px] transition-transform duration-500">
                            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="w-12 h-12 border-2 border-[#0DAC87] shadow-sm">
                                            <AvatarImage
                                                src={tripData?.coordinator?.profilePicture || "https://i.pravatar.cc/150?u=coord"}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="bg-[#221E33] text-white font-bold">C</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 bg-[#0DAC87] text-white p-0.5 rounded-full shadow-sm">
                                            <ShieldCheck size={12} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[#221E33] font-black text-xl tracking-tight">
                                                €{tripData?.perHeadPrice || "1,250"}
                                            </span>
                                            <span className="text-[#666373] text-[10px] uppercase font-bold tracking-wider pt-1">
                                                Person
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="size-1.5 rounded-full bg-[#0DAC87] animate-pulse" />
                                            <span className="text-[#0DAC87] text-[10px] font-bold uppercase tracking-widest">
                                                Confirmed Trip
                                            </span>
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

                    {/* Active day info card below map */}
                    {activeCoord && (
                        <div className="mt-4 flex items-center gap-3 bg-[#E6F7F3] border border-[#0DAC87]/20 rounded-2xl px-5 py-4 transition-all duration-300">
                            <div className="w-9 h-9 rounded-full bg-[#0DAC87] flex items-center justify-center shrink-0 shadow-sm">
                                <span className="text-white font-bold text-sm">
                                    {daysItinerary[activeDayIndex]?.day ?? activeDayIndex + 1}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-[#156250] font-bold uppercase tracking-wider font-quicksand">
                                    Viewing on map
                                </p>
                                <p className="text-[#221E33] font-bold text-sm font-quicksand truncate">
                                    {(() => {
                                        const d = daysItinerary[activeDayIndex];
                                        const lines = d?.description?.split("\n").filter((l: string) => l.trim()) ?? [];
                                        return (
                                            lines[0]?.replace(/^day\s*\d+[\s:\-–]*/i, "").trim() ||
                                            `Day ${d?.day ?? activeDayIndex + 1}`
                                        );
                                    })()}
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#0DAC87] shrink-0">
                                <MapPin size={13} />
                                <span className="text-[10px] font-semibold font-quicksand">
                                    {activeCoord[0].toFixed(2)}°, {activeCoord[1].toFixed(2)}°
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Daybyday;
