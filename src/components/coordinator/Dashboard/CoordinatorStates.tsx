import TotalUsers from "@/assets/sidebaricon/totalusers.png"
import Coordinator from "@/assets/sidebaricon/coordinators.png"
import ActiveTrips from "@/assets/sidebaricon/activetrips.png"
import CloseTrips from "@/assets/sidebaricon/closetrips.png"
import { Badge } from "@/components/ui/badge"

const stats = [
    {
        id: 1,
        name: 'Active Trips',
        value: '42',
        icon: TotalUsers,
        change: '+8%',
    },
    {
        id: 2,
        name: 'Upcoming Trips',
        value: '18',
        icon: Coordinator,
        change: '+28%'
    },
    {
        id: 3,
        name: 'Pending Reviews',
        value: '24',
        icon: ActiveTrips,
        change: '-15%'
    },
    {
        id: 4,
        name: 'Close Trips',
        value: '85',
        icon: CloseTrips,
        change: '+12%'
    }
]

const CoordinatorStates = () => {
    return (
        <div className="px-6 py-4 bg-white rounded-[25px] shadow-md mt-1">
            <h1 className="text-[#221E33] mb-4">Key States</h1>
            <div className="grid grid-col-1 lg:grid-cols-4 md:grid-cols-2 mt-2 gap-6">
                {
                    stats.map((stat) => (
                        <div>
                            <div key={stat.id} className="cursor-pointer flex justify-between gap-2 p-4 bg-[#FAFAFE] rounded-[20px] hover:shadow-md transition-shadow duration-300">
                                <div className="flex flex-col">
                                    <p className="text-sm ">{stat.name}</p>
                                    <p className="text-[30px] font-bold bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">{stat.value}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge className={`text-sm  rounded-full px-3 py-1 ${stat.change.startsWith('+') ? 'text-[#1DBA4C] bg-[#00FF4D]/10 border border-[#1DBA4C]' : 'text-[#BA1D1D] border border-[#BA1D1D] bg-[#FF0000]/10'}`}>{stat.change}</Badge>
                                        <span className="text-[#666373] text-[12px]">from last month</span>
                                    </div>
                                </div>
                                <div className="bg-black p-2 rounded-full h-full">
                                    <img src={stat.icon} alt={stat.name} className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CoordinatorStates