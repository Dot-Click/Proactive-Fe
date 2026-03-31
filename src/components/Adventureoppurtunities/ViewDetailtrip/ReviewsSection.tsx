import { useAdminGoogleReviews, useGoogleReviewStats } from "@/hooks/adminGoogleReviewHook";
import { Loader2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReviewsSection = ({ trip }: { trip?: any }) => {
    const { data: reviews, isLoading, isError } = useAdminGoogleReviews();
    const { data: stats } = useGoogleReviewStats();

    // Favor trip-specific data, then global stats, then hardcoded defaults
    const rating = trip?.rating || stats?.rating || "4.9";
    const reviewsCount = trip?.reviewsCount || stats?.totalReviews || 92;
    const reviewLink = trip?.reviewLink || "https://www.google.com/maps/place/Proactive+Future/@35.67445,-6.8143,2933475m/data=!3m2!1e3!4b1!4m6!3m5!1s0x65e285d9dffa46ab:0x3dd1b18e867e6183!8m2!3d35.67445!4d-6.8143!16s%2Fg%2F11t6yzt6vh?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D";

    if (isLoading) {
        return (
            <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-[#108700]" />
            </div>
        );
    }

    if (isError || !reviews || reviews.length === 0) {
        return null; // Don't show anything if there are no reviews or an error
    }

    // Filter only active reviews
    const activeReviews = reviews.filter((r: any) => r.isActive).slice(0, 6);

    if (activeReviews.length === 0) return null;

    return (
        <div className="py-12 border-t border-gray-100 mt-16">
            <div className="mb-10 text-center lg:text-left">
                <h2 className="text-[#221E33] font-bold text-3xl mb-4">What Our Travelers Say</h2>
                <a 
                    href={reviewLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 justify-center lg:justify-start hover:opacity-80 transition-opacity cursor-pointer group"
                >
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} fill="currentColor" />
                        ))}
                    </div>
                    <span className="text-gray-600 font-medium group-hover:text-[#108700] transition-colors">
                        {rating}/5 — Over {reviewsCount}+ Happy Adventurers
                    </span>
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeReviews.map((review: any) => (
                    <a 
                        key={review.id} 
                        href={review.reviewLink || "https://www.google.com/maps/place/Proactive+Future/@35.2255919,-17.426007,2949883m/data=!3m2!1e3!4b1!4m6!3m5!1s0x65e285d9dffa46ab:0x3dd1b18e867e6183!8m2!3d35.67445!4d-6.8143!16s%2Fg%2F11t6yzt6vh?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#FAFAFE] p-6 rounded-[24px] border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                <AvatarImage src={review.profilePicture} alt={review.reviewerName} />
                                <AvatarFallback className="bg-[#108700] text-white font-bold">
                                    {review.reviewerName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-bold text-[#221E33] text-sm">{review.reviewerName}</h4>
                                <div className="flex text-yellow-500">
                                    {[...Array(review.stars || 5)].map((_, i) => (
                                        <Star key={i} size={10} fill="currentColor" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[#606066] text-sm leading-relaxed italic flex-grow">
                            "{review.reviewText}"
                        </p>
                    </a>
                ))}
            </div>
            
            <div className="mt-8 text-center lg:text-right">
                <a 
                    href="https://www.google.com/maps/place/Proactive+Future/@35.2255919,-17.426007,2949883m/data=!3m2!1e3!4b1!4m6!3m5!1s0x65e285d9dffa46ab:0x3dd1b18e867e6183!8m2!3d35.67445!4d-6.8143!16s%2Fg%2F11t6yzt6vh?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#108700] font-bold text-sm hover:underline flex items-center gap-2 justify-center lg:justify-end"
                >
                    View all {stats?.totalReviews || 92}+ reviews on Google <Star size={14} fill="currentColor" />
                </a>
            </div>
        </div>
    );
};

export default ReviewsSection;
