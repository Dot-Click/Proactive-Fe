import locationmeeting1 from "../../../assets/locationmeeting1.png"
import locationmeeting2 from "../../../assets/locationmeeting2.png"
import locationmeeting3 from "../../../assets/locationmeeting3.png"
import locationmeeting4 from "../../../assets/locationmeeting4.png"
const Locationmeetingpoint = ({ trip }: { trip: any }) => {
    const data = trip?.trip[0]
    return (
        <>
            <div className="border-b border-[#C1C1C1]" />
            <div className="px-4 sm:px-16 py-6 bg-[#F4F4F480]">
                <h4 className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Location & Meeting Point</h4>
                <div className="flex lg:flex-row flex-col gap-5 py-4">
                    <div className="bg-[#C4FFF0] border border-[#156250] rounded-[10px] py-4 lg:w-60">
                        <div className="flex items-center gap-3 px-4">
                            <div className="bg-[#221E33] py-3 px-3 rounded-full">
                                <img src={locationmeeting1} alt="locationmeeting1" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#156250]">Group size</span>
                                <span className="text-[#221E33] font-semibold">{data?.groupSize || "20"} People</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#C4FFF0] border border-[#156250] rounded-[10px] py-4 lg:w-60">
                        <div className="flex items-center gap-3 px-4">
                            <div className="bg-[#221E33] py-3 px-3 rounded-full">
                                <img src={locationmeeting2} alt="locationmeeting2" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#156250]">Rithm</span>
                                <span className="text-[#221E33] font-semibold">{data?.rhythm || "No Rithm"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#C4FFF0] border border-[#156250] rounded-[10px] py-4 lg:w-60">
                        <div className="flex items-center gap-3 px-4">
                            <div className="bg-[#221E33] py-3 px-3 rounded-full">
                                <img src={locationmeeting3} alt="locationmeeting3" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#156250]">Sport level</span>
                                <span className="text-[#221E33] font-semibold">{data?.sportLvl || "No Sport level"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#C4FFF0] border border-[#156250] rounded-[10px] py-4 lg:w-60">
                        <div className="flex items-center gap-3 px-4">
                            <div className="bg-[#221E33] py-3 px-3 rounded-full">
                                <img src={locationmeeting4} alt="locationmeeting4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#156250]">N.O Days/ Nights</span>
                                <span className="text-[#221E33] font-semibold">5 Days / 4 Nights</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-[#C1C1C1]" />
        </>
    )
}

export default Locationmeetingpoint