import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import bottomimg from "../../../../assets/participantsbottom.png"
import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa";
import { useReviews } from "@/hooks/getReviewshook";
import type { ReviewItem } from "@/hooks/getReviewshook";

const FALLBACK_CARDS: { Description: string; Name: string; CollegeName: string }[] = [
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
];

const TestimonialCard = ({ item, isReview }: { item: ReviewItem | (typeof FALLBACK_CARDS)[0]; isReview: boolean }) => {
    const description = isReview ? (item as ReviewItem).review : (item as (typeof FALLBACK_CARDS)[0]).Description;
    const name = isReview ? (item as ReviewItem).userName : (item as (typeof FALLBACK_CARDS)[0]).Name;
    const subtext = isReview ? "Google Review" : (item as (typeof FALLBACK_CARDS)[0]).CollegeName;
    const avatarSrc = isReview ? (item as ReviewItem).userImage : undefined;
    const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    const link = isReview ? (item as ReviewItem).link : undefined;

    const content = (
        <div className="w-full h-full shadow-md flex flex-col gap-6 bg-[#F9F9F9] border border-[#E0D9D9] rounded-[20px] px-10 py-8">
            <span className="text-[#514D4D] font-semibold text-[14px]">{description}</span>
            <img src={bottomimg} alt="" />
            <div className="flex items-center gap-2">
                <Avatar className="lg:w-18 lg:h-18 mr-2">
                    <AvatarImage src={avatarSrc} alt={name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h4 className="text-[#19232B] font-semibold">{name}</h4>
                    <span className="text-[#514D4D] text-[13px] text-nowrap">{subtext}</span>
                    <div className="flex gap-2 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} color="#0DAC87" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (link) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer" className="cursor-pointer block h-full">
                {content}
            </a>
        );
    }
    return content;
};

const Testimonial = () => {
    const { data: reviews, isLoading } = useReviews();
    const cards = reviews?.length ? reviews : FALLBACK_CARDS;
    const isReview = !!reviews?.length && !isLoading;

    return (
        <div className="py-12 px-4 sm:px-16">
            <Marquee direction="left" pauseOnHover speed={50} gradient={false}>
                <div className="flex gap-6 lg:gap-10 py-4 px-4 cursor-pointer">
                    {cards.map((item, index) => (
                        <div key={isReview ? (item as ReviewItem).link + index : index} className="w-[350px] sm:w-[450px] flex-shrink-0">
                            <TestimonialCard
                                item={item as ReviewItem & (typeof FALLBACK_CARDS)[0]}
                                isReview={isReview}
                            />
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    )
}

export default Testimonial