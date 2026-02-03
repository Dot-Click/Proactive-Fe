import zigzagbottom from "../../../assets/zigzagbottom.png"
import tripmood1 from "../../../assets/tripmood1.png"
import tripmood2 from "../../../assets/tripmood2.png"
import tripmood3 from "../../../assets/tripmood3.png"
import tripmood4 from "../../../assets/tripmood4.png"

const Tripmood = () => {
    return (
        <>
            <div className="px-4 sm:px-16 py-6">
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4 bg-[#F9F9F9] border border-[#C1C1C1] px-6 py-6 rounded-[20px]">
                        <img src={tripmood1} alt="tripmood1" className="w-10 h-8" />
                        <h4 className="text-[#221E33] font-medium">Trip Mood</h4>
                        <span className="text-[#332A2A] text-sm">
                            This trip is designed to give you a complete 360° experience of the destination. Expect a dynamic pace that lets us explore as much as possible, balanced with moments to relax, connect with the group, and simply enjoy the journey.
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 bg-[#F9F9F9] border border-[#C1C1C1] px-6 py-6 rounded-[20px]">
                        <img src={tripmood2} alt="tripmood2" className="w-8 h-8" />
                        <h4 className="text-[#221E33] font-medium">Physical effort</h4>
                        <span className="text-[#332A2A] text-sm">
                            A moderate level of physical effort is required. Some days include walking, outdoor activities, or early starts, but everything is planned to be accessible and enjoyable for anyone with an active lifestyle.
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 bg-[#F9F9F9] border border-[#C1C1C1] px-6 py-6 rounded-[20px]">
                        <img src={tripmood3} alt="tripmood3" className="w-8 h-8" />
                        <h4 className="text-[#221E33] font-medium">Meeting & farewell</h4>
                        <span className="text-[#332A2A] text-sm">
                            We start the trip by meeting the group and the coordinator at a defined meeting point. At the end of the experience, we say goodbye knowing we’ve shared unforgettable moments and created meaningful connections.
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 bg-[#F9F9F9] border border-[#C1C1C1] px-6 py-6 rounded-[20px]">
                        <img src={tripmood4} alt="tripmood4" className="w-4 h-8" />
                        <h4 className="text-[#221E33] font-medium">High motivation</h4>
                        <span className="text-[#332A2A] text-sm">
                            This trip is perfect for curious, open-minded travelers who want to explore, learn, and fully immerse themselves in new cultures. Come with energy, a positive attitude, and the desire to make the most of every day.
                        </span>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <img src={zigzagbottom} alt="zigzagbottom" />
            </div>
        </>
    )
}

export default Tripmood