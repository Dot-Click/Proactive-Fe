import Adventuremoments from "@/components/userSide/Home/Adventuremoments/Adventuremoments"
import AdventureOppurtunities from "@/components/userSide/Home/AdventureOppurtunities/AdventureOppurtunities"
import Follow from "@/components/userSide/Home/Follow/Follow"
import ImpactNumber from "@/components/userSide/Home/ImpactNumber/ImpactNumber"
import OurMerchant from "@/components/userSide/Home/Merchant/OurMerchant"
import Whatwedo from "@/components/userSide/Home/whatwedo/Whatwedo"

const HomePage = () => {
  return (
    <div>
      <AdventureOppurtunities/>
      <Adventuremoments/>
      <Whatwedo/>
      <ImpactNumber/>
      <Follow/>
      <OurMerchant/>
    </div>
  )
}

export default HomePage