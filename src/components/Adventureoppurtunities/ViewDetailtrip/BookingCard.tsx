import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, ShieldCheck, CheckCircle2, Wallet, Clock, XCircle } from "lucide-react";
import { formatDateRange } from "../../../utils/dateFormatter";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";
import { UsegetMyApplications } from "@/hooks/UsegetMyApplicationshook";
import { UsegetPayment } from "@/hooks/getPaymenthook";
import TripPaymentModal from "@/components/payment/TripPaymentModal";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type BookingCardProps = {
    trip: any;
    showApplyButton?: boolean;
};

const BookingCard = ({ trip, showApplyButton }: BookingCardProps) => {
    const data = trip?.trip?.[0] || trip?.trip || trip;
    const navigate = useNavigate();

    const dateRange = data?.startDate && data?.endDate
        ? formatDateRange(data.startDate, data.endDate)
        : "Dates TBD";

    return (
        <div className="sticky top-28 bg-white border border-[#ECECF1] rounded-2xl p-6 shadow-sm">
            {/* Price Section */}
            <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[#221E33] font-extrabold text-3xl">€{data?.perHeadPrice || "1,250"}</span>
                <span className="text-[#666373] text-sm">/ person</span>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 text-[#0DAC87] bg-[#E6F7F3] px-2.5 py-1 rounded-full text-xs font-bold">
                    <ShieldCheck size={14} />
                    Available
                </div>
                <div className="text-[#666373] text-xs font-medium">Limited spots left</div>
            </div>

            {/* Summary Info */}
            <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                    <Calendar className="text-[#0DAC87] shrink-0 mt-0.5" size={18} />
                    <div>
                        <p className="text-[#221E33] font-bold text-sm">Trip Dates</p>
                        <p className="text-[#666373] text-xs">{dateRange}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <MapPin className="text-[#0DAC87] shrink-0 mt-0.5" size={18} />
                    <div>
                        <p className="text-[#221E33] font-bold text-sm">Meeting Point</p>
                        <p className="text-[#666373] text-xs">{data?.location || "Madrid, Spain"}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Users className="text-[#0DAC87] shrink-0 mt-0.5" size={18} />
                    <div>
                        <p className="text-[#221E33] font-bold text-sm">Group Size</p>
                        <p className="text-[#666373] text-xs">{data?.groupSize || "12 - 24 participants"}</p>
                    </div>
                </div>
            </div>

            {/* Booking Actions */}
            {showApplyButton ? (
                <div className="space-y-3">
                    {(() => {
                        const { data: applications } = UsegetMyApplications();
                        const { data: paymentData } = UsegetPayment();

                        const userApp = useMemo(() => {
                            return (applications || []).find((app: any) => String(app.tripId) === String(data?.id));
                        }, [applications, data?.id]);

                        const isApproved = userApp?.status === 'approved';
                        const isPending = userApp?.status === 'pending';
                        const isRejected = userApp?.status === 'rejected';

                        const isPaid = useMemo(() => {
                            const tripPayments = paymentData?.tripPayments || [];
                            const OK_STATUSES = new Set(["completed", "paid", "confirmed", "succeeded", "success"]);
                            return tripPayments.some((p: any) =>
                                String(p.tripId) === String(data?.id) &&
                                OK_STATUSES.has((p.status || "").toString().toLowerCase())
                            );
                        }, [paymentData, data?.id]);

                        const isComingSoon = data?.status === 'coming soon';

                        if (isComingSoon) {
                            return (
                                <Button
                                    disabled
                                    className="w-full bg-[#FAFAFE] text-[#666373] border border-[#ECECF1] h-14 rounded-xl text-lg font-bold shadow-sm flex items-center justify-center gap-2 cursor-default"
                                >
                                    <Clock size={20} />
                                    Coming Soon
                                </Button>
                            );
                        }

                        const categoryName = (data?.categoryName || data?.category || data?.type || "").toLowerCase();
                        const isErasmus = ['erasmus+', 'erasmus', 'erasmus +'].some(c => categoryName.includes(c));
                        
                        const isWildTrip = ['wild trip', 'wild trips'].some(c => categoryName.includes(c));
                        const isWildWeekend = ['wild weekends', 'wild weekend', 'internal events', 'internal event'].some(c => categoryName.includes(c));
                        
                        // Erasmus+ always uses the video selection process, never direct payment.
                        // Wild Trip uses direct payment ONLY if applicationType is "payment".
                        const isDirectPayment = !isErasmus && (
                            isWildWeekend ||
                            (isWildTrip && data?.applicationType === 'payment')
                        );

                        const paymentAmount = isWildTrip && data?.applicationType === 'payment' && data?.depositAmount 
                            ? Number(data.depositAmount) 
                            : Number(data?.perHeadPrice || data?.price || 0);

                        if (isPaid) {
                            return (
                                <Button
                                    onClick={() => navigate("/user-dashboard")}
                                    className="w-full bg-[#0DAC87]/10 text-[#0DAC87] border border-[#0DAC87]/20 h-14 rounded-xl text-lg font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 size={20} />
                                    Already Booked
                                </Button>
                            );
                        }

                        if (isDirectPayment) {
                            return (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-[#0DAC87] hover:bg-[#119b7b] text-white h-14 rounded-xl text-lg font-bold shadow-md transition-all flex items-center justify-center gap-2">
                                            <Wallet size={20} />
                                            {isWildTrip ? `Pay Deposit (€${paymentAmount})` : `Pay Now to Join (€${paymentAmount})`}
                                        </Button>
                                    </DialogTrigger>
                                    <TripPaymentModal tripId={data?.id} paymentAmount={paymentAmount} />
                                </Dialog>
                            );
                        }

                        if (isApproved) {
                            return (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-[#FFB800] hover:bg-[#e6a600] text-[#221E33] h-14 rounded-xl text-lg font-bold shadow-md transition-all flex items-center justify-center gap-2">
                                            <Wallet size={20} />
                                            Pay Now (€{data?.perHeadPrice || data?.price || 0})
                                        </Button>
                                    </DialogTrigger>
                                    <TripPaymentModal tripId={data?.id} />
                                </Dialog>
                            );
                        }

                        if (isPending) {
                            return (
                                <Button disabled className="w-full bg-[#F8F9FB] text-[#666373] border border-[#ECECF1] h-14 rounded-xl text-lg font-bold shadow-sm flex items-center justify-center gap-2 cursor-default">
                                    <Clock size={20} />
                                    Application Under Review
                                </Button>
                            );
                        }

                        if (isRejected) {
                            return (
                                <Button disabled className="w-full bg-red-50 text-red-500 border border-red-100 h-14 rounded-xl text-lg font-bold shadow-sm flex items-center justify-center gap-2 cursor-default">
                                    <XCircle size={20} />
                                    Application Rejected
                                </Button>
                            );
                        }

                        return (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-[#0DAC87] hover:bg-[#119b7b] text-white h-14 rounded-xl text-lg font-bold shadow-md transition-all">
                                        Join Adventure
                                    </Button>
                                </DialogTrigger>
                                <ApplicationForm />
                            </Dialog>
                        );
                    })()}
                </div>
            ) : (
                <div className="space-y-3">
                    <Button 
                        onClick={() => navigate("/login")}
                        className="w-full bg-[#1F1B2C] hover:bg-[#2F2942] text-white h-14 rounded-xl text-lg font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        Sign in to Join Adventure
                    </Button>
                    <p className="text-center text-[#666373] text-xs font-medium">Create an account to start your journey</p>
                </div>
            )}

            {/* Small Guarantee Text */}
            <p className="mt-6 text-center text-[#666373] text-[11px] leading-relaxed">
                Free cancellation within 24 hours of booking. <br />
                Secure payment guaranteed.
            </p>
        </div>
    );
};

export default BookingCard;
