import OurMerchant from "@/components/userSide/Home/Merchant/OurMerchant"
import Ourtrips from "@/components/userSide/WildTrip/ourtrips/Ourtrips"
import WildTripendCard from "@/components/userSide/WildTrip/WildTripCard/WildTripendCard"
import WTConnectStranger from "@/components/userSide/WildTrip/WildtripStranger/WTConnectStranger"
import OpenOppurtunities from "@/components/userSide/WildWeekend/OpenOppurtunities/OpenOppurtunities"

const WildtripPage = () => {
  return (
    <div>
      <WildTripendCard />
      <Ourtrips />
      <WTConnectStranger />
      <OurMerchant />
      <OpenOppurtunities />
    </div>
  )
}

export default WildtripPage