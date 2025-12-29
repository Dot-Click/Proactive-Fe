import { UsegetdashboardStats } from "@/hooks/getdashboardStats";
import { Clock, EllipsisVertical } from "lucide-react"



const Recentactivity = () => {
const { data } = UsegetdashboardStats();
const recentActivity = data?.recentActivity?.map((item: {message: string, timeAgo: string}) => {
    return {
        message: item.message,
        timeAgo: item.timeAgo
    }
})
const RecentactivityProps = 
  {
    activity: recentActivity.message ,
    time: recentActivity.timeAgo 
  }

  return (
    <div className="px-4 py-6 bg-white rounded-[25px] shadow-md border border-[#E9ECF5] mt-1 w-full ">
      <h1 className="bg-gradient-to-r from-[#221E33] to-[rgb(86,80,112)] mb-3  text-[16px] text-transparent bg-clip-text font-semibold">Recent Activity</h1>
      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
        {
            <div className="bg-[#FAFAFE] flex justify-between gap-4 px-4 py-3 rounded-[16px]" >
              <div className="flex flex-col gap-2">
                <span className="text-[12px] text-[#666373] leading-[16px]">{RecentactivityProps.activity}</span>
                <div className="flex gap-2 items-center">
                  <Clock size={14} color="#A6ADB9" />
                  <span className="text-[#A6ADB9] text-[12px]">{RecentactivityProps.time}</span>
                </div>
              </div>
              <div className="flex">
                <EllipsisVertical className="cursor-pointer" color="#C3C8D4" />
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default Recentactivity