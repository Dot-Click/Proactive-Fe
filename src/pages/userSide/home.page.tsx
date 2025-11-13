import Adventuremoments from "@/components/userSide/Adventuremoments/Adventuremoments"
import AdventureOppurtunities from "@/components/userSide/AdventureOppurtunities/AdventureOppurtunities"
import ImpactNumber from "@/components/userSide/ImpactNumber/ImpactNumber"
import Whatwedo from "@/components/userSide/whatwedo/Whatwedo"

const HomePage = () => {
  return (
    <div>
      <AdventureOppurtunities/>
      <Adventuremoments/>
      <Whatwedo/>
      <ImpactNumber/>
    </div>
  )
}

export default HomePage