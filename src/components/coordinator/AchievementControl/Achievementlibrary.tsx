import { Badge } from "@/components/ui/badge"
import AchievementExplorer from "../../../assets/AchievementExplorer.png"
import ShadowMountain from "../../../assets/ShadowMountain.png"
import Nature from "../../../assets/Naturelover.png"
import Leader from "../../../assets/LeaderLibrary.png"

const Achievementlibrary = () => {
    return (
        <div className="bg-white px-4 py-5 rounded-[25px] mt-2 ">
            <span className="font-semibold bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Achievements Library</span>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
                <div className="border border-[#0DAC87] bg-[#0DAC87]/5 rounded-[20px] py-3 px-3 flex flex-col justify-between h-full">
                    <div className="flex items-center mt-1 gap-2">
                        <img src={ShadowMountain} alt="ShadowMountain" className="w-12" />
                        <div>
                            <p className="text-[#221E33] text-md font-bold mb-0">Mountain Climber</p>
                            <p className="text-[10px] text-[#666373] text-nowrap">Complete 5 hiking or trekking trips</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-[#666373] text-[12px] font-bold">Adventure</span>
                        <Badge className="text-sm rounded-full px-3 py-1 text-[#0DAC87] bg-[#0DAC87]/10 border border-[#0DAC87]">
                            +200pts
                        </Badge>
                    </div>
                </div>
                <div className="border border-[#DDAC24] bg-[#DDAC24]/5 rounded-[20px] py-3 px-3 flex flex-col justify-between h-full">
                    <div className="flex items-center gap-2">
                        <img src={AchievementExplorer} alt="AchievementExplorer" className="w-12 h-14" />
                        <div className="mt-2">
                            <p className="text-[#221E33] text-md font-bold mb-0">Mountain Climber</p>
                            <p className="text-[10px] text-[#666373] text-nowrap">Complete 5 hiking or trekking trips</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-[#666373] text-[12px] font-bold">Adventure</span>
                        <Badge className="text-sm rounded-full px-3 py-1 text-[#DDAC24] bg-[#DDAC24]/10 border border-[#DDAC24]">
                            +200pts
                        </Badge>
                    </div>
                </div>
                <div className="border border-[#A04CD9] bg-[#A04CD9]/5 rounded-[20px] py-3 px-3 flex flex-col justify-between h-full">
                    <div className="flex items-center mt-2 gap-2">
                        <img src={Nature} alt="Nature" className="w-12" />
                        <div className="">
                            <p className="text-[#221E33] text-md font-bold mb-0">Mountain Climber</p>
                            <p className="text-[10px] text-[#666373] text-nowrap">Complete 5 hiking or trekking trips</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-[#666373] text-[12px] font-bold">Adventure</span>
                        <Badge className="text-sm rounded-full px-3 py-1 text-[#A04CD9] bg-[#A04CD9]/10 border border-[#A04CD9]">
                            +200pts
                        </Badge>
                    </div>
                </div>
                <div className="border border-[#DB3638] bg-[#DB3638]/5 rounded-[20px] py-3 px-3 flex flex-col justify-between h-full">
                    <div className="flex items-center mt-2 gap-2">
                        <img src={Leader} alt="Leader" className="w-12" />
                        <div className="">
                            <p className="text-[#221E33] text-md font-bold mb-0">Mountain Climber</p>
                            <p className="text-[10px] text-[#666373] text-nowrap">Complete 5 hiking or trekking trips</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-[#666373] text-[12px] font-bold">Adventure</span>
                        <Badge className="text-sm rounded-full px-3 py-1 text-[#DB3638] bg-[#DB3638]/10 border border-[#DB3638]">
                            +250pts
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievementlibrary