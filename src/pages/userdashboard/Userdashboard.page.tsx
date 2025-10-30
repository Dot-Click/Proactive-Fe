import Achievement from "@/components/userDashboard/Achievement/Achievement"
import AlertError from "@/components/userDashboard/Alert/Alert"
import Carousel from "@/components/userDashboard/Carousel/Carousel"
import UserProfile from "@/components/userDashboard/profile/userprofile"
import ReviewReminder from "@/components/userDashboard/ReviewReminder/ReviewReminder"
import Stats from "@/components/userDashboard/Stats/Stats"
import UpcomingAdventures from "@/components/userDashboard/upcomingAdventures/UpcomingAdventures"



const UserdashboardPage = () => {
  return (
    <div className="px-16">
      <Carousel UserName={"Alex"} subHeading={"Ready for your next adventure? Let's make it happen!"} />
      <AlertError/>
      <div className="flex lg:flex-row flex-col gap-4 items-start mb-8">
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <Stats />
          <UpcomingAdventures />
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-80 shrink-0">
          <UserProfile />
          <Achievement />
          <ReviewReminder />
        </div>
      </div>
    </div>
  )
}

export default UserdashboardPage