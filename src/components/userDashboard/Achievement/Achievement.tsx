import AchievementExplorer from "../../../assets/Achievementsexplorer.png"
import ShadowMountain from "../../../assets/ShadowMountain.png"
import Nature from "../../../assets/AchievementNatural.png"
import { Progress } from "@/components/ui/progress"

const Achievement = () => {
    return (
        <div className="border border-[#D9D9D9] bg-[#FAFAFA] rounded-[20px] flex flex-col ">
            <div className="px-4 py-3">
                <span className="font-bold text-[18px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Achievements</span>
                <div className="mt-6 grid lg:grid-cols-1 gap-3">
                    <div className="border border-[#0DAC87] bg-[#0DAC87]/5 rounded-[15px] py-2 px-3 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 -mt-[16px]">
                            <img src={ShadowMountain} alt="ShadowMountain" className="w-16 h-20" />
                            <div className="flex flex-col mt-2">
                                <p className="text-[#221E33] text-md font-medium mb-0">Mountain Climber</p>
                                <p className="text-[10px] text-[#666373] whitespace-nowrap mt-1">80% Completed</p>
                                <Progress value={80} className="h-[6px] w-45 border border-[#0DAC87] [&>div]:bg-[#0DAC87] mt-1 bg-transparent" />
                            </div>
                        </div>
                    </div>
                    <div className="border border-[#DDAC24] bg-[#DDAC24]/5 rounded-[15px] py-4 px-4 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 -mt-[26px]">
                            <img src={AchievementExplorer} alt="AchievementExplorer" className="w-16 h-16" />
                            <div className="flex flex-col mt-5">
                                <p className="text-[#221E33] text-md font-medium mb-0">Culture Explorer</p>
                                <p className="text-[10px] text-[#666373] whitespace-nowrap mt-1">80% Completed</p>
                                <Progress value={80} className="h-[6px] w-45 border border-[#DDAC24] [&>div]:bg-[#DDAC24] mt-1 bg-transparent" />
                            </div>
                        </div>
                    </div>
                    <div className="border border-[#A04CD9] bg-[#A04CD9]/10 rounded-[15px] py-4 px-3 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 -mt-[28px]">
                            <img src={Nature} alt="Nature" className="w-16 h-16" />
                            <div className="flex flex-col mt-6">
                                <p className="text-[#221E33] text-md font-medium mb-0">Nature Lover</p>
                                <p className="text-[10px] text-[#666373] whitespace-nowrap mt-1">80% Completed</p>
                                <Progress value={80} className="h-[6px] w-45 border border-[#A04CD9] [&>div]:bg-[#A04CD9] mt-1 bg-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievement