import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, ShieldCheck, Heart } from "lucide-react";
import { formatDateRange } from "../../../utils/dateFormatter";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";

type BookingCardProps = {
    trip: any;
    showApplyButton?: boolean;
};

const BookingCard = ({ trip, showApplyButton }: BookingCardProps) => {
    const data = trip?.trip?.[0] || trip?.trip || trip;

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
            {showApplyButton && (
                <div className="space-y-3">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full bg-[#0DAC87] hover:bg-[#119b7b] text-white h-14 rounded-xl text-lg font-bold shadow-md transition-all">
                                Join Adventure
                            </Button>
                        </DialogTrigger>
                        <ApplicationForm />
                    </Dialog>
                    <Button variant="outline" className="w-full h-12 rounded-xl border-[#ECECF1] text-[#221E33] font-bold text-sm hover:bg-[#F6F8FD] gap-2">
                        <Heart size={18} className="text-[#EF4444]" />
                        Add to Wishlist
                    </Button>
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
