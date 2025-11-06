import Coordinatordetail from "@/components/Adventureoppurtunities/ViewDetailtrip/Coordinatordetail"
import Daybyday from "@/components/Adventureoppurtunities/ViewDetailtrip/Daybyday"
import Includeditem from "@/components/Adventureoppurtunities/ViewDetailtrip/Includeditem"
import Locationmeetingpoint from "@/components/Adventureoppurtunities/ViewDetailtrip/Locationmeetingpoint"
import MasonryLayout from "@/components/Adventureoppurtunities/ViewDetailtrip/MasonryLayout"
import ParticipantsCards from "@/components/Adventureoppurtunities/ViewDetailtrip/ParticipantsCards"
import SurfaceCamp from "@/components/Adventureoppurtunities/ViewDetailtrip/SurfaceCamp"
import Tripmood from "@/components/Adventureoppurtunities/ViewDetailtrip/Tripmood"
import VideoSection from "@/components/Adventureoppurtunities/ViewDetailtrip/VideoSection"
import { useParams } from "react-router-dom"
import trip1 from "../../assets/trip1.png"
import trip2 from "../../assets/trip2.png"
import trip3 from "../../assets/trip3.png"

const trips = [
  { id: 1, name: "Wild Weekend Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild weekend", img: trip1 },
  { id: 2, name: "Wild trip Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild trip", img: trip2 },
  { id: 2, name: "Wild Weekend Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild weekend", img: trip3 },
  { id: 2, name: "Wild trip Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild trip", img: trip1 },
  { id: 2, name: "Wild Weekend Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild weekend", img: trip2 },
  { id: 2, name: "Wild trip Barcelona", location: "Barcelona, Spain", Date: "05-08 August", Point: "Plazas disponibles", rating: "4.5 (23)", type: "wild trip", img: trip3 },
];

const ViewDetailTripPage = () => {
  const { id } = useParams()
  const trip = trips.find((t) => t.id === Number(id))
  if (!trip) return <div>Trip not found</div>;

  return (
    <div>
      <MasonryLayout />
      <Locationmeetingpoint />
      <Tripmood />
      {trip.type === "wild weekend" && <SurfaceCamp />}
      {trip.type === "wild trip" && <Daybyday />}
      <Includeditem />
      <VideoSection />
      <Coordinatordetail />
      <ParticipantsCards />
    </div>
  )
}

export default ViewDetailTripPage