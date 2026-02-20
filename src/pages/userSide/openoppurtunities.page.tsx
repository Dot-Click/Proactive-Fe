import Pastadventures from "@/components/userSide/OpenOppurtunities/PastAdventure/Pastadventures"
import Searchbar from "@/components/userSide/OpenOppurtunities/SearchBar/Searchbar"
import Showtrips from "@/components/userSide/OpenOppurtunities/Showtrip/Showtrips"
import Tabs, { type TabId } from "@/components/userSide/OpenOppurtunities/Tabs/Tabs"
import Upcomingtrips from "@/components/userSide/OpenOppurtunities/Upcomingtrip/Upcomingtrips"
// import OpenOppurtunities from "@/components/userSide/WildWeekend/OpenOppurtunities/OpenOppurtunities"
import { useState } from "react"

const OpenOppurtunitiesPage = () => {
  const [view, setView] = useState("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")
  const [activeTab, setActiveTab] = useState<TabId>("all")

  return (
    <div>
      {/* <OpenOppurtunities /> */}
      <div className="lg:pt-0 font-quickSand md:pt-20">
        <Searchbar
          view={view}
          setView={setView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
        />
      </div>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <Showtrips view={view} searchQuery={searchQuery} category={category} activeTab={activeTab} />
      <Upcomingtrips searchQuery={searchQuery} setSearchQuery={setSearchQuery} category={category} />
      <Pastadventures />
    </div>
  )
}

export default OpenOppurtunitiesPage