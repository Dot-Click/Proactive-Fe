import { FaLocationDot } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UsegetOpenTrips } from "@/hooks/getOpenTripshook";
import { UsegetTrips } from "@/hooks/gettriphook";
import { LoaderIcon, User } from "lucide-react";
import { UseSearchTrips } from "@/hooks/searchTripshook";
import type { TabId } from "../Tabs/Tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ShowTripsProps {
    view: string;
    searchQuery: string;
    category: string;
    activeTab?: TabId;
    coordinatorId?: string;
    countryFilter?: string;
    activeOnly?: boolean;
}

const Showtrips = ({ 
    view, 
    searchQuery, 
    category, 
    activeTab = "all", 
    coordinatorId, 
    countryFilter, 
    activeOnly 
}: ShowTripsProps) => {
    const navigate = useNavigate()

    // Backend search (debounced inside hook)
    const {
        data: searchData,
        isLoading: isSearchLoading,
        isError: isSearchError,
    } = UseSearchTrips(searchQuery);

    // Open trips (for open/coming-soon tabs)
    const {
        data: openTripsData,
        isLoading: isOpenTripsLoading,
        isError: isOpenTripsError,
    } = UsegetOpenTrips();

    // All trips (for all/closed tabs)
    const {
        data: allTripsData,
        isLoading: isAllTripsLoading,
        isError: isAllTripsError,
    } = UsegetTrips();

    const hasSearch = !!searchQuery && searchQuery.trim().length > 0;

    // Use all trips for "all" and "closed" tabs, open trips for "open" and "coming-soon" tabs
    const useAllTrips = activeTab === "all" || activeTab === "closed";
    const openTrips = openTripsData?.trips ?? [];
    const allTrips = allTripsData?.trips ?? [];
    const sourceTrips = useAllTrips ? allTrips : openTrips;

    // Determine base trips: use search results if search exists, otherwise use source trips
    let baseTrips = hasSearch ? (searchData?.trips ?? []) : sourceTrips;

    // Filter search results by source trips if searching
    if (hasSearch) {
        const sourceTripIds = new Set(sourceTrips.map((trip: any) => trip.id));
        baseTrips = baseTrips.filter((trip: any) => sourceTripIds.has(trip.id));
    }

    // Apply multiple filters
    const filteredTrips = baseTrips.filter((trip: any) => {
        // 1. Tab Status Filter
        const statusFilterKey = activeTab === "all" ? undefined : activeTab === "coming-soon" ? "live" : activeTab === "closed" ? "completed" : activeTab;
        if (statusFilterKey && (trip.status || "").toLowerCase() !== statusFilterKey.toLowerCase()) return false;

        // 2. Category Filter
        if (category) {
            const tripCategory = (trip.categoryName ?? trip.category ?? "").toString().toLowerCase().trim();
            if (tripCategory !== category.toLowerCase().trim()) return false;
        }

        // 3. Coordinator Filter
        if (coordinatorId && trip.coordinatorId !== coordinatorId) return false;

        // 4. Country Filter
        if (countryFilter) {
            const parts = (trip.location || "").split(",");
            const tripCountry = parts[parts.length - 1]?.trim().toLowerCase();
            if (tripCountry !== countryFilter.toLowerCase()) return false;
        }

        // 5. Active Enrollment Only
        if (activeOnly && (trip.status || "").toLowerCase() !== "open") return false;

        return true;
    });

    const isLoading = hasSearch ? isSearchLoading : useAllTrips ? isAllTripsLoading : isOpenTripsLoading;
    const isError = hasSearch ? isSearchError : useAllTrips ? isAllTripsError : isOpenTripsError;

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    return (
        <div className="py-6 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <span className="text-[#221E33] font-bold text-lg">
                    Showing <span className="text-[#D40004]">{filteredTrips.length}</span> expeditions
                </span>
            </div>

            {isLoading ? (
                <div className="w-full flex items-center justify-center py-20">
                    <LoaderIcon className="animate-spin h-10 w-10 text-[#D40004]" />
                </div>
            ) : isError ? (
                <div className="w-full flex items-center justify-center py-20 bg-red-50 rounded-3xl border border-red-100">
                    <p className="text-red-600 font-medium">An error occurred while loading trips.</p>
                </div>
            ) : (filteredTrips.length === 0) ? (
                <div className="w-full flex flex-col items-center justify-center py-32 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                    <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                        <FaLocationDot size={32} className="text-gray-300" />
                    </div>
                    <p className="text-[#666373] text-lg font-medium text-center">
                        {searchQuery || category || countryFilter || coordinatorId
                            ? "No expeditions match your current filters."
                            : "More expeditions coming soon."}
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 text-[#D40004] font-bold text-sm hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                <div className={view === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8"}>
                    {filteredTrips.map((trip: any) => (
                        <div 
                            key={trip.id} 
                            onClick={() => navigate(`/trip/${trip.id}`)}
                            className={`group relative overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer 
                                ${view === "list" ? "rounded-3xl p-4 flex flex-col lg:flex-row items-center gap-6" : "rounded-[40px] aspect-[4/5]"}`}
                        >
                            {/* Card Background / Image */}
                            <div className={`absolute inset-0 z-0 ${view === "list" ? "relative w-full lg:w-48 h-48 flex-shrink-0" : ""}`}>
                                <img 
                                    src={trip?.coverImage || trip.img} 
                                    alt={trip.name} 
                                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${view === "list" ? "rounded-2xl" : ""}`} 
                                />
                                {view !== "list" && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-1" />}
                            </div>

                            {/* Date Badges (Grid View Only) */}
                            {view !== "list" && (
                                <div className="absolute top-8 right-8 z-10 flex flex-col gap-2">
                                    <div className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[10px] font-bold tracking-widest border border-white/10 uppercase">
                                        {formatDate(trip.startDate)}
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[10px] font-bold tracking-widest border border-white/10 uppercase">
                                        {formatDate(trip.endDate)}
                                    </div>
                                </div>
                            )}

                            {/* Content Overlays */}
                            <div className={`relative z-10 h-full flex flex-col justify-end ${view === "list" ? "flex-1 w-full text-left" : "p-10"}`}>
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-2 h-2 rounded-full ${trip.status === 'open' ? 'bg-[#34AB7F] animate-pulse' : 'bg-red-500'}`} />
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${view === 'list' ? 'text-gray-400' : 'text-gray-300'}`}>
                                            {trip.status === 'open' ? 'Available' : 'Sold Out'}
                                        </span>
                                    </div>
                                    <h3 className={`font-bold leading-tight mb-2 ${view === "list" ? "text-2xl text-[#221E33]" : "text-3xl text-white md:text-3xl"}`}>
                                        {trip.name}
                                    </h3>
                                    <p className={`flex items-center gap-2 text-sm ${view === "list" ? "text-[#666373]" : "text-red-400 font-semibold"}`}>
                                        {view === "list" && <FaLocationDot />}
                                        {trip.location}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-2">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border-2 border-white/20">
                                            <AvatarImage src={trip.coordinator?.profileImage || trip.coordinator?.profilePicture || ""} />
                                            <AvatarFallback className="bg-[#D40004] text-white">
                                                <User size={16} />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <p className={`text-[10px] font-bold uppercase tracking-wider ${view === 'list' ? 'text-gray-400' : 'text-white/50'}`}>Leader</p>
                                            <p className={`text-xs font-bold ${view === 'list' ? 'text-[#221E33]' : 'text-white'}`}>
                                                {trip.coordinator?.fullName || trip.coordinator?.username || "Lead Explorer"}
                                            </p>
                                        </div>
                                    </div>

                                    <button 
                                        className={`px-6 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2
                                            ${trip.status === 'open' 
                                                ? 'bg-[#D40004] text-white hover:bg-[#b00003] hover:scale-105 shadow-lg shadow-red-900/20' 
                                                : 'bg-white text-black hover:bg-gray-100 hover:scale-105 shadow-lg shadow-gray-200'}`}
                                    >
                                        {trip.status === 'open' ? 'Reservar' : 'Ver expedición'}
                                        <MdArrowOutward />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Showtrips;
// < div className = "bg-[#009C23] w-2 h-2 rounded-full" />
