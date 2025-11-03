import Pastadventures from "@/components/Adventureoppurtunities/Pastadventures"
import Searchbar from "@/components/Adventureoppurtunities/Searchbar"
import Showtrips from "@/components/Adventureoppurtunities/Showtrips"
import Tabs from "@/components/Adventureoppurtunities/Tabs"
import Upcomingtrips from "@/components/Adventureoppurtunities/Upcomingtrips"
import Carousel from "@/components/userDashboard/Carousel/Carousel"
import { useState } from "react"

const AdventureOppurtunitiesPage = () => {
const [view, setView] = useState("list")
  return (
    <>
      <div className="px-16 overflow-x-hidden">
        <Carousel UserName={"Alex"} subHeading={"Discover amazing destinations and join our community of adventurers"} />
      </div>
      <div>
        <Searchbar view={view} setView={setView}/>
        <Tabs/>
        <Showtrips view={view}/>
        <Upcomingtrips/>
        <Pastadventures/>
      </div>
    </>
  )
}

export default AdventureOppurtunitiesPage