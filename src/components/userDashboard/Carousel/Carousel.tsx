import { useLocation } from "react-router-dom";
import CarouselImg from "../../../assets/carouselimg.png"
import layer from "../../../assets/carouselLayer.png"
import { Button } from "@/components/ui/button";

interface CarouselProps {
  UserName: string;
  subHeading: string;
}

const Carousel = ({UserName, subHeading}: CarouselProps) => {
const location = useLocation();
const Heading = location.pathname.split("/")[2]?.split("-").join(" ");
console.log(Heading);

    return (
        <div className="relative w-full h-70 md:min-w-[40px] rounded-[25px] overflow-hidden lg:mt-4 mt-4 mb-4">

            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${CarouselImg})` }}
            ></div>

            <div className="absolute inset-0 bg-[#0DAC87]/100 mix-blend-multiply rounded-[25px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,rgba(13,172,135,0.15)_0%,rgba(5,70,55,0.35)_40%,rgba(0,0,0,0.6)_100%)]"></div>

            <div className="flex justify-between absolute inset-0 px-8 py-12">
                <div className="flex flex-col gap-3 items-start">
                <span className="text-[#FFFFFF] font-bold text-xl">Good Morning, {UserName}!</span>
                <span className="text-[#F7ECBE] font-semibold text-5xl uppercase">{Heading ? Heading : 'Dashboard'}</span>
                <span className="text-[#E5DFFF]">{subHeading}</span>
                    <Button className="rounded-full px-6 py-7 bg-[#0DAC87] hover:bg-[#0f9b7a] cursor-pointer mt-2">Browse Adventures</Button>
                </div>
                <img src={layer} alt="layer" className="h-60"/>
            </div>
        </div>
    )
}

export default Carousel