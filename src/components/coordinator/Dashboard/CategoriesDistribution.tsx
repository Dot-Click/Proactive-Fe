import { Progress } from "@/components/ui/progress"

const CategoriesDistribution = () => {
    return (
        <div className="px-6 py-4 bg-white rounded-[25px] shadow-md mt-1">
            <h1 className="text-[#221E33] mb-4">Trip Categories Distribution</h1>
            <div className="mt-4 flex flex-col md:justify-between gap-5 flex-nowrap mb-1">
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center justify-between w-full">
                    <div className="flex gap-4 items-center">
                        <div className="w-4 h-4 border border-[#814500] rounded-full bg-[#814500]/10" />
                        <p className="text-[#666373] font-semibold text-[14px]">Other</p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Progress value={20} className="bg-red-600 lg:w-[500px] w-[300px]" />
                        <span>48</span>
                        <span>39%</span>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center justify-between w-full">
                    <div className="flex gap-4 items-center">
                        <div className="w-4 h-4 border border-[#814500] rounded-full bg-[#814500]/10" />
                        <p className="text-[#666373] font-semibold text-[14px]">Other</p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Progress value={20} className="bg-red-600 lg:w-[500px] w-[300px]" />
                        <span>48</span>
                        <span>39%</span>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center justify-between w-full">
                    <div className="flex gap-4 items-center">
                        <div className="w-4 h-4 border border-[#814500] rounded-full bg-[#814500]/10" />
                        <p className="text-[#666373] font-semibold text-[14px]">Other</p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Progress value={20} className="bg-red-600 lg:w-[500px] w-[300px]" />
                        <span>48</span>
                        <span>39%</span>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center justify-between w-full">
                    <div className="flex gap-4 items-center">
                        <div className="w-4 h-4 border border-[#814500] rounded-full bg-[#814500]/10" />
                        <p className="text-[#666373] font-semibold text-[14px]">Other</p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Progress value={20} className="bg-red-600 lg:w-[500px] w-[300px]" />
                        <span>48</span>
                        <span>39%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoriesDistribution