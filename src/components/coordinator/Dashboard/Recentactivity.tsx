import { Clock, EllipsisVertical } from "lucide-react"

const RecentactivityProps = [
    {
        activity: "Approved Wild Weekend Barcelona",
        time: "2 hours ago"
    },
    {
        activity: "Rejected Rome Explorer",
        time: "5 hours ago"
    },
    {
        activity: "Created Asia Tour 2025",
        time: "1 day ago"
    },
    {
        activity: "Published Amsterdam Food Tour",
        time: "2 days ago"
    },
    {
        activity: "Published Amsterdam Food Tour",
        time: "2 days ago"
    },
    {
        activity: "Published Amsterdam Food Tour",
        time: "2 days ago"
    },
]

const Recentactivity = () => {
    return (
        <div className="px-4 py-6 bg-white rounded-[25px] shadow-sm border border-[#E9ECF5] mt-2 w-full">
            <h1 className="bg-gradient-to-r from-[#221E33] to-[rgb(86,80,112)] mb-3  text-[16px] text-transparent bg-clip-text font-semibold">Recent Activity</h1>
            <div className="flex flex-col gap-3 max-h-[367px] overflow-y-auto pr-1">
                {
                    RecentactivityProps.map((item, index) => (
                        <div key={index} className="bg-[#FAFAFE] flex justify-between gap-4 px-4 py-4 rounded-[16px]" >
                            <div className="flex flex-col gap-2">
                                <span className="text-[12px] text-[#666373] leading-[16px] font-semibold">{item.activity}</span>
                                <div className="flex gap-2 items-center">
                                    <Clock size={14} color="#A6ADB9" />
                                    <span className="text-[#A6ADB9] text-[12px]">{item.time}</span>
                                </div>
                            </div>
                            <div className="flex">
                                <EllipsisVertical className="cursor-pointer text-[#4A5D61]/61" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Recentactivity