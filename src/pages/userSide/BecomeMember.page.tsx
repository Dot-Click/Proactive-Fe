import FAQ from "@/components/userSide/BecomeMember/FAQ"
import JoinProactive from "@/components/userSide/BecomeMember/JoinProactive"
import MemberToday from "@/components/userSide/BecomeMember/MemberToday"
import TravellingWithUs from "@/components/userSide/BecomeMember/TravellingWithUs"

const BecomeMemberPage = () => {
  return (
    <div>
        <JoinProactive/>
        <TravellingWithUs/>
        <FAQ/>
        <MemberToday/>
    </div>
  )
}

export default BecomeMemberPage