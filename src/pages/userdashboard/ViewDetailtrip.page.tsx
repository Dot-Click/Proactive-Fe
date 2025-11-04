import Daybyday from "@/components/Adventureoppurtunities/ViewDetailtrip/Daybyday"
import Includeditem from "@/components/Adventureoppurtunities/ViewDetailtrip/Includeditem"
import Locationmeetingpoint from "@/components/Adventureoppurtunities/ViewDetailtrip/Locationmeetingpoint"
import MasonryLayout from "@/components/Adventureoppurtunities/ViewDetailtrip/MasonryLayout"
import Tripmood from "@/components/Adventureoppurtunities/ViewDetailtrip/Tripmood"
import VideoSection from "@/components/Adventureoppurtunities/ViewDetailtrip/VideoSection"

const ViewDetailTripPage = () => {
  return (
    <div>
        <MasonryLayout/>
        <Locationmeetingpoint/>
        <Tripmood/>
        <Daybyday/>
        <Includeditem/>
        <VideoSection/>
    </div>
  )
}

export default ViewDetailTripPage