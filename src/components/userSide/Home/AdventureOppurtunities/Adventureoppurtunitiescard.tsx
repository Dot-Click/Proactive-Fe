import { Button } from "@/components/ui/button"
import { UsegetTrips } from "@/hooks/gettriphook"
import { useRef, useEffect } from "react"
import { LoaderIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Marquee from "react-fast-marquee"
import calender from "../../../../assets/calenderwhite.png"
import location from "../../../../assets/locationwhite.png"

const Adventureoppurtunitiescard = () => {
    const { data, isLoading } = UsegetTrips();
    const navigate = useNavigate();
    const trips = data?.trips ?? [];
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        // Pure DOM listeners to prevent React re-renders while seamlessly reversing CSS animations
        const handleMouseEnter = () => {
            const elements = container.querySelectorAll('.rfm-marquee');
            elements.forEach((el) => {
                el.getAnimations().forEach((anim) => {
                    anim.playbackRate = -1;
                });
            });
        };

        const handleMouseLeave = () => {
            const elements = container.querySelectorAll('.rfm-marquee');
            elements.forEach((el) => {
                el.getAnimations().forEach((anim) => {
                    anim.playbackRate = 1;
                });
            });
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const displayTrips = trips;

    // Category badge colors
    const getCategoryStyle = (type: string) => {
        const typeMap: Record<string, { bg: string; text: string }> = {
            "Mountain Adventure": { bg: "bg-[#FBF2DB] hover:bg-[#f0e5ca]", text: "text-[#845111]" },
            "Wild Weekend": { bg: "bg-[#C4FFF0] hover:bg-[#adebdb]", text: "text-[#156250]" },
            "Camping Adventure": { bg: "bg-[#DFF2FF] hover:bg-[#cfe6f5]", text: "text-[#3B607A]" },
        };
        return typeMap[type] || { bg: "bg-[#FBF2DB] hover:bg-[#f0e5ca]", text: "text-[#845111]" };
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoaderIcon className="animate-spin h-12 w-12 text-[#0DAC87]" />
            </div>
        );
    }

    if (displayTrips.length === 0) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-[#666373] text-lg font-medium">More information coming soon.</p>
            </div>
        );
    }
    return (
        <div 
            ref={containerRef}
            className="relative w-full group/carousel px-4 sm:px-16 overflow-hidden"
        >
            <Marquee 
                speed={40} 
                direction="left"
                pauseOnHover={false} 
                gradient={false} 
                className="py-4 overflow-y-hidden pt-4 pb-8"
            >
                <div className="flex gap-5 pr-5">
            {displayTrips.map((trip: any, index: number) => {
                const categoryStyle = getCategoryStyle(trip.type || "Mountain Adventure");
                return (
                    <div
                        key={trip.id || index}
                        className="relative h-[400px] w-[320px] sm:w-[350px] lg:w-[380px] flex-shrink-0 rounded-[14px] overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                        onClick={() => navigate(`/trip/${trip.id}`)}
                    >
                        <img
                            src={trip.coverImage || ""}
                            alt={trip.title || trip.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder-trip.jpg";
                            }}
                        />

                        {/* CSS Gradient Overlay for better aesthetics and readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-0 pointer-events-none" />

                        <div className="absolute inset-0 flex flex-col justify-between items-start py-6 px-5 z-10 transition-colors duration-300 group-hover:bg-black/10">
                            <Button className={`${categoryStyle.bg} cursor-pointer ${categoryStyle.text} font-bold rounded-full px-4 text-xs h-8 shadow-sm`}>
                                {trip.type || "Adventure"}
                            </Button>

                            <div className="w-full space-y-4">
                                <h4 className="text-[#FFFFFF] font-extrabold text-2xl tracking-tight leading-tight group-hover:text-[#C4FFF0] transition-colors duration-300">
                                    {trip.title || trip.name}
                                </h4>

                                <div className="flex items-center justify-between w-full gap-4">
                                    <div className="flex flex-col gap-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <img src={calender} alt="calender" className="w-4 h-4 opacity-90" />
                                            <p className="text-[#FFFFFF]/90 text-[13px] font-medium">
                                                {trip.startDate && trip.endDate
                                                    ? `${new Date(trip.startDate).toLocaleDateString(undefined, { day: "2-digit", month: "short" })} - ${new Date(trip.endDate).toLocaleDateString(undefined, { day: "2-digit", month: "short" })}`
                                                    : "Dates TBA"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <img src={location} alt="location" className="w-4 h-4 opacity-90" />
                                            <p className="text-[#FFFFFF]/90 text-[13px] font-medium tracking-wide">
                                                {trip.location || "Location TBA"}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/trip/${trip.id}`);
                                        }}
                                        className="bg-[#0DAC87] hover:bg-[#11c89f] cursor-pointer text-[#FFFFFF] font-bold rounded-full px-7 py-5 shadow-lg active:scale-95 transition-all duration-200"
                                    >
                                        More Info
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
                </div>
            </Marquee>
        </div>
    );
};

export default Adventureoppurtunitiescard