import Play from "../../../assets/play2.png"
import momentscard1 from "../../../assets/momentscard1.png"
import momentscard2 from "../../../assets/momentscard2.png"
import momentscard3 from "../../../assets/momentscard3.png"

const FollowCard = () => {
    return (
        <div className="grid lg:grid-cols-3 gap-2 mb-8">
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard1}
                    alt="momentscard1"
                    className="h-full w-90"
                />

                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
                <div className="flex flex-col justify-end px-8 py-16 lg:gap-8 absolute inset-0">
                    <h4 className="text-[#FFFFFF] font-bold  text-lg">Travel forest with guider</h4>
                    <div className="flex items-center gap-3">
                        {/* <img src={location} alt="location" className="h-5" /> */}
                        <p className="text-[#FFFFFF]">Mexico</p>
                    </div>
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard2}
                    alt="momentscard2"
                    className="h-full w-90"
                />

                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
                <div className="flex flex-col justify-end px-8 py-15 lg:gap-4 absolute inset-0">
                    <h4 className="text-[#FFFFFF] font-bold text-lg">Vibrant orange and pink <br /> canyon landscape</h4>
                    <div className="flex items-center gap-3">
                        {/* <img src={location} alt="location" className="h-5" /> */}
                        <p className="text-[#FFFFFF]">Red Valley, Peru</p>
                    </div>
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard3}
                    alt="momentscard3"
                    className="h-full w-90"
                />

                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
                <div className="flex flex-col justify-end px-8 py-15 lg:gap-4 absolute inset-0">
                    <h4 className="text-[#FFFFFF] font-bold  text-lg">Underwater adventure scuba <br /> diver</h4>
                    <div className="flex items-center gap-3">
                        {/* <img src={location} alt="location" className="h-5" /> */}
                        <p className="text-[#FFFFFF]">Gili Island, Indonsia</p>
                    </div>
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard1}
                    alt="momentscard1"
                    className="h-full w-90"
                />

                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
                <div className="flex flex-col justify-end px-8 py-16 lg:gap-8 absolute inset-0">
                    <h4 className="text-[#FFFFFF] font-bold  text-lg">Travel forest with guider</h4>
                    <div className="flex items-center gap-3">
                        {/* <img src={location} alt="location" className="h-5" /> */}
                        <p className="text-[#FFFFFF]">Mexico</p>
                    </div>
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard2}
                    alt="momentscard2"
                    className="h-full w-90"
                />

                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
                <div className="flex flex-col justify-end px-8 py-15 lg:gap-4 absolute inset-0">
                    <h4 className="text-[#FFFFFF] font-bold text-lg">Vibrant orange and pink <br /> canyon landscape</h4>
                    <div className="flex items-center gap-3">
                        {/* <img src={location} alt="location" className="h-5" /> */}
                        <p className="text-[#FFFFFF]">Red Valley, Peru</p>
                    </div>
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard3}
                    alt="momentscard3"
                    className="h-full w-90"
                />

                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
                <div className="flex flex-col justify-end px-8 py-15 lg:gap-4 absolute inset-0">
                    <h4 className="text-[#FFFFFF] font-bold  text-lg">Underwater adventure scuba <br /> diver</h4>
                    <div className="flex items-center gap-3">
                        {/* <img src={location} alt="location" className="h-5" /> */}
                        <p className="text-[#FFFFFF]">Gili Island, Indonsia</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowCard