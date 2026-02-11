// import { useEffect, useState, useMemo } from "react";
// import { UsegetOpenTrips, type OpenTrip } from "@/hooks/getOpenTripshook";
// import { LoaderIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { FaLocationDot } from "react-icons/fa6";

// const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

// interface UpcomingtripsProps {
//     searchQuery: string;
//     setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
//     category: string;
// }
// type CalendarCell = {
//     dayNumber: number | null;
//     isCurrentMonth: boolean;
// };

// function buildMonthGrid(daysInMonth: number, startDayIndexMondayBased: number): { weeks: CalendarCell[][]; totalCells: number } {
//     const needsSixRows = daysInMonth + startDayIndexMondayBased > 35;
//     const totalCells = needsSixRows ? 42 : 35;
//     const cells: CalendarCell[] = [];

//     for (let i = 0; i < startDayIndexMondayBased; i++) {
//         cells.push({ dayNumber: null, isCurrentMonth: false });
//     }
//     for (let day = 1; day <= daysInMonth; day++) {
//         cells.push({ dayNumber: day, isCurrentMonth: true });
//     }
//     let nextMonthDay = 1;
//     while (cells.length < totalCells) {
//         cells.push({ dayNumber: nextMonthDay++, isCurrentMonth: false });
//     }

//     const weeks: CalendarCell[][] = [];
//     for (let i = 0; i < totalCells; i += 7) {
//         weeks.push(cells.slice(i, i + 7));
//     }
//     return { weeks, totalCells };
// }

// /** Returns true if trip overlaps any of the given dates (YYYY-MM-DD). */
// function tripOverlapsDates(trip: OpenTrip, selectedDates: string[]): boolean {
//     if (selectedDates.length === 0) return true;
//     const start = new Date(trip.startDate);
//     const end = new Date(trip.endDate);
//     start.setHours(0, 0, 0, 0);
//     end.setHours(23, 59, 59, 999);
//     for (const dStr of selectedDates) {
//         const d = new Date(dStr);
//         d.setHours(0, 0, 0, 0);
//         const t = d.getTime();
//         if (t >= start.getTime() && t <= end.getTime()) return true;
//     }
//     return false;
// }

// /** Returns true if trip name/location matches search query (case-insensitive). */
// function tripMatchesSearch(trip: OpenTrip, query: string): boolean {
//     if (!query.trim()) return true;
//     const q = query.trim().toLowerCase();
//     const name = (trip.name || trip.title || "").toLowerCase();
//     const location = (trip.location || "").toLowerCase();
//     return name.includes(q) || location.includes(q);
// }

// /** Returns true if trip matches category filter. */
// function tripMatchesCategory(trip: OpenTrip, category: string): boolean {
//     if (!category.trim()) return true;
//     return (trip.category || "").toLowerCase() === category.trim().toLowerCase();
// }

// const Upcomingtrips = ({ searchQuery, setSearchQuery, category }: UpcomingtripsProps) => {
//     const navigate = useNavigate();
//     const [viewDate, setViewDate] = useState(() => {
//         const d = new Date();
//         return new Date(d.getFullYear(), d.getMonth(), 1);
//     });

//     const { data, isLoading } = UsegetOpenTrips();
//     const allTrips = data?.trips ?? [];

//     const year = viewDate.getFullYear();
//     const monthIndex = viewDate.getMonth();

//     const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//     const firstDaySundayBased = new Date(year, monthIndex, 1).getDay();
//     const startDayIndex = (firstDaySundayBased + 6) % 7;
//     const { weeks, totalCells } = buildMonthGrid(daysInMonth, startDayIndex);

//     const monthTitle = new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(viewDate);

//     function goToPrevMonth() {
//         setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
//     }
//     function goToNextMonth() {
//         setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
//     }

//     // Compute the second weekend (Sat+Sun) of the current month
//     function getSecondWeekendDays(): { saturday: number | null; sunday: number | null } {
//         let saturdayCount = 0;
//         for (let day = 1; day <= daysInMonth; day++) {
//             const dow = new Date(year, monthIndex, day).getDay();
//             if (dow === 6) {
//                 saturdayCount += 1;
//                 if (saturdayCount === 2) {
//                     const sun = day + 1 <= daysInMonth ? day + 1 : null;
//                     return { saturday: day, sunday: sun };
//                 }
//             }
//         }
//         return { saturday: null, sunday: null };
//     }

//     const secondWeekend = getSecondWeekendDays();

//     const [selectedDays, setSelectedDays] = useState<number[]>([]);

//     useEffect(() => {
//         setSelectedDays([]);
//     }, [year, monthIndex]);

//     const selectedDates = useMemo(() => {
//         return selectedDays.map((day) => {
//             const d = new Date(year, monthIndex, day);
//             return d.toISOString().slice(0, 10);
//         });
//     }, [year, monthIndex, selectedDays]);

//     const filteredTrips = useMemo(() => {
//         return allTrips.filter(
//             (trip: OpenTrip) =>
//                 tripMatchesSearch(trip, searchQuery) &&
//                 tripMatchesCategory(trip, category) &&
//                 tripOverlapsDates(trip, selectedDates)
//         );
//     }, [allTrips, searchQuery, category, selectedDates]);

//     function toggleSelected(day: number | null | undefined) {
//         if (!day) return;
//         setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
//     }

//     return (
//         <div className="bg-[#F6F8FD] px-4 sm:px-16 py-8">
//             <div className="flex flex-col justify-center items-center gap-2">
//                 <h4 className="text-center bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold lg:text-4xl">Upcoming Wild Weekends & Trips</h4>
//                 <span className="text-center text-[#221E33] text-[12px] lg:text-[14px]">Browse all our upcoming adventures at a glance. See available weekends and trips directly on the <br className="hidden lg:block" /> calendar.</span>
//             </div>

//             <div className="mt-8 flex lg:flex-row flex-col justify-center lg:items-start items-center gap-6">
//                 {/* Left sidebar: mini calendar + search */}
//                 <div className="w-64 space-y-4">
//                     <div className="rounded-2xl p-4">
//                         <div className="flex items-center justify-between mb-3">
//                             <div className="text-4xl font-bold text-[#221E33]">{monthTitle}</div>
//                             <div className="flex items-center gap-1">
//                                 <button aria-label="Previous month" onClick={goToPrevMonth} className="w-6 h-6 grid place-items-center rounded-full bg-[#666373] hover:bg-[#595763] text-[#FFFFFF] cursor-pointer">
//                                     <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                                 </button>
//                                 <button aria-label="Next month" onClick={goToNextMonth} className="w-6 h-6 grid place-items-center rounded-full bg-[#666373] hover:bg-[#595763] text-[#FFFFFF] cursor-pointer">
//                                     <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-7 text-[11px] text-[#565070] mb-1">
//                             {WEEKDAY_LABELS.map((label) => (
//                                 <div key={`mini-label-${label}`} className="text-center py-1">
//                                     {label}
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="grid grid-cols-7 gap-1">
//                             {weeks.flat().map((cell, idx) => {
//                                 const isWildWeekend = cell.isCurrentMonth && (cell.dayNumber === secondWeekend.saturday || cell.dayNumber === secondWeekend.sunday);
//                                 const isMuted = !cell.isCurrentMonth;
//                                 let classes = "aspect-square rounded-lg text-xs text-[#221E33] flex items-center justify-center ";
//                                 classes += isWildWeekend ? "text-[#165E52] " : "";
//                                 classes += isMuted ? "text-[#A0A3AD]" : "text-[#221E33]";

