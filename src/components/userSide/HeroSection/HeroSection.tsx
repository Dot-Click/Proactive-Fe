import { Button } from "@/components/ui/button"
import carousel from "../../../assets/carousel.png"
import Download from "../../../assets/Download.png"

const HeroSection = () => {
    return (
        <>
            <div className="relative ">
                <img
                    src={carousel}
                    alt="carousel"
                    className="lg:w-full lg:h-full h-100 object-cover object-center"
                />
            </div>
            <div className="absolute inset-0 left-1/2 transform -translate-x-1/2 -translate-y-1/5 top-1/2 flex flex-col items-center  gap-8">
                <div className="lg:flex hidden">
                    <span className="text-white font-bold text-4xl text-nowrap mt-12">Your Next</span>
                    <div className="flex">
                        <span className="lg:text-8xl font-extrabold text-stroke-1 text-transparent bg-clip-text bg-gradient-to-b from-[#F7ECBE] to-[#F7ECBE]">
                            ADV
                        </span>
                        <span className="lg:text-8xl font-extrabold text-stroke -translate-y-8">
                            E
                        </span>
                        <span className="lg:text-8xl font-extrabold text-stroke -translate-y-2">
                            N
                        </span>
                        <span className="lg:text-8xl font-extrabold text-stroke-1 text-transparent bg-clip-text bg-gradient-to-b from-[#F7ECBE] to-[#F7ECBE]">
                            TURE
                        </span>
                    </div>
                    <span className="text-white font-bold text-4xl text-nowrap mt-12">Awaits</span>
                </div>
                <div className="text-center text-white text-[15px]">
                    <span>Discover extraordinary experiences, <br />
                        connect with fellow adventurers, and create memories that last a lifetime with Proactive Future.</span>
                </div>
                <div className="lg:flex hidden gap-4">
                    <Button className="bg-[#0DAC87] hover:bg-[#0f9e7d] cursor-pointer rounded-full px-7 py-7 font-medium">Join the Adventure</Button>
                    <Button className="bg-[#FFFFFF] hover:bg-[#e7d9d9] cursor-pointer rounded-full px-7 py-7 text-[#000000] font-medium">Get to Know Us</Button>
                </div>
            </div>
            <div className="lg:flex hidden absolute top-176 left-298">
                <img src={Download} alt="Download" className="h-15" />
            </div>
        </>
    )
}

export default HeroSection