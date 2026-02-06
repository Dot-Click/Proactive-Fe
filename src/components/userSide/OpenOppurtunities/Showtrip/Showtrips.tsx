import { FaLocationDot } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import calender from "../../../../assets/calender.png"
import star from "../../../../assets/sidebaricon/star.png"
import { useNavigate } from "react-router-dom";
import { UsegetOpenTrips } from "@/hooks/getOpenTripshook";
import { UsegetTrips } from "@/hooks/gettriphook";
import { LoaderIcon } from "lucide-react";
import { UseSearchTrips } from "@/hooks/searchTripshook";
import type { TabId } from "../Tabs/Tabs";

interface ShowTripsProps {
    view: string;
    searchQuery: string;
    category: string;
    activeTab?: TabId;
}
// const trips = [
//     { id: 1, name: "Wild Weekend Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild weekend", img: trip1 },
//     { id: 2, name: "Wild trip Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild trip", img: trip2 },
//     { id: 2, name: "Wild Weekend Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild weekend", img: trip3 },
//     { id: 2, name: "Wild trip Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild trip", img: trip1 },
//     { id: 2, name: "Wild Weekend Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild weekend", img: trip2 },
//     { id: 2, name: "Wild trip Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild trip", img: trip3 },
// ];

const Showtrips = ({ view, searchQuery, category, activeTab = "all" }: ShowTripsProps) => {
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
    // This ensures the count matches the displayed data
    const useAllTrips = activeTab === "all" || activeTab === "closed";
    const openTrips = openTripsData?.trips ?? [];
    const allTrips = allTripsData?.trips ?? [];
    const sourceTrips = useAllTrips ? allTrips : openTrips;
    
    // Determine base trips: use search results if search exists, otherwise use source trips
    let baseTrips = hasSearch ? (searchData?.trips ?? []) : sourceTrips;
    
    // If search exists, filter search results to only include trips that are in source trips
    if (hasSearch) {
        const sourceTripIds = new Set(sourceTrips.map((trip: any) => trip.id));
        baseTrips = baseTrips.filter((trip: any) => sourceTripIds.has(trip.id));
    }

    // Apply tab status filter (backend uses "completed" for closed trips)
    const statusFilterKey =
        activeTab === "all"
            ? undefined
            : activeTab === "coming-soon"
            ? "live"
            : activeTab === "closed"
            ? "completed"
            : activeTab;

    const statusFilteredTrips = statusFilterKey
        ? baseTrips.filter((trip: any) => {
            const tripStatus = (trip.status || "").toLowerCase();
            return tripStatus === statusFilterKey.toLowerCase();
        })
        : baseTrips;

    // Apply category filter
    const normalizedCategory = category?.toLowerCase().trim();
    const filteredTrips = normalizedCategory
        ? statusFilteredTrips.filter((trip: any) => {
            const tripCategory =
                (trip.categoryName ?? trip.category ?? "").toString().toLowerCase().trim();
            return tripCategory === normalizedCategory;
        })
        : statusFilteredTrips;

    const isLoading = hasSearch 
        ? isSearchLoading 
        : useAllTrips 
        ? isAllTripsLoading 
        : isOpenTripsLoading;
    const isError = hasSearch 
        ? isSearchError 
        : useAllTrips 
        ? isAllTripsError 
        : isOpenTripsError;
    const upcomingtrip = filteredTrips;
    return (
        <>
            <div className="px-4 sm:px-16 py-6 bg-[#FAFAFA]">
                {
                    view === "list" ? (
                        <>
                            <div>
                                <span
                                    className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">
                                    Showing {upcomingtrip ? upcomingtrip.length : 0} trips
                                </span>

                                <div className="border-b border-[#D9D9D9] mt-[16px]" />
                                {isLoading && (
                                    <div className="w-full flex items-center justify-center py-10">
                                        <LoaderIcon className="animate-spin" />
                                    </div>
                                )}
                                {isError && (
                                    <div className="w-full flex items-center justify-center py-10">
                                        <p className="text-[#666373] text-lg font-medium">
                                            An error occurred while loading trips. Please try again.
                                        </p>
                                    </div>
                                )}
                                {!isLoading && !isError && (!upcomingtrip || upcomingtrip.length === 0) && (
                                    <div className="w-full flex items-center justify-center py-20">
                                        <p className="text-[#666373] text-lg font-medium">
                                            {searchQuery || category 
                                                ? "No trips found matching your filters." 
                                                : "More information coming soon."}
                                        </p>
                                    </div>
                                )}
                                {!isLoading && !isError && upcomingtrip && upcomingtrip.length > 0 && (
                                    <div className="flex flex-col gap-4 mt-5 overflow-x-auto h-150">
                                        {upcomingtrip.map((trip: any, index: number) => (
                                        <div key={`${trip.id}-${index}`} className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md">
                                            <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
                                                <img src={trip?.coverImage || trip.img} alt="trip1" className="h-30 w-30 rounded-lg" />
                                                <div className="flex lg:flex-row flex-col justify-between items-center w-full gap-6">
                                                    <div className="flex flex-col lg:flex-row gap-4">
                                                        <div className="flex flex-col gap-1 w-full items-center lg:items-start">
                                                            <span className="text-[#1F1B2C] font-bold text-xl">{trip.name}</span>
                                                            <div className="flex items-center gap-2">
                                                                <FaLocationDot color="#666373" />
                                                                <span className="text-[#666373]">{trip.location}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col lg:flex-row items-start mt-9 gap-4">
                                                        <div className="flex lg:flex-row flex-col gap-8">
                                                            <div className="flex lg:flex-row flex-col gap-8">
                                                                <div className="flex items-center gap-2">
                                                                    <img src={calender} alt="calender" className="h-4" />
                                                                    <span className="text-[#666373] text-[14px] text-nowrap">{new Date(trip?.startDate).toDateString()}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                                                                    <span className="text-[#666373] text-[14px] text-nowrap">Plazas disponibles</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <img src={star} alt="star" className="h-4" />
                                                                    <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                                </div>
                                                            </div>
                                                            <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 mb-3 rounded-[7px] text-[#156250] text-[14px]">{trip.category}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col lg:flex-row gap-4">
                                                        <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                            <div className="flex flex-col gap-1 ">
                                                                <div onClick={() => navigate(`/user-dashboard/viewdetail/${trip.id}`)} className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                                    View Detail
                                                                    <MdArrowOutward color="#FFFFFF" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div>
                            <span
                                className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">
                                Showing {upcomingtrip ? upcomingtrip.length : 0} trips
                            </span>

                            <div className="border-b border-[#D9D9D9] mt-[16px]" />
                            {isLoading && (
                                <div className="w-full flex items-center justify-center py-10">
                                    <LoaderIcon className="animate-spin" />
                                </div>
                            )}
                            {isError && (
                                <div className="w-full flex items-center justify-center py-10">
                                    <p className="text-[#666373] text-lg font-medium">
                                        An error occurred while loading trips. Please try again.
                                    </p>
                                </div>
                            )}
                            {!isLoading && !isError && (!upcomingtrip || upcomingtrip.length === 0) && (
                                <div className="w-full flex items-center justify-center py-20">
                                    <p className="text-[#666373] text-lg font-medium">
                                        {searchQuery || category 
                                            ? "No trips found matching your filters." 
                                            : "More information coming soon."}
                                    </p>
                                </div>
                            )}
                            {!isLoading && !isError && upcomingtrip && upcomingtrip.length > 0 && (
                                <div className="grid lg:grid-cols-3 gap-4 mt-5 overflow-x-auto h-150">
                                    {upcomingtrip.map((trip: any, index: number) => (
                                    <div key={`${trip.id}-${index}`} className="bg-[#FFFFFF] rounded-[20px] shadow-md h-120">
                                        <div className="flex flex-col justify-between items-start gap-4">
                                            <img src={trip?.coverImage || trip.img} alt="trip1" className="h-35 w-35 object-fill rounded-lg" />
                                            <div className="flex flex-col justify-between w-full gap-6 px-4 py-4">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-1 w-full items-start">
                                                        <span className="text-[#1F1B2C] font-bold text-xl">{trip.name}</span>
                                                        <div className="flex items-center gap-2">
                                                            <FaLocationDot color="#666373" />
                                                            <span className="text-[#666373]">{trip.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center gap-2">
                                                                <img src={calender} alt="calender" className="h-4" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">{new Date(trip?.startDate).toDateString()}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-[#28C900] rounded-full" />
                                                                <span className="text-[#666373] text-[14px] text-nowrap">Plazas disponibles</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <img src={star} alt="star" className="h-4" />
                                                                <span className="text-[#666373] text-[14px]">4.5 (23)</span>
                                                            </div>
                                                        </div>
                                                        <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 rounded-[7px] text-[#156250] text-[14px]">{trip.category}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                        <div className="flex flex-col gap-1 w-full">
                                                            <div onClick={() => navigate(`/user-dashboard/viewdetail/${trip.id}`)} className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                                View Detail
                                                                <MdArrowOutward color="#FFFFFF" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
            <div className="border-b border-[#D9D9D9]" />
        </>
    )
}

export default Showtrips
// < div className = "bg-[#009C23] w-2 h-2 rounded-full" />
