import { Button } from "@/components/ui/button"
import { UsegetTrips } from "@/hooks/gettriphook"
import { LoaderIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import calender from "../../../../assets/calenderwhite.png"
import location from "../../../../assets/locationwhite.png"
import Shadowblack from "../../../../assets/blackshadow.png"

const Adventureoppurtunitiescard = () => {
    const { data, isLoading } = UsegetTrips();
    const navigate = useNavigate();
    const trips = data?.trips ?? [];

    // Take only the first 3 trips for display
    const displayTrips = trips.slice(0, 3);

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
        <div className="flex flex-col lg:flex-row gap-5">
            {displayTrips.map((trip: any, index: number) => {
                const categoryStyle = getCategoryStyle(trip.type || "Mountain Adventure");
                return (
                    <div key={trip.id || index} className="relative h-[400px] rounded-[14px] overflow-hidden">
                        <img
                            src={trip.coverImage || ""}
                            alt={trip.title || trip.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder-trip.jpg";
                            }}
                        />
                        <div className="absolute inset-0 z-0 top-auto">
                            <img src={Shadowblack} alt="Shadowblack" />
                        </div>

                        <div className="absolute inset-0 flex flex-col justify-between items-start py-6 px-4 z-10">
                            <Button className={`${categoryStyle.bg} cursor-pointer ${categoryStyle.text} font-semibold rounded-[10px]`}>
                                {trip.type || "Adventure"}
                            </Button>

                            <div className="w-full space-y-3 mb-2">
                                <h4 className="text-[#FFFFFF] font-bold text-2xl">{trip.title || trip.name}</h4>

                                <div className="flex items-center justify-between w-full gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <img src={calender} alt="calender" className="w-5" />
                                            <p className="text-[#FFFFFF] text-[12px]">
                                                {trip.startDate && trip.endDate
                                                    ? `${new Date(trip.startDate).toLocaleDateString(undefined, { day: "2-digit", month: "short" })} - ${new Date(trip.endDate).toLocaleDateString(undefined, { day: "2-digit", month: "short" })}`
                                                    : "Dates TBA"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <img src={location} alt="location" className="w-4" />
                                            <p className="text-[#FFFFFF] text-[12px]">{trip.location || "Location TBA"}</p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => navigate(`/user-dashboard/viewdetail/${trip.id}`)}
                                        className="bg-[#0DAC87] hover:bg-[#0ca07d] cursor-pointer text-[#FFFFFF] font-semibold rounded-full px-8 py-5"
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
    );
};

export default Adventureoppurtunitiescard