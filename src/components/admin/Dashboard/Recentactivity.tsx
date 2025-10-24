import { Clock, EllipsisVertical } from "lucide-react"


const RecentactivityProps = [
  {
    activity: "User JohnDoe upgraded to Gold Membership",
    time: "2 hours ago"
  },
  {
    activity: "User JohnDoe upgraded to Gold Membership",
    time: "5 hours ago"
  },
  {
    activity: "User JohnDoe upgraded to Gold Membership",
    time: "1 day ago"
  },
  {
    activity: "User JohnDoe upgraded to Gold Membership",
    time: "2 days ago"
  },
]

const Recentactivity = () => {
  return (
    <div className="px-4 py-6 bg-white rounded-[25px] shadow-md border border-[#E9ECF5] mt-1 w-full ">
      <h1 className="bg-gradient-to-r from-[#221E33] to-[rgb(86,80,112)] mb-3  text-[16px] text-transparent bg-clip-text font-semibold">Recent Activity</h1>
      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
      {
        RecentactivityProps.map((item, index) => (
          <div key={index} className="bg-[#FAFAFE] flex justify-between gap-4 px-4 py-3 rounded-[16px]" >
            <div className="flex flex-col gap-2">
              <span className="text-[12px] text-[#666373] leading-[16px]">{item.activity}</span>
              <div className="flex gap-2 items-center">
                <Clock size={14} color="#A6ADB9" />
                <span className="text-[#A6ADB9] text-[12px]">{item.time}</span>
              </div>
            </div>
            <div className="flex">
              <EllipsisVertical className="cursor-pointer" color="#C3C8D4" />
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Recentactivity