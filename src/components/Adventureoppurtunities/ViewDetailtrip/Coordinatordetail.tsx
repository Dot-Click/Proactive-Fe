import zigzag from "../../../assets/zigzag.png"
import zigzagbottom from "../../../assets/zigzagbottom.png"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const Coordinatordetail = () => {
    return (
        <>
            <img src={zigzag} alt="zigzag" className="py-4" />
            <div className="px-4 sm:px-16 py-6">
                <h4 className="text-[#000000] font-bold text-lg">Coordinators</h4>
                <div className="grid lg:grid-cols-2 gap-4 py-4">
                    <div className="border border-[#C1C1C1] bg-[#F9F9F9] rounded-[10px] px-3 py-5">
                        <div className="flex items-center gap-2">
                            <Avatar className="lg:w-16 lg:h-16 mr-2">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <h4 className="text-[#141E20] font-semibold">Alex John</h4>
                                <span className="text-[#332A2A] text-sm">alexjohn@gmail.com</span>
                            </div>
                        </div>
                        <div className="pt-6 flex flex-col gap-3">
                            <h4 className="text-[#332A2A] font-semibold text-sm">About Coordinator</h4>
                            <span className="text-[#332A2A] text-[12px]">For me, every Wild Trip is about creating unforgettable stories. I’ve guided over 30 adventures across Europe and North Africa, and what excites me the most is seeing travelers connect with new cultures and challenge themselves.”</span>
                        </div>
                    </div>
                    <div className="border border-[#C1C1C1] bg-[#F9F9F9] rounded-[10px] px-3 py-5">
                        <div className="flex items-center gap-2">
                            <Avatar className="lg:w-16 lg:h-16 mr-2">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <h4 className="text-[#141E20] font-semibold">Alex John</h4>
                                <span className="text-[#332A2A] text-sm">alexjohn@gmail.com</span>
                            </div>
                        </div>
                        <div className="pt-6 flex flex-col gap-3">
                            <h4 className="text-[#332A2A] font-semibold text-sm">About Coordinator</h4>
                            <span className="text-[#332A2A] text-[12px]">For me, every Wild Trip is about creating unforgettable stories. I’ve guided over 30 adventures across Europe and North Africa, and what excites me the most is seeing travelers connect with new cultures and challenge themselves.”</span>
                        </div>
                    </div>
                </div>
            </div>
            <img src={zigzagbottom} alt="zigzagbottom" className="py-4" />
        </>
    )
}

export default Coordinatordetail