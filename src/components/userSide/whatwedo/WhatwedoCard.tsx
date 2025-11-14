import Whatwedo1 from "../../../assets/whatwedo1.png"
import Whatwedo2 from "../../../assets/whatwedo2.png"
import Whatwedo3 from "../../../assets/whatwedo3.png"
import Whatwedo4 from "../../../assets/whatwedo4.png"
import Whatwedo5 from "../../../assets/whatwedo5.png"
import Whatwedo6 from "../../../assets/whatwedo6.png"
const WhatwedoCard = () => {
    return (
        <div className="flex lg:flex-row flex-col gap-6">
            <div className="relative">
                <img src={Whatwedo2} alt="Whatwedo2" className="h-70 w-50" />
                <div className="absolute inset-0 top-2 left-2 right-2">
                    <img src={Whatwedo3} alt="Whatwedo3" className="" />
                </div>
                <div className="flex flex-col gap-3 absolute inset-0 top-35 left-2 right-2">
                    <h4 className="font-bold">Wild Weekends</h4>
                    <p className="text-[12px] text-[#221E33] font-semibold">Short adventures full of energy and excitement for quick getaways.</p>
                </div>
            </div>
            <div className="border border-[#58DD00] bg-[#FAFAFA] px-2 py-2 rounded-[20px] h-66">
                <div className="flex flex-col justify-between gap-6 items-start">
                <img src={Whatwedo5} alt="Whatwedo5" className="w-50 h-27" />
                <div className="flex flex-col gap-3">
                    <h4 className="font-bold">Wild Trips</h4>
                    <p className="text-[12px] text-[#221E33] font-semibold">Longer trips with cultural <br /> immersion and deep adventure <br /> experiences.</p>
                </div>
                </div>
            </div>
            <div className="border border-[#58DD00] bg-[#FAFAFA] px-2 py-2 rounded-[20px] h-66">
                <div className="flex flex-col justify-between gap-6 items-start">
                <img src={Whatwedo4} alt="Whatwedo4" className="w-50 h-27" />
                <div className="flex flex-col gap-3">
                    <h4 className="font-bold">Erasmus+</h4>
                    <p className="text-[12px] text-[#221E33] font-semibold">International youth programs <br /> fostering cultural exchange <br /> and learning.</p>
                </div>
                </div>
            </div>
            <div className="relative">
                <img src={Whatwedo1} alt="Whatwedo1" className="h-70 w-50" />
                <div className="absolute inset-0 top-2 left-2 right-2">
                    <img src={Whatwedo6} alt="Whatwedo6" className="" />
                </div>
                <div className="flex flex-col gap-3 absolute inset-0 top-32 left-2 right-2">
                    <h4 className="font-bold">Coordinator <br /> Courses & Events</h4>
                    <p className="text-[12px] text-[#221E33] font-semibold">Professional training and internal events for skill development.</p>
                </div>
            </div>
        </div>
    )
}

export default WhatwedoCard