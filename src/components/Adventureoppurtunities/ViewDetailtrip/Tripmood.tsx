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
                    <img src={tripmood1} alt="tripmood1" className="w-10 h-8"/>
                    <h4 className="text-[#221E33] font-medium">Trip Mood</h4>
                    <span className="text-[#332A2A] text-sm">This itinerary offers a full 360° experience: a classic yet exciting way to explore the destination from every angle. The pace will be fast to make the most of the trip, but we’ll also enjoy moments of relaxation and fun — the perfect combination!</span>
                </div>
                <div className="flex flex-col gap-4 bg-[#F9F9F9] border border-[#C1C1C1] px-6 py-6 rounded-[20px]">
                    <img src={tripmood2} alt="tripmood2" className="w-8 h-8"/>
                    <h4 className="text-[#221E33] font-medium">Trip Mood</h4>
                    <span className="text-[#332A2A] text-sm">This itinerary offers a full 360° experience: a classic yet exciting way to explore the destination from every angle. The pace will be fast to make the most of the trip, but we’ll also enjoy moments of relaxation and fun — the perfect combination!</span>
                </div>
                <div className="flex flex-col gap-4 bg-[#F9F9F9] border border-[#C1C1C1] px-6 py-6 rounded-[20px]">
                    <img src={tripmood3} alt="tripmood3" className="w-8 h-8"/>
                    <h4 className="text-[#221E33] font-medium">Trip Mood</h4>
                    <span className="text-[#332A2A] text-sm">This itinerary offers a full 360° experience: a classic yet exciting way to explore the destination from every angle. The pace will be fast to make the most of the trip, but we’ll also enjoy moments of relaxation and fun — the perfect combination!</span>
                </div>
                <div className="flex flex-col gap-4 bg-[#F9F9F9] border border-[#C1C1C1] px-6 py-6 rounded-[20px]">
                    <img src={tripmood4} alt="tripmood4" className="w-4 h-8"/>
                    <h4 className="text-[#221E33] font-medium">Trip Mood</h4>
                    <span className="text-[#332A2A] text-sm">This itinerary offers a full 360° experience: a classic yet exciting way to explore the destination from every angle. The pace will be fast to make the most of the trip, but we’ll also enjoy moments of relaxation and fun — the perfect combination!</span>
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