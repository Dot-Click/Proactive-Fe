import box2 from "../../../../assets/box2.avif"
import Carousel from "./Carousel"

const OurCollaboration = () => {
    return (
        <div className="bg-[#F0F5FD]">
            <div className="flex flex-col justify-center items-center h-auto min-h-[400px] gap-12 py-16 px-4">
                <div className="relative">
                    <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                  font-bold text-3xl lg:text-4xl relative z-10 text-center uppercase tracking-wider">
                        Our collaborations
                    </h1>
                    <img
                        src={box2}
                        alt="box2"
                        className="w-26 h-26 absolute -top-8 -left-8  opacity-80 lg:flex hidden"
                    />
                </div>
                <p className="text-center text-[12px]">We collaborate with organizations committed to youth development, with the aim of generating <br className="lg:flex hidden"/> a positive impact and offering innovative opportunities to young people.</p>
            <Carousel/>
            </div>
        </div>
    )
}

export default OurCollaboration