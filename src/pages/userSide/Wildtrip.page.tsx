import OurMerchant from "@/components/userSide/Home/Merchant/OurMerchant"
import Ourtrips from "@/components/userSide/WildTrip/ourtrips/Ourtrips"
// import WildTripCard from "@/components/userSide/WildTrip/WildTripCard/WildTripendCard"
import WTConnectStranger from "@/components/userSide/WildTrip/WildtripStranger/WTConnectStranger"
import OpenOppurtunities from "@/components/userSide/WildWeekend/OpenOppurtunities/OpenOppurtunities"
import WildWeekendCard from "@/components/userSide/WildWeekend/WildWeekendCard/WildWeekendCard"

const WildtripPage = () => {
  return (
    <div>
      <WildWeekendCard />
      <Ourtrips />
      <WTConnectStranger />
      <OurMerchant />
      <OpenOppurtunities />
      
    </div>
  );
}

export default WildtripPage