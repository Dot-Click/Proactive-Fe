import Exploretrips from "@/components/userSide/WildWeekend/Explore/Exploretrips"
import JoinExplorers from "@/components/userSide/WildWeekend/JoinExplorers/JoinExplorers"
import WhatIncluded from "@/components/userSide/WildWeekend/WhatIncluded/WhatIncluded"
import ConnectStranger from "@/components/userSide/WildWeekend/ConnectStranger/ConnectStranger"
import WildWeekendCard from "@/components/userSide/WildWeekend/WildWeekendCard/WildWeekendCard"
import WonderPeople from "@/components/userSide/WildWeekend/WonderPeople/WonderPeople"
import OurMerchant from "@/components/userSide/Home/Merchant/OurMerchant"
import OpenOppurtunities from "@/components/userSide/WildWeekend/OpenOppurtunities/OpenOppurtunities"

const WildweekendPage = () => {
  return (
    <div>
      <WildWeekendCard/>
      <WonderPeople/>
      <ConnectStranger/>
      <Exploretrips/>
      <JoinExplorers/>
      <WhatIncluded/>
      <OurMerchant/>
      <OpenOppurtunities/>
    </div>
  )
}

export default WildweekendPage