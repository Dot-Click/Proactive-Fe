import { Button } from "@/components/ui/button"
import openoppurtunitiesbg from "../../../assets/openoppurtunitiesbg.png"
import { useNavigate } from "react-router-dom"
const JoinOurStory = () => {
const navigate = useNavigate()
    return (
        <div className="relative w-full">
            <img
                src={openoppurtunitiesbg}
                alt="openoppurtunitiesbg"
                className="w-full h-[400px] sm:h-[500px] md:h-[300px] object-cover"
            />

            <div className="flex flex-col justify-center gap-2 absolute inset-0 px-4">
                <h1 className="text-center bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE] lg:text-4xl md:text-3xl sm:text-2xl text-transparent bg-clip-text font-bold">
                    Join Our Story
                </h1>
                <p className="text-center text-[#FFFFFF] text-sm md:text-base lg:text-lg">
                    Be part of a community that's redefining youth travel across Europe. Your adventure <br /> starts with a single step.
                </p>
                <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-6">
                    <Button className="hover:scale-105 transition-all duration-300 bg-[#FFFFFF] hover:bg-[#f7f1f1] cursor-pointer text-[#03664F] font-semibold rounded-full px-6 py-5">
                        Start Your Journey
                    </Button>
                    <Button onClick={() => navigate('/contact')} variant={'ghost'} className="hover:scale-105 transition-all duration-300 hover:bg-[#f7f1f1] text-[#FFFFFF] cursor-pointer border border-[#FFFFFF] rounded-full px-6 py-5">
                        Contact Us
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default JoinOurStory