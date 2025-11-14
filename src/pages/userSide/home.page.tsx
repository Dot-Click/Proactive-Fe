import Adventuremoments from "@/components/userSide/Adventuremoments/Adventuremoments"
import AdventureOppurtunities from "@/components/userSide/AdventureOppurtunities/AdventureOppurtunities"
import Follow from "@/components/userSide/Follow/Follow"
import ImpactNumber from "@/components/userSide/ImpactNumber/ImpactNumber"
import Whatwedo from "@/components/userSide/whatwedo/Whatwedo"

const HomePage = () => {
  return (
    <div>
      <AdventureOppurtunities/>
      <Adventuremoments/>
      <Whatwedo/>
      <ImpactNumber/>
      <Follow/>
    </div>
  )
}

export default HomePage