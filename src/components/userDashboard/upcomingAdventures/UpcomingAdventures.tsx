import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import trip1 from "../../../assets/trip1.png"
import calender from "../../../assets/calender.png"
import time from "../../../assets/time.png"
import { FaLocationDot } from "react-icons/fa6"
import { MdArrowOutward } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { UsegetPayment } from "@/hooks/getPaymenthook"
import { UsegetOpenTrips } from "@/hooks/getOpenTripshook"
import { LoaderIcon } from "lucide-react"
import { useMemo } from "react"

const UpcomingAdventures = () => {
    const navigate = useNavigate()
    const { data: paymentData, isLoading } = UsegetPayment()

    // Get paid trips and separate into upcoming and past
    const { upcomingTrips, pastTrips } = useMemo(() => {
        const tripPayments = paymentData?.tripPayments || []
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Compare only the date part

        // Filter only paid/completed trips
        const paidTrips = tripPayments.filter((p: any) =>
            p.status === "completed" || p.status === "paid" || p.status === "confirmed"
        ).map((p: any) => ({
            ...p.trip,
            paymentId: p.id,
            paymentStatus: p.status
        })).filter((trip: any) => trip && trip.id) // Ensure trip data exists

        // Separate into upcoming and past
        const upcoming = paidTrips.filter((trip: any) => {
            if (!trip.startDate) return false
            const startDate = new Date(trip.startDate)
            startDate.setHours(0, 0, 0, 0)
            return startDate >= today
        })

        const past = paidTrips.filter((trip: any) => {
            if (!trip.endDate) return false
            const endDate = new Date(trip.endDate)
            endDate.setHours(0, 0, 0, 0)
            return endDate < today
        }).sort((a: any, b: any) => {
            // Sort past trips by end date, most recent first
            const dateA = new Date(a.endDate).getTime()
            const dateB = new Date(b.endDate).getTime()
            return dateB - dateA
        })

        return { upcomingTrips: upcoming, pastTrips: past }
    }, [paymentData])

    // Get all open trips that the user hasn't joined yet
    const { data: openTripsData, isLoading: isOpenTripsLoading } = UsegetOpenTrips()
    const adventureOpportunities = useMemo(() => {
        const allOpenTrips = openTripsData?.trips || []
        const joinedTripIds = new Set([
            ...upcomingTrips.map((t: any) => t.id),
            ...pastTrips.map((t: any) => t.id)
        ])

        return allOpenTrips.filter((trip: any) => !joinedTripIds.has(trip.id))
    }, [openTripsData, upcomingTrips, pastTrips])

    const getDaysLeft = (startDate: Date) => {
        const today = new Date()
        const start = new Date(startDate)
        const diffTime = start.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const getDaysAgo = (endDate: Date) => {
        const today = new Date()
        const end = new Date(endDate)
        const diffTime = today.getTime() - end.getTime()
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const renderTripCard = (trip: any, isPast: boolean = false) => {
        return (
            <div key={trip.id} className="bg-[#FFFFFF] px-4 py-6 rounded-[20px] shadow-md">
                <div className="flex lg:flex-row flex-col gap-4">
                    <img src={trip?.coverImage || trip?.image || trip1} alt={trip?.name || "Trip"} className="h-50 w-50 rounded-lg object-cover" />
                    <div className="flex flex-col w-full gap-6">
                        <div className="flex flex-col lg:flex-row w-full justify-between mt-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[#1F1B2C] font-bold text-xl">{trip?.name || trip?.title}</span>
                                <div className="flex items-center gap-2">
                                    <FaLocationDot color="#666373" />
                                    <span className="text-[#666373]">{trip?.location}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                {trip?.category && (
                                    <div className="cursor-pointer bg-[#C4FFF0] px-4 py-2 rounded-[7px] text-[#156250] font-semibold">{trip.category}</div>
                                )}
                                <div className={`cursor-pointer border px-4 py-2 rounded-[7px] font-semibold flex items-center gap-3 ${isPast
                                    ? "border-[#666373] text-[#666373]"
                                    : "border-[#009C23] text-[#009C23]"
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full ${isPast ? "bg-[#666373]" : "bg-[#009C23]"
                                        }`} />
                                    {isPast ? "Completed" : "Confirmed"}
                                </div>
                            </div>
                        </div>
                        <Separator className="border-[#D9D9D9] bg-[#D9D9D9] -mt-[4px] lg:flex hidden" />
                        <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                {trip?.startDate && trip?.endDate && (
                                    <div className="flex items-center gap-2">
                                        <img src={calender} alt="calender" className="h-4" />
                                        <span className="text-[#666373] text-[14px]">
                                            {new Date(trip.startDate).toDateString()} - {new Date(trip.endDate).toDateString()}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <img src={time} alt="time" className="h-4" />
                                    <span className="text-[#666373] text-[14px]">
                                        {isPast
                                            ? `Completed ${getDaysAgo(trip.endDate)} ${getDaysAgo(trip.endDate) === 1 ? 'day' : 'days'} ago`
                                            : `In ${getDaysLeft(trip.startDate)} ${getDaysLeft(trip.startDate) === 1 ? 'day' : 'days'}`
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div
                                    onClick={() => navigate(`/user-dashboard/viewdetail/${trip.id}`)}
                                    className="flex justify-center items-center gap-2 rounded-full cursor-pointer bg-[#0DAC87] hover:bg-[#10a17f] px-4 py-4 text-[#FFFFFF] font-semibold"
                                >
                                    View Detail
                                    <MdArrowOutward color="#FFFFFF" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Upcoming Adventures Section */}
            <div className="border border-[#D9D9D9] bg-[#FAFAFA] rounded-[20px] flex flex-col">
                {/* <div className="px-4 py-6 flex flex-col lg:flex-row gap-3 justify-between items-center">
                    <span className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-lg">
                        Upcoming Adventures
                    </span>
                    <Button
                        onClick={() => navigate("/user-dashboard/adventure-oppurtunities")}
                        className="bg-[#0DAC87] rounded-full py-6 px-6 hover:bg-[#0d9b7a] cursor-pointer"
                    >
                        View All
                    </Button>
                </div> */}
                {/* <Separator className="border-[#D9D9D9] bg-[#D9D9D9] -mt-[8px]" /> */}
                {/* {isLoading && (
                    <div className="w-full flex items-center justify-center py-10">
                        <LoaderIcon className="animate-spin" />
                    </div>
                )} */}
                {/* {!isLoading && (
                    <div className="flex flex-col gap-3 px-4 py-6 overflow-y-scroll h-152">
                        {upcomingTrips.length > 0 ? (
                            upcomingTrips.map((trip: any) => renderTripCard(trip, false))
                        ) : (
                            <div className="text-center py-8 text-[#666373]">
                                <p>No upcoming adventures yet.</p>
                                <p className="text-sm mt-2">Book your first adventure to see it here!</p>
                            </div>
                        )}
                    </div>
                )} */}
            </div>

            {/* Adventure Opportunities Section */}
            <div className="border border-[#D9D9D9] bg-[#FAFAFA] rounded-[20px] flex flex-col">
                <div className="px-4 py-6 flex flex-col lg:flex-row gap-3 justify-between items-center">
                    <span className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-lg">
                        Adventure Opportunities
                    </span>
                    <Button
                        onClick={() => navigate("/open-oppurtunities")}
                        className="bg-[#0DAC87] rounded-full py-6 px-6 hover:bg-[#0d9b7a] cursor-pointer"
                    >
                        Explore More
                    </Button>
                </div>
                <Separator className="border-[#D9D9D9] bg-[#D9D9D9] -mt-[8px]" />
                {(isLoading || isOpenTripsLoading) && (
                    <div className="w-full flex items-center justify-center py-10">
                        <LoaderIcon className="animate-spin" />
                    </div>
                )}
                {!isLoading && !isOpenTripsLoading && (
                    <div className="flex flex-col gap-3 px-4 py-6 overflow-y-scroll h-152">
                        {adventureOpportunities.length > 0 ? (
                            adventureOpportunities.map((trip: any) => renderTripCard(trip, false))
                        ) : (
                            <div className="text-center py-8 text-[#666373]">
                                <p>No new opportunities at the moment.</p>
                                <p className="text-sm mt-2">Check back later for more adventures!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UpcomingAdventures
