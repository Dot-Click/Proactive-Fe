import TotalUsers from "@/assets/sidebaricon/totalusers.png"
import Coordinator from "@/assets/sidebaricon/coordinators.png"
import ActiveTrips from "@/assets/sidebaricon/activetrips.png"
import CloseTrips from "@/assets/sidebaricon/closetrips.png"
import { Badge } from "@/components/ui/badge"
import { UsegetdashboardStats } from "@/hooks/getdashboardStats"

const AdminStates = () => {
    const { data, isLoading, isError } = UsegetdashboardStats();
    if (isError) {
        return <div>Error loading dashboard stats.</div>;
    }
    const stats = [
        {
            id: 1,
            name: "Total Users",
            value: (
                isLoading ? "Loading..." : data?.keyStats?.totalUsers?.value
            ),
            percentageChange: (
                isLoading ? "Loading..." : data?.keyStats?.totalUsers?.percentageChange
            ),
            isPositive: (isLoading ? "Loading..." : data?.keyStats?.totalUsers?.isPositive
            ),
            icon: TotalUsers,
        },
        {
            id: 2,
            name: "Coordinators",
            value: (
                isLoading ? "Loading..." : data?.keyStats?.coordinators?.value
            ),
            percentageChange: (
                isLoading ? "Loading..." : data?.keyStats?.coordinators?.percentageChange
            ),
            isPositive: (
                isLoading ? "Loading..." : data?.keyStats?.coordinators?.isPositive
            ),
            icon: Coordinator,
        },
        {
            id: 3,
            name: "Active Trips",
            value: (
                isLoading ? "Loading..." : data?.keyStats?.activeTrips?.value
            ),
            percentageChange: (
                isLoading ? "Loading..." : data?.keyStats?.activeTrips?.percentageChange
            ),
            isPositive: (
                isLoading ? "Loading..." : data?.keyStats?.activeTrips?.isPositive
            ),
            icon: ActiveTrips,
        },
        {
            id: 4,
            name: "Closed Trips",
            value: (
                isLoading ? "Loading..." : data?.keyStats?.closedTrips?.value
            ),
            percentageChange: (
                isLoading ? "Loading..." : data?.keyStats?.closedTrips?.percentageChange
            ),
            isPositive: (
                isLoading ? "Loading..." : data?.keyStats?.closedTrips?.isPositive
            ),
            icon: CloseTrips,
        },
    ];

    return (
        <div className="px-6 py-4 bg-white rounded-[25px] shadow-md mt-1">
            <h1 className="text-[#221E33] mb-4">Key Stats</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className="cursor-pointer flex justify-between p-4 bg-[#FAFAFE] rounded-[20px] hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col">
                            <p className="text-sm">{stat.name}</p>

                            <p className="text-[30px] font-bold bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                {stat.value ?? 0}
                            </p>

                            <Badge
                                className={`text-sm mt-2 rounded-full px-3 py-1 ${stat.isPositive
                                    ? "text-[#1DBA4C] bg-[#00FF4D]/10 border border-[#1DBA4C]"
                                    : "text-[#BA1D1D] bg-[#FF0000]/10 border border-[#BA1D1D]"
                                    }`}
                            >
                                {stat.percentageChange}%
                            </Badge>
                        </div>

                        <div className="bg-black p-2 rounded-full h-fit">
                            <img src={stat.icon} alt={stat.name} className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminStates;
