import Pastadventures from "@/components/Adventureoppurtunities/Pastadventures"
import Searchbar from "@/components/Adventureoppurtunities/Searchbar"
import Showtrips from "@/components/Adventureoppurtunities/Showtrips"
import Tabs from "@/components/Adventureoppurtunities/Tabs"
import Upcomingtrips from "@/components/Adventureoppurtunities/Upcomingtrips"
import Carousel from "@/components/userDashboard/Carousel/Carousel"
import { useState } from "react"

const AdventureOppurtunitiesPage = () => {
  const [view, setView] = useState("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")

  return (
    <>
      <div className="md:px-16 px-4 overflow-x-hidden">
        <Carousel
          UserName={"Alex"}
          subHeading={"Discover amazing destinations and join our community of adventurers"}
        />
      </div>
      <div>
        <Searchbar
          view={view}
          setView={setView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
        />
        <Tabs />
        <Showtrips view={view} searchQuery={searchQuery} category={category} />
        <Upcomingtrips />
        <Pastadventures />
      </div>
    </>
  )
}

export default AdventureOppurtunitiesPage