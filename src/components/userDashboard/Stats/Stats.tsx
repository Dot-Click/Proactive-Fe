import userstats1 from "../../../assets/userstats1.png"
import userstats2 from "../../../assets/userstats2.png"
import userstats3 from "../../../assets/userstats3.png"

const Stats = () => {
    return (
        <div className="border border-[#D9D9D9] bg-[#FAFAFA] rounded-[16px] w-full lg:w-[66vw] mt-6 ">
            <div className="px-4 py-8">
                <span className="font-bold">Key States</span>
                <div className="mt-4 grid lg:grid-cols-3 gap-4">
                    <div className="flex gap-4 border border-[#0DAC87] bg-[#F0FFFC] rounded-[20px] px-8 py-4">
                        <div className="bg-[#0DAC87] rounded-full w-20 h-20 flex items-center justify-center mt-4 mb-2">
                            <img src={userstats1} alt="userstats1" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-medium text-[12px]">Trips Attended</span>
                            <span className="font-bold text-2xl">80</span>
                            <span className="text-[#332A2A] text-[10px]">Across 6 countries</span>
                        </div>
                    </div>
                    <div className="flex gap-4 border border-[#0D57AC] bg-[#F0FAFF] rounded-[20px] px-8 py-4">
                        <div className="bg-[#0D57AC] rounded-full w-20 h-20 flex items-center justify-center mt-4 mb-2">
                            <img src={userstats2} alt="userstats2" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-medium text-[12px]">Achievements</span>
                            <span className="font-bold text-2xl">05</span>
                            <span className="text-[#332A2A] text-[10px]">badges earned</span>
                        </div>
                    </div>
                    <div className="flex gap-4 border border-[#C29605] bg-[#FFFEF0] rounded-[20px] px-8 py-4">
                        <div className="bg-[#C29605] rounded-full w-20 h-20 flex items-center justify-center mt-4 mb-2">
                            <img src={userstats3} alt="userstats3" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-medium text-[12px] text-nowrap">Adventure Points</span>
                            <span className="font-bold text-2xl">1250</span>
                            <span className="text-[#332A2A] text-[10px]">250 to next level</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats