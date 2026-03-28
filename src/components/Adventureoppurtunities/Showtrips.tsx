import { FaLocationDot } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { SearchX, Inbox, LoaderIcon } from "lucide-react";
// import trip1 from "../../assets/trip1.avif"
import { useNavigate } from "react-router-dom";
import { UseSearchTrips } from "@/hooks/searchTripshook";
import { UsegetOpenTrips } from "@/hooks/getOpenTripshook";
import { UsegetTrips } from "@/hooks/gettriphook";
import type { TabId } from "./Tabs";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation()
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

    // All trips (for closed tab and counts)
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
    const statusFilteredTrips = activeTab === "all"
        ? baseTrips
        : baseTrips.filter((trip: any) => {
            const tripStatus = (trip.status || "").toLowerCase();
            if (activeTab === "open") {
              return tripStatus === "open" || tripStatus === "active";
            }
            if (activeTab === "coming-soon") {
              return tripStatus === "live" || tripStatus === "coming soon";
            }
            if (activeTab === "closed") {
              return tripStatus === "completed";
            }
            return false;
        });

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

    // Determine empty state scenarios
    const hasNoTrips = !isLoading && !isError && upcomingtrip.length === 0;
    const hasNoDataAtAll = !isLoading && !isError && !hasSearch && !normalizedCategory && activeTab === "all" && (openTrips.length === 0);
    const hasNoSearchResults = !isLoading && !isError && hasSearch && upcomingtrip.length === 0;
    const hasNoCategoryResults = !isLoading && !isError && normalizedCategory && statusFilteredTrips.length > 0 && upcomingtrip.length === 0;

    // Tab-specific empty states (check in order of specificity)
    const hasNoTabAndSearchResults = !isLoading && !isError && activeTab !== "all" && hasSearch && statusFilteredTrips.length === 0;
    const hasNoTabAndCategoryResults = !isLoading && !isError && activeTab !== "all" && normalizedCategory && !hasSearch && statusFilteredTrips.length > 0 && upcomingtrip.length === 0;
    const hasNoTabResults = !isLoading && !isError && activeTab !== "all" && !hasSearch && !normalizedCategory && statusFilteredTrips.length === 0 && baseTrips.length > 0;

    // Get tab label for messages
    const getTabLabel = () => {
        switch (activeTab) {
            case "open": return t("trips.tabs.open");
            case "coming-soon": return t("trips.tabs.comingSoon");
            case "closed": return t("trips.tabs.closed");
            default: return "";
        }
    };
    return (
        <>
            <div className="px-4 sm:px-16 py-6 bg-[#FAFAFA]">
                {
                    view === "list" ? (
                        <>
                            <div>
                                <span
                                    className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">
                                    {t("trips.showingXTrips", { count: upcomingtrip ? upcomingtrip.length : 0 })}
                                </span>

                                <div className="border-b border-[#D9D9D9] mt-[16px]" />
                                {isLoading && (
                                    <div className="w-full flex items-center justify-center py-10">
                                        <LoaderIcon className="animate-spin" />
                                    </div>
                                )}
                                {isError && (
                                    <div className="w-full flex flex-col items-center justify-center py-10">
                                        <div className="bg-[#FEE2E2] rounded-full p-4 mb-4">
                                            <Inbox className="h-8 w-8 text-[#DC2626]" />
                                        </div>
                                        <p className="text-[#666373] text-sm font-medium">
                                            {t("trips.unableToLoad")}
                                        </p>
                                    </div>
                                )}
                                {hasNoTrips && !isLoading && !isError && (
                                    <div className="w-full flex flex-col items-center justify-center py-10">
                                        {hasNoTabAndSearchResults ? (
                                            <>
                                                <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                    <SearchX className="h-8 w-8 text-[#666373]" />
                                                </div>
                                                <p className="text-[#666373] text-sm font-medium mb-1">
                                                    {t("trips.noTabTripsFound", { tab: getTabLabel().toLowerCase(), query: searchQuery })}
                                                </p>
                                                <p className="text-[#999999] text-xs">
                                                    {t("trips.tryAdjustingFilters")}
                                                </p>
                                            </>
                                        ) : hasNoTabAndCategoryResults ? (
                                            <>
                                                <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                    <Inbox className="h-8 w-8 text-[#666373]" />
                                                </div>
                                                <p className="text-[#666373] text-sm font-medium mb-1">
                                                    {t("trips.noTabTripsCategory", { tab: getTabLabel().toLowerCase() })}
                                                </p>
                                                <p className="text-[#999999] text-xs">
                                                    {t("trips.tryAdjustingFilters")}
                                                </p>
                                            </>
                                        ) : hasNoTabResults ? (
                                            <>
                                                <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                    <Inbox className="h-8 w-8 text-[#666373]" />
                                                </div>
                                                <p className="text-[#666373] text-sm font-medium mb-1">
                                                    {t("trips.noTabTripsAvailable", { tab: getTabLabel() })}
                                                </p>
                                                <p className="text-[#999999] text-xs">
                                                    {t("trips.checkBackLater")}
                                                </p>
                                            </>
                                        ) : hasNoSearchResults ? (
                                            <>
                                                <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                    <SearchX className="h-8 w-8 text-[#666373]" />
                                                </div>
                                                <p className="text-[#666373] text-sm font-medium mb-1">
                                                    {t("trips.noTripsFound", { query: searchQuery })}
                                                </p>
                                                <p className="text-[#999999] text-xs">
                                                    {t("trips.tryAdjustingFilters")}
                                                </p>
                                            </>
                                        ) : hasNoCategoryResults ? (
                                            <>
                                                <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                    <Inbox className="h-8 w-8 text-[#666373]" />
                                                </div>
                                                <p className="text-[#666373] text-sm font-medium mb-1">
                                                    {t("trips.noTripsCategory")}
                                                </p>
                                                <p className="text-[#999999] text-xs">
                                                    {t("trips.tryAdjustingFilters")}
                                                </p>
                                            </>
                                        ) : hasNoDataAtAll ? (
                                            <>
                                                <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                    <Inbox className="h-8 w-8 text-[#666373]" />
                                                </div>
                                                <p className="text-[#666373] text-sm font-medium mb-1">
                                                    {t("trips.noTripsAvailable")}
                                                </p>
                                                <p className="text-[#999999] text-xs">
                                                    {t("trips.checkBackLater")}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                    <Inbox className="h-8 w-8 text-[#666373]" />
                                                </div>
                                                <p className="text-[#666373] text-sm font-medium mb-1">
                                                    {t("trips.noTripsAvailable")}
                                                </p>
                                                <p className="text-[#999999] text-xs">
                                                    {t("trips.tryAdjustingFilters")}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                )}
                                {!isLoading && !isError && upcomingtrip.length > 0 && (
                                    <div className="flex flex-col gap-4 mt-5 overflow-x-auto h-150">
                                        {
                                            upcomingtrip?.map((trip: any, index: number) => (
                                                <div key={index} className="bg-[#FFFFFF] px-4 py-4 rounded-[20px] shadow-md">
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

                                                                    <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 mb-3 rounded-[7px] text-[#156250] text-[14px]">{trip.category}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col lg:flex-row gap-4">
                                                                <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                                    <div className="flex flex-col gap-1 ">
                                                                        <div onClick={() => navigate(`/user-dashboard/viewdetail/${trip.id}`)} className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                                            {t("trips.viewDetail")}
                                                                            <MdArrowOutward color="#FFFFFF" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div>
                            <span
                                className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">
                                {t("trips.showingXTrips", { count: upcomingtrip ? upcomingtrip.length : 0 })}
                            </span>

                            <div className="border-b border-[#D9D9D9] mt-[16px]" />

                            {isLoading && (
                                <div className="w-full flex items-center justify-center py-10">
                                    <LoaderIcon className="animate-spin" />
                                </div>
                            )}
                            {isError && (
                                <div className="w-full flex flex-col items-center justify-center py-10">
                                    <div className="bg-[#FEE2E2] rounded-full p-4 mb-4">
                                        <Inbox className="h-8 w-8 text-[#DC2626]" />
                                    </div>
                                    <p className="text-[#666373] text-sm font-medium">
                                        {t("trips.unableToLoad")}
                                    </p>
                                </div>
                            )}
                            {hasNoTrips && !isLoading && !isError && (
                                <div className="w-full flex flex-col items-center justify-center py-10">
                                    {hasNoTabAndSearchResults ? (
                                        <>
                                            <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                <SearchX className="h-8 w-8 text-[#666373]" />
                                            </div>
                                            <p className="text-[#666373] text-sm font-medium mb-1">
                                                {t("trips.noTabTripsFound", { tab: getTabLabel().toLowerCase(), query: searchQuery })}
                                            </p>
                                            <p className="text-[#999999] text-xs">
                                                {t("trips.tryAdjustingFilters")}
                                            </p>
                                        </>
                                    ) : hasNoTabAndCategoryResults ? (
                                        <>
                                            <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                <Inbox className="h-8 w-8 text-[#666373]" />
                                            </div>
                                            <p className="text-[#666373] text-sm font-medium mb-1">
                                                {t("trips.noTabTripsCategory", { tab: getTabLabel().toLowerCase() })}
                                            </p>
                                            <p className="text-[#999999] text-xs">
                                                {t("trips.tryAdjustingFilters")}
                                            </p>
                                        </>
                                    ) : hasNoTabResults ? (
                                        <>
                                            <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                <Inbox className="h-8 w-8 text-[#666373]" />
                                            </div>
                                            <p className="text-[#666373] text-sm font-medium mb-1">
                                                {t("trips.noTabTripsAvailable", { tab: getTabLabel() })}
                                            </p>
                                            <p className="text-[#999999] text-xs">
                                                {t("trips.checkBackLater")}
                                            </p>
                                        </>
                                    ) : hasNoSearchResults ? (
                                        <>
                                            <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                <SearchX className="h-8 w-8 text-[#666373]" />
                                            </div>
                                            <p className="text-[#666373] text-sm font-medium mb-1">
                                                {t("trips.noTripsFound", { query: searchQuery })}
                                            </p>
                                            <p className="text-[#999999] text-xs">
                                                {t("trips.tryAdjustingFilters")}
                                            </p>
                                        </>
                                    ) : hasNoCategoryResults ? (
                                        <>
                                            <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                <Inbox className="h-8 w-8 text-[#666373]" />
                                            </div>
                                            <p className="text-[#666373] text-sm font-medium mb-1">
                                                {t("trips.noTripsCategory")}
                                            </p>
                                            <p className="text-[#999999] text-xs">
                                                {t("trips.tryAdjustingFilters")}
                                            </p>
                                        </>
                                    ) : hasNoDataAtAll ? (
                                        <>
                                            <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                <Inbox className="h-8 w-8 text-[#666373]" />
                                            </div>
                                            <p className="text-[#666373] text-sm font-medium mb-1">
                                                {t("trips.noTripsAvailable")}
                                            </p>
                                            <p className="text-[#999999] text-xs">
                                                {t("trips.checkBackLater")}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                                                <Inbox className="h-8 w-8 text-[#666373]" />
                                            </div>
                                            <p className="text-[#666373] text-sm font-medium mb-1">
                                                {t("trips.noTripsAvailable")}
                                            </p>
                                            <p className="text-[#999999] text-xs">
                                                {t("trips.tryAdjustingFilters")}
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                            {!isLoading && !isError && upcomingtrip.length > 0 && (
                                <div className="grid lg:grid-cols-3 gap-4 mt-5 overflow-x-auto h-150">
                                    {
                                        upcomingtrip?.map((trip: any, index: number) => (
                                            <div key={index} className="bg-[#FFFFFF] rounded-[20px] shadow-md h-120">
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

                                                                <div className="font-semibold cursor-pointer bg-[#C4FFF0] px-3 py-2 rounded-[7px] text-[#156250] text-[14px]">{trip.category}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col lg:flex-row gap-4">
                                                            <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                                                                <div className="flex flex-col gap-1 w-full">
                                                                    <div onClick={() => navigate(`/user-dashboard/viewdetail/${trip.id}`)} className="font-semibold flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-5 py-3 text-[#FFFFFF]">
                                                                        {t("trips.viewDetail")}
                                                                        <MdArrowOutward color="#FFFFFF" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
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