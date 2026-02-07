import ErasmusCard from "@/components/userSide/ErasmusPlus/ErasmusCard/ErasmusCard"
// import ErasmusCards from "@/components/userSide/ErasmusPlus/ErasmusCards/ErasmusCards"
import Erasmusvideo from "@/components/userSide/ErasmusPlus/Erasmusvideo/Erasmusvideo"
import OpenOppurtunities from "@/components/userSide/WildWeekend/OpenOppurtunities/OpenOppurtunities"
import WildWeekendCard from "@/components/userSide/WildWeekend/WildWeekendCard/WildWeekendCard"

const ErasmusPage = () => {
  return (
    <div>
      <WildWeekendCard />
      <div className="flex justify-center">
        <ErasmusCard />
      </div>
      <Erasmusvideo />
      <OpenOppurtunities />
    </div>
  );
}

export default ErasmusPage