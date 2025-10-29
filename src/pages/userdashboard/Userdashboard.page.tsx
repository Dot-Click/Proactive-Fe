import Carousel from "@/components/userDashboard/Carousel/Carousel"
import UserProfile from "@/components/userDashboard/profile/userprofile"
import Stats from "@/components/userDashboard/Stats/Stats"



const UserdashboardPage = () => {
  return (
    <div className="px-24">
        <Carousel UserName={"Alex"} subHeading={"Ready for your next adventure? Let's make it happen!"}/>
        <div className="flex lg:flex-row flex-col gap-4">
          <Stats/>
          <UserProfile/>
        </div>
    </div>
  )
}

export default UserdashboardPage