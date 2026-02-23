import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import trip1 from "../../../assets/trip1.png"
import calender from "../../../assets/calender.png"
import time from "../../../assets/time.png"
import { FaLocationDot } from "react-icons/fa6"
import { MdArrowOutward } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { UsegetPayment } from "@/hooks/getPaymenthook"
import { UsegetMyApplications } from "@/hooks/UsegetMyApplicationshook"
import { LoaderIcon, Wallet, Clock } from "lucide-react"
import { useMemo } from "react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import TripPaymentModal from "@/components/payment/TripPaymentModal"
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook"
import PaymentModal from "../Alert/PaymentModal"
import logoBadge from "@/assets/sidebaricon/favicon.png"

const UpcomingAdventures = () => {
    const navigate = useNavigate()
    const { data: paymentData, isLoading } = UsegetPayment()
    const { data: applications } = UsegetMyApplications()
    const { data: userResp } = UsegetCurrentUser()

    const userData = userResp?.data?.user || userResp?.user || userResp

    // Get paid trips and separate into upcoming and past
    const { upcomingTrips, pastTrips, paidTripIds } = useMemo(() => {
        const tripPayments = paymentData?.tripPayments || []
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const OK_STATUSES = new Set(["completed", "paid", "confirmed", "succeeded", "success"])

        const paidTrips = tripPayments.filter((p: any) => OK_STATUSES.has((p.status || "").toString().toLowerCase()))
            .map((p: any) => ({
                ...(p.trip || {}),
                id: p.tripId,
                paymentId: p.id,
                paymentStatus: p.status
            }))
            .filter((trip: any) => trip && trip.id)

        const paidIds = new Set(paidTrips.map((t: any) => String(t.id)))

        // Upcoming = any paid trip that hasn't ended yet (includes ongoing)
        const upcoming = paidTrips.filter((trip: any) => {
            const e = trip.endDate || trip.end_date || trip.end || trip.ends_at
            if (!e) return true
            const endDate = new Date(e)
            endDate.setHours(0, 0, 0, 0)
            return endDate >= today
        })

        // Past = any paid trip that has fully ended
        const past = paidTrips.filter((trip: any) => {
            const e = trip.endDate || trip.end_date || trip.end || trip.ends_at
            if (!e) return false
            const endDate = new Date(e)
            endDate.setHours(0, 0, 0, 0)
            return endDate < today
        }).sort((a: any, b: any) => {
            const dateA = new Date(a.endDate).getTime()
            const dateB = new Date(b.endDate).getTime()
            return dateB - dateA
        })

        return { upcomingTrips: upcoming, pastTrips: past, paidTripIds: paidIds }
    }, [paymentData])

    // Unified merge logic for both Upcoming and Past
    const { mergedUpcoming, mergedPast } = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Process all applications into a common format
        const applicationItems = (applications || [])
            .filter((app: any) => !paidTripIds?.has(String(app.tripId)))
            .map((app: any) => ({
                ...(app.trip || {}),
                id: app.tripId,
                name: app.trip?.title || app.trip?.name,
                applicationApproved: app.status === 'approved',
                applicationPending: app.status === 'pending',
                applicationRejected: app.status === 'rejected',
                isApplication: true
            }));

        const allUpcoming = [...upcomingTrips];
        const allPast = [...pastTrips];

        applicationItems.forEach((item: any) => {
            const e = item.endDate || item.end_date;
            if (e) {
                const endDate = new Date(e);
                endDate.setHours(0, 0, 0, 0);
                if (endDate < today) {
                    allPast.push(item);
                    return;
                }
            }
            // If it hasn't ended or has no end date, it's upcoming/current
            allUpcoming.push(item);
        });

        // Sort Upcoming: soonest first
        allUpcoming.sort((a, b) => {
            const dateA = new Date(a.startDate || 0).getTime();
            const dateB = new Date(b.startDate || 0).getTime();
            return dateA - dateB;
        });

        // Sort Past: most recent first
        allPast.sort((a, b) => {
            const dateA = new Date(a.endDate || 0).getTime();
            const dateB = new Date(b.endDate || 0).getTime();
            return dateB - dateA;
        });

        return { mergedUpcoming: allUpcoming, mergedPast: allPast };
    }, [applications, upcomingTrips, pastTrips, paidTripIds]);

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

    const renderMembershipCard = () => {
        return (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1F1B2C] to-[#3B3454] rounded-[24px] shadow-xl mb-8">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0DAC87] opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFB800] opacity-10 rounded-full -ml-16 -mb-16 blur-2xl"></div>

                <div className="relative px-6 py-8 flex lg:flex-row flex-col items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shrink-0">
                            <img src={logoBadge} alt="ProActive" className="h-10 w-10 object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white font-bold text-2xl mb-1 text-center lg:text-left">Unlock Instant Access</h3>
                            <p className="text-white/70 max-w-md text-sm text-center lg:text-left">
                                Join the ProActive community today. Get exclusive access to wild trips, wild weekends, and member-only rewards.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 lg:border-l lg:border-white/10 lg:pl-8">
                        <div className="flex flex-col items-end">
                            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">ANNUAL PASS</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-[#0DAC87] font-black text-4xl">€50</span>
                                <span className="text-white/40 text-xs font-medium">/ year</span>
                            </div>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-[#0DAC87] hover:bg-[#11a180] text-white rounded-full px-10 py-7 font-bold text-lg shadow-lg shadow-[#0DAC87]/20 transition-all active:scale-95 cursor-pointer">
                                    Become a Member
                                </Button>
                            </DialogTrigger>
                            <PaymentModal />
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }

    const renderTripCard = (trip: any, isPast: boolean = false) => {
        return (
            <div key={trip.id} className="bg-[#FFFFFF] px-4 py-6 rounded-[20px] shadow-sm border border-[#F0F0F0] hover:shadow-md transition-shadow">
                <div className="flex lg:flex-row flex-col gap-4">
                    <img src={trip?.coverImage || trip1} alt={trip?.title || "Trip"} className="h-48 w-full lg:w-48 rounded-2xl object-cover shrink-0" />
                    <div className="flex flex-col w-full gap-6">
                        <div className="flex flex-col lg:flex-row w-full justify-between mt-1 gap-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-[#1F1B2C] font-bold text-xl">{trip?.title || trip?.name}</h3>
                                <div className="flex items-center gap-2">
                                    <FaLocationDot color="#666373" className="shrink-0" />
                                    <span className="text-[#666373] text-sm font-medium">{trip?.location}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-start lg:items-end">
                                {trip?.category && (
                                    <div className="bg-[#C4FFF0] px-3 py-1.5 rounded-lg text-[#156250] text-xs font-bold uppercase tracking-wider">{trip.category}</div>
                                )}
                                <div className={`border px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 uppercase tracking-wider ${isPast
                                        ? (trip.applicationRejected ? "border-red-100 bg-red-50 text-red-500" : "border-gray-100 bg-gray-50 text-gray-500")
                                        : (trip.applicationPending ? "border-amber-100 bg-amber-50 text-amber-600"
                                            : trip.applicationRejected ? "border-red-100 bg-red-50 text-red-500"
                                                : "border-green-100 bg-green-50 text-green-600")
                                    }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${isPast
                                        ? (trip.applicationRejected ? "bg-red-500" : "bg-gray-400")
                                        : (trip.applicationPending ? "bg-amber-500" : trip.applicationRejected ? "bg-red-500" : "bg-green-500")
                                        }`} />
                                    {isPast
                                        ? (trip.isApplication ? (trip.applicationRejected ? "Rejected" : "Expired") : "Completed")
                                        : (trip.applicationPending ? "Under Review" : trip.applicationRejected ? "Rejected" : "Confirmed")
                                    }
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-[#F0F0F0]" />

                        <div className="flex lg:flex-row flex-col w-full justify-between items-center gap-6">
                            <div className="flex flex-col gap-2 w-full lg:w-auto">
                                {trip?.startDate && trip?.endDate && (
                                    <div className="flex items-center gap-2">
                                        <img src={calender} alt="calender" className="h-3.5 opacity-60" />
                                        <span className="text-[#666373] text-xs font-semibold">
                                            {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <img src={time} alt="time" className="h-3.5 opacity-60" />
                                    <span className="text-[#666373] text-xs font-semibold">
                                        {isPast
                                            ? `Completed ${getDaysAgo(trip.endDate)} ${getDaysAgo(trip.endDate) === 1 ? 'day' : 'days'} ago`
                                            : getDaysLeft(trip.startDate) <= 0
                                                ? "Adventure is Ongoing!"
                                                : `Starts in ${getDaysLeft(trip.startDate)} ${getDaysLeft(trip.startDate) === 1 ? 'day' : 'days'}`
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                {trip.applicationApproved && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="flex-1 lg:flex-none justify-center items-center gap-2 rounded-full cursor-pointer bg-[#FFB800] hover:bg-[#e6a600] px-8 py-6 text-[#221E33] font-bold shadow-lg shadow-[#FFB800]/10 transition-all active:scale-95">
                                                <Wallet size={18} />
                                                Pay Now
                                            </Button>
                                        </DialogTrigger>
                                        <TripPaymentModal tripId={trip.id} />
                                    </Dialog>
                                )}
                                {trip.applicationPending && (
                                    <div className="flex-1 lg:flex-none justify-center items-center gap-2 rounded-full px-8 py-6 bg-[#F8F9FB] border border-[#ECECF1] text-[#666373] font-bold text-sm cursor-default">
                                        <Clock size={16} />
                                        Application Under Review
                                    </div>
                                )}
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(`/user-dashboard/viewdetail/${trip.id}`)}
                                    className="flex-1 lg:flex-none justify-center items-center gap-2 rounded-full border-2 border-[#0DAC87] text-[#0DAC87] hover:bg-[#0DAC87] hover:text-white px-8 py-6 font-bold shadow-sm transition-all active:scale-95"
                                >
                                    Details
                                    <MdArrowOutward size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Upcoming Adventures Section */}
            <div className="bg-white rounded-[32px] border border-[#EEEEEE] overflow-hidden shadow-sm">
                <div className="px-8 py-8 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#FAFAFA]/50 border-b border-[#EEEEEE]">
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-[#1F1B2C] font-black text-2xl tracking-tight">Upcoming Adventures</h2>
                        <p className="text-[#666373] text-sm font-medium">Your next wild challenges await</p>
                    </div>
                    <Button
                        onClick={() => navigate("/user-dashboard/adventure-oppurtunities")}
                        className="bg-[#1F1B2C] hover:bg-[#2F2942] text-white rounded-full py-6 px-8 font-bold shadow-lg transition-all active:scale-95"
                    >
                        Explore More Trips
                    </Button>
                </div>

                <div className="p-8">
                    {!isLoading && !userData?.membershipAvailable && renderMembershipCard()}

                    {isLoading ? (
                        <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
                            <LoaderIcon className="animate-spin text-[#0DAC87] w-12 h-12" />
                            <p className="text-[#666373] font-bold animate-pulse">Loading adventure data...</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                            {mergedUpcoming.length > 0 ? (
                                mergedUpcoming.map((trip: any) => renderTripCard(trip, false))
                            ) : (
                                <div className="text-center py-16 px-4 bg-[#F8F9FB] rounded-[24px] border-2 border-dashed border-[#EEEEEE]">
                                    <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                                        <MdArrowOutward className="text-[#0DAC87] w-8 h-8" />
                                    </div>
                                    <h3 className="text-[#1F1B2C] font-bold text-lg mb-1">No upcoming trips</h3>
                                    <p className="text-[#666373] text-sm max-w-xs mx-auto mb-6">You haven't applied for any adventures yet. Time to start your journey!</p>
                                    <Button
                                        onClick={() => navigate("/user-dashboard/adventure-oppurtunities")}
                                        variant="outline"
                                        className="rounded-full border-[#0DAC87] text-[#0DAC87] hover:bg-[#0DAC87] font-bold"
                                    >
                                        Browse Opportunities
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Past Adventures Section */}
            <div className="bg-white rounded-[32px] border border-[#EEEEEE] overflow-hidden shadow-sm">
                <div className="px-8 py-6 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#FAFAFA]/50 border-b border-[#EEEEEE]">
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-[#1F1B2C] font-black text-xl tracking-tight">Mission History</h2>
                        <p className="text-[#666373] text-xs font-medium uppercase tracking-widest">Completed Adventures</p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                        {mergedPast.length > 0 ? (
                            mergedPast.map((trip: any) => renderTripCard(trip, true))
                        ) : (
                            <div className="text-center py-12 text-[#666373]">
                                <p className="font-bold">No past missions yet.</p>
                                <p className="text-sm mt-1">Every great story has a beginning!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingAdventures
