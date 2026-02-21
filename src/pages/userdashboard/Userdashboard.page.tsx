import Achievement from "@/components/userDashboard/Achievement/Achievement"
import AlertError from "@/components/userDashboard/Alert/Alert"
import Carousel from "@/components/userDashboard/Carousel/Carousel"
import UserProfile from "@/components/userDashboard/profile/userprofile"
import ReviewReminder from "@/components/userDashboard/ReviewReminder/ReviewReminder"
// import ReviewReminder from "@/components/userDashboard/ReviewReminder/ReviewReminder"
import Stats from "@/components/userDashboard/Stats/Stats"
import UpcomingAdventures from "@/components/userDashboard/upcomingAdventures/UpcomingAdventures"
// import Pastadventures from "@/components/userSide/OpenOppurtunities/PastAdventure/Pastadventures"



const UserdashboardPage = () => {
  return (
    <div className="md:px-16 px-4 overflow-x-hidden">
      <Carousel UserName={"Alex"} subHeading={"Ready for your next adventure? Let's make it happen!"} />
      <AlertError />
      <div className="flex lg:flex-row flex-col gap-4 items-start mb-8">
        <div className="flex flex-col gap-4 flex-1 min-w-0 w-full">
          <Stats />
          <UpcomingAdventures />
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-80 shrink-0">
          <UserProfile />
          <Achievement />
          <ReviewReminder />
        </div>
      </div>
      {/* <div className="mb-8">
        <Pastadventures />
      </div> */}
    </div>
  )
}

export default UserdashboardPage