//                                 return (
//                                     <div key={`mini-cell-${idx}`} className={classes}>
//                                         {cell.dayNumber}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     <div className="relative">
//                         <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#565070]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="1.6" />
//                             <path d="m21 21-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
//                         </svg>
//                         <input
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full pl-10 pr-3 py-2 bg-white rounded-[12px] shadow-sm placeholder-[#A0A3AD] text-sm text-[#221E33] outline-none"
//                             placeholder="Search Place"
//                         />
//                     </div>
//                 </div>

//                 {/* Main calendar */}
//                 <div className="flex-1 w-full">
//                     <div className="bg-white rounded-2xl">

//                         <div className="mt-6 grid grid-cols-7 text-sm text-[#565070] bg-[#F6F6F6] rounded-tl-[12px] rounded-tr-[12px]">
//                             {WEEKDAY_LABELS.map((label) => (
//                                 <div key={`label-${label}`} className="py-6 text-center border-l">
//                                     {label}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className={"grid grid-cols-7 " + (totalCells === 35 ? "grid-rows-5" : "grid-rows-6") + "relative"}>
//                             {weeks.flat().map((cell, idx) => {
//                                 const isMuted = !cell.isCurrentMonth;
//                                 const isClickable = cell.isCurrentMonth && cell.dayNumber !== null;
//                                 const isWildWeekend = cell.isCurrentMonth && (cell.dayNumber === secondWeekend.saturday || cell.dayNumber === secondWeekend.sunday);
//                                 const isSelected = cell.isCurrentMonth && cell.dayNumber !== null && selectedDays.includes(cell.dayNumber);

//                                 let classes = "h-24 border flex items-center justify-center text-2xl text-[#221E33] relative font-semibold";
//                                 if (isSelected) {
//                                     classes += "bg-emerald-300 border-emerald-400 text-[#165E52]";
//                                 } else if (isWildWeekend) {
//                                     classes += "bg-emerald-100 border-emerald-200";
//                                 } else {
//                                     classes += "bg-white border-[#ECECF1]";
//                                 }
//                                 classes += isMuted ? "text-[#A0A3AD]" : "text-[#221E33]";
//                                 classes += isClickable ? " cursor-pointer hover:bg-emerald-50" : "";

//                                 return (
//                                     <div
//                                         key={`cell-${idx}`}
//                                         className={classes}
//                                         onClick={() => (isClickable ? toggleSelected(cell.dayNumber) : undefined)}
//                                         aria-pressed={isSelected}
//                                     >
//                                         {cell.dayNumber}
//                                         {isWildWeekend && cell.dayNumber === secondWeekend.saturday && (
//                                             <span className="absolute mt-6 mr-auto ml-2 text-xs text-[#2A7765]">Wild Weekend</span>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Filtered trips list (search + date wise) - full width below calendar */}
//             <div className="mt-8 w-full">
//                 <div className="bg-white rounded-2xl p-4 sm:p-6">
//                     <h5 className="text-[#221E33] font-bold text-lg mb-3">
//                         {searchQuery.trim() || selectedDays.length > 0
//                             ? `Trips matching your selection (${filteredTrips.length})`
//                             : "All upcoming trips"}
//                     </h5>
//                     {isLoading ? (
//                         <div className="flex items-center justify-center py-10">
//                             <LoaderIcon className="animate-spin h-8 w-8 text-[#0DAC87]" />
//                         </div>
//                     ) : filteredTrips.length === 0 ? (
//                         <div className="text-center py-10">
//                             <p className="text-[#666373] text-base font-medium">
//                                 {allTrips.length === 0
//                                     ? "More information coming soon."
//                                     : "No trips match your search or selected dates. Try a different place or pick other dates."}
//                             </p>
//                         </div>
//                     ) : (
//                         <ul className="space-y-3 max-h-80 overflow-y-auto">
//                             {filteredTrips.map((trip: OpenTrip, index: number) => (
//                                 <li
//                                     key={`${trip.id}-${index}`}
//                                     onClick={() => navigate(`/trip/${trip.id}`)}
//                                     className="flex items-center gap-3 p-3 rounded-xl border border-[#ECECF1] hover:bg-[#F6F8FD] cursor-pointer transition-colors"
//                                 >
//                                     <img
//                                         src={trip.coverImage || ""}
//                                         alt={trip.name || trip.title}
//                                         className="h-14 w-14 rounded-lg object-cover shrink-0 bg-[#ECECF1]"
//                                         onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
//                                     />
//                                     <div className="min-w-0 flex-1">
//                                         <p className="font-semibold text-[#221E33] truncate">{trip.name || trip.title}</p>
//                                         <div className="flex items-center gap-1.5 text-[#666373] text-sm">
//                                             <FaLocationDot className="shrink-0" />
//                                             <span className="truncate">{trip.location}</span>
//                                         </div>
//                                     </div>
//                                     <span className="text-[#666373] text-sm shrink-0">
//                                         {trip.startDate ? new Date(trip.startDate).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : ""}
//                                     </span>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Upcomingtrips;



import { useEffect, useState, useMemo } from "react";
import { UsegetTrips } from "@/hooks/gettriphook";
import { type OpenTrip } from "@/hooks/getOpenTripshook";
import { LoaderIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

// Extended color palette for unique trip colors
const TRIP_COLORS = [
    { color: "#EF4444", bg: "#FEE2E2", name: "red" },      // Red
    { color: "#10B981", bg: "#D1FAE5", name: "green" },     // Green
    { color: "#F59E0B", bg: "#FEF3C7", name: "yellow" },   // Yellow/Orange
    { color: "#3B82F6", bg: "#DBEAFE", name: "blue" },     // Blue
    { color: "#8B5CF6", bg: "#EDE9FE", name: "purple" },   // Purple
    { color: "#EC4899", bg: "#FCE7F3", name: "pink" },     // Pink
    { color: "#06B6D4", bg: "#CFFAFE", name: "cyan" },     // Cyan
    { color: "#84CC16", bg: "#ECFCCB", name: "lime" },     // Lime
    { color: "#F97316", bg: "#FFEDD5", name: "orange" },   // Orange
    { color: "#14B8A6", bg: "#CCFBF1", name: "teal" },     // Teal
    { color: "#6366F1", bg: "#E0E7FF", name: "indigo" },   // Indigo
    { color: "#A855F7", bg: "#F3E8FF", name: "violet" },  // Violet
    { color: "#E11D48", bg: "#FEE2E2", name: "rose" },     // Rose
    { color: "#0EA5E9", bg: "#E0F2FE", name: "sky" },      // Sky
    { color: "#22C55E", bg: "#D1FAE5", name: "emerald" },  // Emerald
    { color: "#FACC15", bg: "#FEF9C3", name: "amber" },    // Amber
];

// Generate a consistent hash from trip ID to get unique color
function hashTripId(tripId: string): number {
    let hash = 0;
    for (let i = 0; i < tripId.length; i++) {
        const char = tripId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Get unique color for each trip based on its ID
function getTripColor(trip: OpenTrip): { color: string; bg: string } {
    // Use trip ID to generate a consistent, unique color
    const tripId = trip.id || trip.name || trip.title || "";
    const hash = hashTripId(tripId);
    const colorIndex = hash % TRIP_COLORS.length;
    return TRIP_COLORS[colorIndex];
}

interface UpcomingtripsProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    category: string;
}
type CalendarCell = {
    dayNumber: number | null;
    isCurrentMonth: boolean;
    date: Date | null; // Add date for easier trip matching
};

function buildMonthGrid(year: number, monthIndex: number, daysInMonth: number, startDayIndexMondayBased: number): { weeks: CalendarCell[][]; totalCells: number } {
    const needsSixRows = daysInMonth + startDayIndexMondayBased > 35;
    const totalCells = needsSixRows ? 42 : 35;
    const cells: CalendarCell[] = [];

    // Previous month days
    const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1;
    const prevYear = monthIndex === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    for (let i = startDayIndexMondayBased - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const date = new Date(prevYear, prevMonth, day);
        cells.push({ dayNumber: day, isCurrentMonth: false, date });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, monthIndex, day);
        cells.push({ dayNumber: day, isCurrentMonth: true, date });
    }
    
    // Next month days
    const nextMonth = monthIndex === 11 ? 0 : monthIndex + 1;
    const nextYear = monthIndex === 11 ? year + 1 : year;
    let nextMonthDay = 1;
    while (cells.length < totalCells) {
        const date = new Date(nextYear, nextMonth, nextMonthDay);
        cells.push({ dayNumber: nextMonthDay++, isCurrentMonth: false, date });
    }

    const weeks: CalendarCell[][] = [];
    for (let i = 0; i < totalCells; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }
    return { weeks, totalCells };
}


/** Returns true if trip overlaps any of the given dates (YYYY-MM-DD). */
function tripOverlapsDates(trip: OpenTrip, selectedDates: string[]): boolean {
    if (selectedDates.length === 0) return true;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    for (const dStr of selectedDates) {
        const d = new Date(dStr);
        d.setHours(0, 0, 0, 0);
        const t = d.getTime();
        if (t >= start.getTime() && t <= end.getTime()) return true;
    }
    return false;
}

/** Returns true if trip name/location matches search query (case-insensitive). */
function tripMatchesSearch(trip: OpenTrip, query: string): boolean {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    const name = (trip.name || trip.title || "").toLowerCase();
    const location = (trip.location || "").toLowerCase();
    return name.includes(q) || location.includes(q);
}

/** Returns true if trip matches category filter. */
function tripMatchesCategory(trip: OpenTrip, category: string): boolean {
    if (!category.trim()) return true;
    const tripCategory = (trip.category || trip.type || "").toLowerCase().trim();
    const filterCategory = category.trim().toLowerCase();
    // Check for exact match or if category contains the filter (for "Erasmus Experience" matching "erasmus")
    return tripCategory === filterCategory || tripCategory.includes(filterCategory) || filterCategory.includes(tripCategory);
}


/** Get local date string (YYYY-MM-DD) without timezone issues */
function getLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/** Get trips that occur on a specific date */
function getTripsForDate(trips: OpenTrip[], date: Date): OpenTrip[] {
    const targetDateStr = getLocalDateString(date);
    
    return trips.filter((trip) => {
        if (!trip.startDate || !trip.endDate) return false;
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);
        
        const startStr = getLocalDateString(start);
        const endStr = getLocalDateString(end);
        
        return targetDateStr >= startStr && targetDateStr <= endStr;
    });
}

const Upcomingtrips = ({ searchQuery, setSearchQuery, category }: UpcomingtripsProps) => {
    const navigate = useNavigate();
    const [viewDate, setViewDate] = useState(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const { data, isLoading } = UsegetTrips();
    const allTrips = data?.trips ?? [];

    const year = viewDate.getFullYear();
    const monthIndex = viewDate.getMonth();

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDaySundayBased = new Date(year, monthIndex, 1).getDay();
    const startDayIndex = (firstDaySundayBased + 6) % 7;
    const { weeks, totalCells } = buildMonthGrid(year, monthIndex, daysInMonth, startDayIndex);

    const monthTitle = new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(viewDate);

    function goToPrevMonth() {
        setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    }
    function goToNextMonth() {
        setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    }

    // Compute the second weekend (Sat+Sun) of the current month
    function getSecondWeekendDays(): { saturday: number | null; sunday: number | null } {
        let saturdayCount = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const dow = new Date(year, monthIndex, day).getDay();
            if (dow === 6) {
                saturdayCount += 1;
                if (saturdayCount === 2) {
                    const sun = day + 1 <= daysInMonth ? day + 1 : null;
                    return { saturday: day, sunday: sun };
                }
            }
        }
        return { saturday: null, sunday: null };
    }

    const secondWeekend = getSecondWeekendDays();

    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [clickedDate, setClickedDate] = useState<Date | null>(null);
    const [showTripPopup, setShowTripPopup] = useState(false);

    useEffect(() => {
        setSelectedDays([]);
        setClickedDate(null);
        setShowTripPopup(false);
    }, [year, monthIndex]);

    const selectedDates = useMemo(() => {
        return selectedDays.map((day) => {
            const d = new Date(year, monthIndex, day);
            return d.toISOString().slice(0, 10);
        });
    }, [year, monthIndex, selectedDays]);

    const filteredTrips = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today for accurate comparison

        let trips = allTrips.filter(
            (trip: OpenTrip) => {
                // Filter out past trips - only show upcoming trips (endDate >= today)
                if (trip.endDate) {
                    const endDate = new Date(trip.endDate);
                    endDate.setHours(0, 0, 0, 0);
                    if (endDate < today) {
                        return false; // Skip past trips
                    }
                }
                
                return (
                    tripMatchesSearch(trip, searchQuery) &&
                    tripMatchesCategory(trip, category) &&
                    tripOverlapsDates(trip, selectedDates)
                );
            }
        );

        // Remove trips that are true duplicates (same trip ID only)
        // Show all trips even if they have overlapping dates - different trips can have same dates
        const seenTripIds = new Set<string>();
        trips = trips.filter((trip: OpenTrip) => {
            // Only filter by trip ID - allow multiple trips with same dates
            if (seenTripIds.has(trip.id)) {
                return false; // Skip duplicate trip IDs
            }
            seenTripIds.add(trip.id);
            return true;
        });

        return trips;
    }, [allTrips, searchQuery, category, selectedDates]);

    // Get trips that overlap each date (for coloring calendar cells) - show ALL trips (past + upcoming)
    const tripsByDate = useMemo(() => {
        const map = new Map<string, OpenTrip[]>();
        const flatCells = weeks.flat();
        
        flatCells.forEach((cell) => {
            if (!cell.date) return;
            const dateStr = getLocalDateString(cell.date);
            const tripsForDate = getTripsForDate(allTrips, cell.date);
            if (tripsForDate.length > 0) {
                map.set(dateStr, tripsForDate);
            }
        });
        
        return map;
    }, [allTrips, weeks]);

    // Get trips starting on each date (for badges) - show ALL trips (past + upcoming)
    const tripsByStartDate = useMemo(() => {
        const map = new Map<string, OpenTrip[]>();
        allTrips.forEach((trip: OpenTrip) => {
            if (!trip.startDate) return;
            const startDate = new Date(trip.startDate);
            const dateStr = getLocalDateString(startDate);
            if (!map.has(dateStr)) {
                map.set(dateStr, []);
            }
            map.get(dateStr)!.push(trip);
        });
        return map;
    }, [allTrips]);

    function handleDateClick(day: number | null | undefined, cellDate: Date | null) {
        if (!day || !cellDate) return;
        
        // Get ALL trips (past + upcoming) for this date
        const tripsForDate = getTripsForDate(allTrips, cellDate);
        
        if (tripsForDate.length > 0) {
            // Show modal with trip info
            setClickedDate(cellDate);
            setShowTripPopup(true);
        } else {
            // Toggle selection for filtering
            setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
        }
    }

    const tripsForClickedDate = useMemo(() => {
        if (!clickedDate) return [];
        return getTripsForDate(allTrips, clickedDate);
    }, [clickedDate, allTrips]);

    return (
        <div className="bg-[#F6F8FD] px-4 sm:px-16 py-8">
            <div className="flex flex-col justify-center items-center gap-2">
                <h4 className="text-center bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold lg:text-4xl">Upcoming Wild Weekends & Trips</h4>
                <span className="text-center text-[#221E33] text-[12px] lg:text-[14px]">Browse all our upcoming adventures at a glance. See available weekends and trips directly on the <br className="hidden lg:block" /> calendar.</span>
            </div>

            <div className="mt-8 flex lg:flex-row flex-col justify-center lg:items-start items-center gap-6">
                {/* Left sidebar: mini calendar + search */}
                <div className="w-64 space-y-4">
                    <div className="rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-4xl font-bold text-[#221E33]">{monthTitle}</div>
                            <div className="flex items-center gap-1">
                                <button aria-label="Previous month" onClick={goToPrevMonth} className="w-6 h-6 grid place-items-center rounded-full bg-[#666373] hover:bg-[#595763] text-[#FFFFFF] cursor-pointer">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                                <button aria-label="Next month" onClick={goToNextMonth} className="w-6 h-6 grid place-items-center rounded-full bg-[#666373] hover:bg-[#595763] text-[#FFFFFF] cursor-pointer">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 text-[11px] text-[#565070] mb-1">
                            {WEEKDAY_LABELS.map((label) => (
                                <div key={`mini-label-${label}`} className="text-center py-1">
                                    {label}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {weeks.flat().map((cell, idx) => {
                                const isWildWeekend = cell.isCurrentMonth && (cell.dayNumber === secondWeekend.saturday || cell.dayNumber === secondWeekend.sunday);
                                const isMuted = !cell.isCurrentMonth;
                                let classes = "aspect-square rounded-lg text-xs text-[#221E33] flex items-center justify-center ";
                                classes += isWildWeekend ? "text-[#165E52] " : "";
                                classes += isMuted ? "text-[#A0A3AD]" : "text-[#221E33]";

                                return (
                                    <div key={`mini-cell-${idx}`} className={classes}>
                                        {cell.dayNumber}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative">
                        <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#565070]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="1.6" />
                            <path d="m21 21-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 bg-white rounded-[12px] shadow-sm placeholder-[#A0A3AD] text-sm text-[#221E33] outline-none"
                            placeholder="Search Place"
                        />
                    </div>
                </div>

                {/* Main calendar */}
                <div className="flex-1 w-full">
                    <div className="bg-white rounded-2xl">

                        <div className="mt-6 grid grid-cols-7 text-sm text-[#565070] bg-[#F6F6F6] rounded-tl-[12px] rounded-tr-[12px]">
                            {WEEKDAY_LABELS.map((label) => (
                                <div key={`label-${label}`} className="py-6 text-center border-l">
                                    {label}
                                </div>
                            ))}
                        </div>

                        <div className={"grid grid-cols-7 " + (totalCells === 35 ? "grid-rows-5" : "grid-rows-6") + "relative"}>
                            {weeks.flat().map((cell, idx) => {
                                const isMuted = !cell.isCurrentMonth;
                                const isClickable = cell.dayNumber !== null;
                                const isWildWeekend = cell.isCurrentMonth && (cell.dayNumber === secondWeekend.saturday || cell.dayNumber === secondWeekend.sunday);
                                const isSelected = cell.isCurrentMonth && cell.dayNumber !== null && selectedDays.includes(cell.dayNumber);
                                
                                // Get trips that overlap this date
                                const dateStr = cell.date ? getLocalDateString(cell.date) : null;
                                const tripsForThisDate = dateStr ? tripsByDate.get(dateStr) || [] : [];
                                
                                // Get trips starting on this date (for badges)
                                const tripsStartingHere = dateStr ? tripsByStartDate.get(dateStr) || [] : [];
                                
                                // Calculate cell background color based on trips
                                let cellStyle: React.CSSProperties = {};
                                let classes = "h-24 border-r border-b flex flex-col items-start justify-start text-2xl text-[#221E33] relative font-semibold pt-1.5 px-1.5";
                                
                                if (isSelected) {
                                    classes += " bg-emerald-300 border-emerald-400 text-[#165E52]";
                                } else if (tripsForThisDate.length > 0) {
                                    // Color the cell based on trips
                                    if (tripsForThisDate.length === 1) {
                                        // Single trip - full cell color
                                        const tripColor = getTripColor(tripsForThisDate[0]);
                                        cellStyle.backgroundColor = tripColor.bg;
                                        cellStyle.opacity = cell.isCurrentMonth ? 1 : 0.7;
                                    } else {
                                        // Multiple trips on same day - split the cell (half for each)
                                        const uniqueTrips = tripsForThisDate.slice(0, 2); // Take first 2 trips
                                        const colors = uniqueTrips.map((trip: OpenTrip) => {
                                            const tripColor = getTripColor(trip);
                                            return tripColor.bg;
                                        });
                                        
                                        if (colors.length === 2) {
                                            // Split horizontally: top half (first trip) and bottom half (second trip)
                                            cellStyle.background = `linear-gradient(to bottom, ${colors[0]} 0%, ${colors[0]} 50%, ${colors[1]} 50%, ${colors[1]} 100%)`;
                                            cellStyle.opacity = cell.isCurrentMonth ? 1 : 0.7;
                                        } else if (colors.length === 1) {
                                            cellStyle.backgroundColor = colors[0];
                                            cellStyle.opacity = cell.isCurrentMonth ? 1 : 0.7;
                                        }
                                    }
                                    classes += " border-[#ECECF1]";
                                } else if (isWildWeekend) {
                                    classes += " bg-emerald-50 border-emerald-200";
                                } else {
                                    classes += " bg-white border-[#ECECF1]";
                                }
                                
                                classes += isMuted ? " text-[#A0A3AD]" : " text-[#221E33]";
                                classes += isClickable ? " cursor-pointer hover:opacity-80" : "";

                                return (
                                    <div
                                        key={`cell-${idx}`}
                                        className={classes}
                                        style={cellStyle}
                                        onClick={() => (isClickable ? handleDateClick(cell.dayNumber, cell.date) : undefined)}
                                        aria-pressed={isSelected}
                                    >
                                        <span className="absolute top-1.5 left-1.5 text-lg font-semibold z-10">{cell.dayNumber}</span>
                                        
                                        {/* Show trip name badge on start date - clickable to open modal */}
                                        {tripsStartingHere.length > 0 && (
                                            <div className="absolute top-6 left-0 right-0 px-1.5 space-y-1 z-10">
                                                {tripsStartingHere.slice(0, 2).map((trip, tripIdx) => {
                                                    const tripColor = getTripColor(trip);
                                                    return (
                                                        <div
                                                            key={`badge-${trip.id}-${tripIdx}`}
                                                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md truncate w-full shadow-sm border cursor-pointer hover:opacity-90 transition-opacity"
                                                            style={{
                                                                backgroundColor: tripColor.bg,
                                                                color: tripColor.color,
                                                                borderColor: tripColor.color + "40",
                                                                opacity: cell.isCurrentMonth ? 1 : 0.8,
                                                            }}
                                                            title={`${trip.name || trip.title} - Click for details`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const tripStartDate = new Date(trip.startDate);
                                                                setClickedDate(tripStartDate);
                                                                setShowTripPopup(true);
                                                            }}
                                                        >
                                                            {trip.name || trip.title}
                                                        </div>
                                                    );
                                                })}
                                                {tripsStartingHere.length > 2 && (
                                                    <div 
                                                        className="text-[9px] text-[#666373] font-medium px-1 cursor-pointer hover:text-[#221E33] transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (cell.date) {
                                                                setClickedDate(cell.date);
                                                                setShowTripPopup(true);
                                                            }
                                                        }}
                                                    >
                                                        +{tripsStartingHere.length - 2} more
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        
                                        {isWildWeekend && tripsForThisDate.length === 0 && cell.dayNumber === secondWeekend.saturday && (
                                            <span className="absolute bottom-1.5 left-1.5 text-xs text-[#2A7765] font-medium z-10">Wild Weekend</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trip Details Modal */}
            {showTripPopup && clickedDate && tripsForClickedDate.length > 0 && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
                    onClick={() => setShowTripPopup(false)}
                >
                    <div 
                        className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-[#ECECF1]">
                            <div>
                                <h3 className="text-lg font-bold text-[#221E33]">
                                    {clickedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                                </h3>
                                <p className="text-sm text-[#666373] mt-0.5">
                                    {clickedDate.getFullYear()}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowTripPopup(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#ECECF1] text-[#666373] hover:text-[#221E33] transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5 overflow-y-auto flex-1">
                            <div className="space-y-3">
                                {tripsForClickedDate.map((trip) => {
                                    const tripColor = getTripColor(trip);
                                    return (
                                        <div
                                            key={trip.id}
                                            onClick={() => {
                                                navigate(`/trip/${trip.id}`);
                                                setShowTripPopup(false);
                                            }}
                                            className="p-4 border border-[#ECECF1] rounded-xl hover:border-[#0DAC87] hover:shadow-md cursor-pointer transition-all bg-white group"
                                        >
                                            <div className="flex items-start gap-3">
                                                {trip.coverImage && (
                                                    <img
                                                        src={trip.coverImage}
                                                        alt={trip.name || trip.title}
                                                        className="w-16 h-16 rounded-lg object-cover shrink-0 bg-[#ECECF1] group-hover:scale-105 transition-transform"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <h4 className="font-bold text-[#221E33] text-sm group-hover:text-[#0DAC87] transition-colors">
                                                            {trip.name || trip.title}
                                                        </h4>
                                                        {trip.category && (
                                                            <span
                                                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                                                                style={{
                                                                    backgroundColor: tripColor.bg,
                                                                    color: tripColor.color,
                                                                }}
                                                            >
                                                                {trip.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1.5 text-xs text-[#666373]">
                                                        {trip.location && (
                                                            <div className="flex items-center gap-1.5">
                                                                <FaLocationDot className="shrink-0 text-[#0DAC87]" />
                                                                <span className="truncate">{trip.location}</span>
                                                            </div>
                                                        )}
                                                        {trip.startDate && trip.endDate && (
                                                            <div className="flex items-center gap-1.5">
                                                                <svg className="w-3.5 h-3.5 shrink-0 text-[#0DAC87]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                <span>
                                                                    {new Date(trip.startDate).toLocaleDateString(undefined, { day: "numeric", month: "short" })} - {new Date(trip.endDate).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {trip.duration && (
                                                            <div className="flex items-center gap-1.5">
                                                                <svg className="w-3.5 h-3.5 shrink-0 text-[#0DAC87]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <span>{trip.duration}</span>
                                                            </div>
                                                        )}
                                                        {trip.type && (
                                                            <div className="text-[11px] font-medium text-[#0DAC87] capitalize">
                                                                {trip.type}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filtered trips list (search + date wise) - full width below calendar */}
            <div className="mt-8 w-full">
                <div className="bg-white rounded-2xl p-4 sm:p-6">
                    <h5 className="text-[#221E33] font-bold text-lg mb-3">
                        {searchQuery.trim() || selectedDays.length > 0
                            ? `Trips matching your selection (${filteredTrips.length})`
                            : "All upcoming trips"}
                    </h5>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-10">
                            <LoaderIcon className="animate-spin h-8 w-8 text-[#0DAC87]" />
                        </div>
                    ) : filteredTrips.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-[#666373] text-base font-medium">
                                {allTrips.length === 0
                                    ? "More information coming soon."
                                    : "No trips match your search or selected dates. Try a different place or pick other dates."}
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-3 max-h-80 overflow-y-auto">
                            {filteredTrips.map((trip: OpenTrip, index: number) => (
                                <li
                                    key={`${trip.id}-${index}`}
                                    onClick={() => navigate(`/trip/${trip.id}`)}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-[#ECECF1] hover:bg-[#F6F8FD] cursor-pointer transition-colors"
                                >
                                    <img
                                        src={trip.coverImage || ""}
                                        alt={trip.name || trip.title}
                                        className="h-14 w-14 rounded-lg object-cover shrink-0 bg-[#ECECF1]"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-[#221E33] truncate">{trip.name || trip.title}</p>
                                        <div className="flex items-center gap-1.5 text-[#666373] text-sm">
                                            <FaLocationDot className="shrink-0" />
                                            <span className="truncate">{trip.location}</span>
                                        </div>
                                    </div>
                                    <span className="text-[#666373] text-sm shrink-0">
                                        {trip.startDate ? new Date(trip.startDate).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : ""}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upcomingtrips;