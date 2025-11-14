import importantMask from "../../../assets/importantmask.png"
import importantbg from "../../../assets/importantbg.png"
import importantlayer from "../../../assets/importantlayer.png"
import ImpactCard from "./ImpactCard";
const ImpactNumber = () => {
    return (
        <div className="relative mb-5">
            <img
                src={importantMask}
                alt="importantMask"
                className="lg:h-120 lg:w-full h-100" 
            />
            <div className="absolute inset-0 lg:top-0">
                <img src={importantbg} alt="importantbg" className="opacity-80 lg:h-120 lg:w-full h-100" />
            </div>
            <div className="absolute inset-0 lg:top-0 top-8">
                <img src={importantlayer} alt="importantlayer" className="opacity-80" />
            </div>
            <div className="flex flex-col lg:gap-6 absolute inset-0 lg:top-8 top-2 lg:py-8">
                <h1 className="text-center lg:text-5xl bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE]/96  text-transparent bg-clip-text font-extrabold">Our Impact in Numbers</h1>
                <p className="text-[8px] lg:text-lg font-semibold text-[#FFFFFF] text-center">Choose your path to adventure. Whether you're looking for a quick escape or an extended journey, <br className="lg:block hidden"/>
                    we have the perfect experience waiting for you.</p>
            </div>
            <div className="flex flex-col gap-6 absolute inset-0 justify-center items-center lg:top-20 top-10">
                <ImpactCard/>
            </div>
        </div>
    );
};

export default ImpactNumber