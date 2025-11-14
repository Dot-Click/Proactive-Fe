import AdventureMoment from "../../../assets/Adventuremoment.png"
import Adventuremomentscards from "./Adventuremomentscards"
const Adventuremoments = () => {
    return (
        <div className="relative py-10">
            <img src={AdventureMoment} alt="AdventureMoment"/>
            <div className="flex flex-col gap-8 absolute inset-0 top-40">
                <h1 className="font-bold text-4xl text-center bg-linear-to-r from-[#FFFFFF] to-[#E3E3E3] text-transparent bg-clip-text">Adventure Moments</h1>
                <p className="tracking-wider text-center text-sm text-[#FFFFFF]">Choose your path to adventure. Whether you're looking for a quick escape or an extended journey, <br />
                    we have the perfect experience waiting for you.</p>
            </div>
            <div className="absolute inset-0 top-80 flex justify-center">
                <Adventuremomentscards />
            </div>
        </div>
    )
}

export default Adventuremoments