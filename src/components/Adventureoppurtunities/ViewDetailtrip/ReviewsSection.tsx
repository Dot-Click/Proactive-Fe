import { useAdminGoogleReviews } from "@/hooks/adminGoogleReviewHook";
import { Loader2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReviewsSection = () => {
    const { data: reviews, isLoading, isError } = useAdminGoogleReviews();

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
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} fill="currentColor" />
                        ))}
                    </div>
                    <span className="text-gray-600 font-medium">Over 500+ Happy Adventurers</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeReviews.map((review: any) => (
                    <div key={review.id} className="bg-[#FAFAFE] p-6 rounded-[24px] border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
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
                    </div>
                ))}
            </div>
            
            <div className="mt-8 text-center lg:text-right">
                <a 
                    href="https://www.google.com/search?q=proactive+wild+trips+reviews" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#108700] font-bold text-sm hover:underline flex items-center gap-2 justify-center lg:justify-end"
                >
                    View all 150+ reviews on Google <Star size={14} fill="currentColor" />
                </a>
            </div>
        </div>
    );
};

export default ReviewsSection;
