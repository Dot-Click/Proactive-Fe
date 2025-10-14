import { Clock, EllipsisVertical } from "lucide-react"


const RecentactivityProps = [
  {
    activity: "User JohnDoe upgraded to Gold Membership",
    time: "2 hours ago"
  },
  {
    activity: "User JaneSmith booked a trip to Paris",
    time: "5 hours ago"
  },
  {
    activity: "User MikeBrown canceled his reservation",
    time: "1 day ago"
  },
  {
    activity: "User EmilyWhite left a review for London trip",
    time: "2 days ago"
  }
]
const Recentactivity = () => {
  return (
    <div className="px-4 py-6 bg-white rounded-[25px] shadow-md mt-1">
      <h1 className="bg-gradient-to-r from-[#221E33] to-[rgb(86,80,112)] mb-4 text-[20px] text-transparent bg-clip-text font-medium">Recent Activity</h1>
      <div className="flex flex-col gap-3">
      {
        RecentactivityProps.map((item, index) => (
          <div key={index} className="bg-[#FAFAFE] flex justify-between gap-4 px-3 py-4 rounded-[20px]" >
            <div className="flex flex-col gap-2">
              <span className="text-[12px] text-[#666373]">{item.activity}</span>
              <div className="flex gap-2 items-center">
                <Clock size={14} color="#A6ADB9" />
                <span className="text-[#A6ADB9] text-[12px]">2 hours ago</span>
              </div>
            </div>
            <div className="flex">
              <EllipsisVertical className="cursor-pointer" color="#A6ADB9" />
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Recentactivity