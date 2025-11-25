import Pastadventures from "@/components/userSide/OpenOppurtunities/PastAdventure/Pastadventures"
import Searchbar from "@/components/userSide/OpenOppurtunities/SearchBar/Searchbar"
import Showtrips from "@/components/userSide/OpenOppurtunities/Showtrip/Showtrips"
import Tabs from "@/components/userSide/OpenOppurtunities/Tabs/Tabs"
import Upcomingtrips from "@/components/userSide/OpenOppurtunities/Upcomingtrip/Upcomingtrips"
import { useState } from "react"

const OpenOppurtunitiesPage = () => {
  const [view, setView] = useState("list")
  return (
    <div>
      <div className="lg:pt-0 md:pt-20">
      <Searchbar view={view} setView={setView} />
      </div>
      <Tabs />
      <Showtrips view={view} />
      <Upcomingtrips />
      <Pastadventures />
    </div>
  )
}

export default OpenOppurtunitiesPage