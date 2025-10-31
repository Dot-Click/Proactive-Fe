import Searchbar from "@/components/Adventureoppurtunities/Searchbar"
import Tabs from "@/components/Adventureoppurtunities/Tabs"
import Carousel from "@/components/userDashboard/Carousel/Carousel"

const AdventureOppurtunitiesPage = () => {
  return (
    <>
      <div className="px-16 overflow-x-hidden">
        <Carousel UserName={"Alex"} subHeading={"Discover amazing destinations and join our community of adventurers"} />
      </div>
      <div>
        <Searchbar />
        <Tabs/>
      </div>
    </>
  )
}

export default AdventureOppurtunitiesPage