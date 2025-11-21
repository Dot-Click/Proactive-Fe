import { Button } from "@/components/ui/button"
import leadadventurebg from "../../../assets/LeadAdventure.png"
import leadadventurebgcolor from "../../../assets/leadadventurebg.png"

const LeadAdventure = () => {
    return (
        <div className="relative w-full">
            <img
                src={leadadventurebg}
                alt="leadadventurebg"
                className="relative w-full object-cover"
            />
            <img src={leadadventurebgcolor} alt="leadadventurebgcolor" className="absolute inset-0 opacity-50"/>
            <div className="flex flex-col justify-center gap-2 absolute inset-0 px-4">
                <h1 className="text-center bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE] lg:text-4xl md:text-3xl sm:text-2xl text-transparent bg-clip-text font-bold">
                    Become a Member Today
                </h1>
                <p className="text-center text-[#FFFFFF] text-sm md:text-base lg:text-lg">
                    Get exclusive access to all Wild Weekends, Wild Trips, and events. Membership is valid for <br /> 365 days from the day of payment</p>
                <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-6">
                    <Button className="font-bold hover:scale-105 transition-all duration-300 bg-[#FFFFFF] hover:bg-[#f7f1f1] cursor-pointer text-[#03664F] rounded-full px-6 py-5">
                        Pay €50 & Join Now
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LeadAdventure