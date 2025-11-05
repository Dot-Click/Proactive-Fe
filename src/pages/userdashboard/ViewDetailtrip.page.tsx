import Coordinatordetail from "@/components/Adventureoppurtunities/ViewDetailtrip/Coordinatordetail"
import Daybyday from "@/components/Adventureoppurtunities/ViewDetailtrip/Daybyday"
import Includeditem from "@/components/Adventureoppurtunities/ViewDetailtrip/Includeditem"
import Locationmeetingpoint from "@/components/Adventureoppurtunities/ViewDetailtrip/Locationmeetingpoint"
import MasonryLayout from "@/components/Adventureoppurtunities/ViewDetailtrip/MasonryLayout"
import ParticipantsCards from "@/components/Adventureoppurtunities/ViewDetailtrip/ParticipantsCards"
import SurfaceCamp from "@/components/Adventureoppurtunities/ViewDetailtrip/SurfaceCamp"
import Tripmood from "@/components/Adventureoppurtunities/ViewDetailtrip/Tripmood"
import VideoSection from "@/components/Adventureoppurtunities/ViewDetailtrip/VideoSection"

const ViewDetailTripPage = () => {
  return (
    <div>
        <MasonryLayout/>
        <Locationmeetingpoint/>
        <Tripmood/>
        <SurfaceCamp/>
        <Daybyday/>
        <Includeditem/>
        <VideoSection/>
        <Coordinatordetail/>
        <ParticipantsCards/>
    </div>
  )
}

export default ViewDetailTripPage