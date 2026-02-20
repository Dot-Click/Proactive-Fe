import locationmeeting1 from "../../../assets/locationmeeting1.png"
import locationmeeting2 from "../../../assets/locationmeeting2.png"
import locationmeeting3 from "../../../assets/locationmeeting3.png"
import locationmeeting4 from "../../../assets/locationmeeting4.png"

const Locationmeetingpoint = ({ trip }: { trip: any }) => {
    // Extract trip data - handle both direct trip object and nested structure
    const data = trip?.trip?.[0] || trip?.trip || trip;

    return (
        <div className="py-12 border-b border-[#ECECF1]">
            <h3 className="text-[#221E33] font-bold text-2xl mb-8 font-quicksand">Trip Essentials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Group Size */}
                <div className="bg-[#C4FFF0] border border-[#156250] rounded-2xl py-5 px-6 flex items-center gap-4 group hover:shadow-md transition-all">
                    <div className="bg-[#221E33] p-3 rounded-full shrink-0">
                        <img src={locationmeeting1} alt="Group Size" className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#156250] text-sm font-medium font-quicksand">Group size</span>
                        <span className="text-[#221E33] font-bold text-base font-quicksand leading-tight">
                            {data?.groupSize || "20"} People
                        </span>
                    </div>
                </div>

                {/* Rhythm */}
                <div className="bg-[#C4FFF0] border border-[#156250] rounded-2xl py-5 px-6 flex items-center gap-4 group hover:shadow-md transition-all">
                    <div className="bg-[#221E33] p-3 rounded-full shrink-0">
                        <img src={locationmeeting2} alt="Rhythm" className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#156250] text-sm font-medium font-quicksand">Rhythm</span>
                        <span className="text-[#221E33] font-bold text-base font-quicksand leading-tight">
                            {data?.rhythm || "Dynamic"}
                        </span>
                    </div>
                </div>

                {/* Sport Level */}
                <div className="bg-[#C4FFF0] border border-[#156250] rounded-2xl py-5 px-6 flex items-center gap-4 group hover:shadow-md transition-all">
                    <div className="bg-[#221E33] p-3 rounded-full shrink-0">
                        <img src={locationmeeting3} alt="Sport level" className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#156250] text-sm font-medium font-quicksand">Sport level</span>
                        <span className="text-[#221E33] font-bold text-base font-quicksand leading-tight">
                            {data?.sportLvl || "Intermediate"}
                        </span>
                    </div>
                </div>

                {/* Duration */}
                <div className="bg-[#C4FFF0] border border-[#156250] rounded-2xl py-5 px-6 flex items-center gap-4 group hover:shadow-md transition-all">
                    <div className="bg-[#221E33] p-3 rounded-full shrink-0">
                        <img src={locationmeeting4} alt="Duration" className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#156250] text-sm font-medium font-quicksand">Duration</span>
                        <span className="text-[#221E33] font-bold text-base font-quicksand leading-tight">
                            {data?.duration || "5 Days / 4 Nights"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Locationmeetingpoint;