import WonderPeoplebg from "../../../../assets/WonderPeoplebg.png"
import SomeMemoriesCard from "./SomeMemoriesCard"
const SomeMemories = () => {
    return (
        <div className="relative">
            <img src={WonderPeoplebg} alt="WonderPeoplebg" className="lg:h-350 h-800 w-full" />
            <div className="bg-black absolute inset-0 opacity-80 lg:h-350 h-800" ></div>
            <div className="absolute inset-0">
                <h1 className="text-white font-bold lg:text-3xl lg:py-20 py-10 text-center">Some Memories</h1>
                <div className="flex items-center justify-center">
                    <SomeMemoriesCard />
                </div>
            </div>
        </div>
    )
}

export default SomeMemories