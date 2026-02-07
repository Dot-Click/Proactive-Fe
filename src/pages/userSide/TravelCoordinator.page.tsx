import FellowExplorer from "@/components/userSide/TravelCoordinator/FellowExplorer"
import LeadAdventure from "@/components/userSide/TravelCoordinator/LeadAdventure"
import MeetCoordinator from "@/components/userSide/TravelCoordinator/MeetCoordinator"
import Ourjourney from "@/components/userSide/About/Ourjourney/Ourjourney"

const TravelCoordinatorPage = () => {
  return (
    <div>
        <FellowExplorer/>
        <MeetCoordinator/>
        <Ourjourney/>
        <LeadAdventure/>
    </div>
  )
}

export default TravelCoordinatorPage