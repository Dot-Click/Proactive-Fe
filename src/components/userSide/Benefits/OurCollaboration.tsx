import box2 from "../../../assets/box2.png"
import advantsges from "../../../assets/advatages.png"
import OurCollabrationCard from "./OurCollabrationCard"

const OurCollaboration = () => {
    return (
        <>
        <div className="flex justify-center items-start pt-10 mr-100">
        <img src={advantsges} alt="advantsges" className="h-25 lg:flex hidden"/>
        </div>
        <div className="md:py-80 py-50">
            <div className="flex flex-col justify-center items-center h-100 lg:gap-20 gap-12 px-2">
                <div className="relative">
                    <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                  font-bold lg:text-4xl relative z-10">
                        Our Collaborations
                    </h1>
                    <img
                        src={box2}
                        alt="box2"
                        className="w-24 h-26 absolute -top-8 left-20  opacity-80 lg:flex hidden"
                    />
                </div>
                <OurCollabrationCard/>
            </div>
        </div>
        </>
    )
}

export default OurCollaboration