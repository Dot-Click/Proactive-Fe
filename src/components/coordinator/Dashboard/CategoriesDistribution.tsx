import { Progress } from "@/components/ui/progress"
import { UsegetcoordinatordashboardStats } from "@/hooks/getcoordinatordashboardStats";
import { LoaderIcon } from "lucide-react";

const CategoriesDistribution = () => {
    const { data, isLoading, isError } = UsegetcoordinatordashboardStats();
    const tripCategories = data?.tripCategories;
    return (
        <div className="px-6 py-4 bg-white rounded-[25px] shadow-md mt-1">
            <h1 className="text-[#221E33] mb-4 font-semibold">Trip Categories Distribution</h1>
            <div className="mt-4 flex flex-col md:justify-between gap-2 flex-nowrap mb-1">
                {
                    isLoading && <div className="w-full flex items-center justify-center py-10">
                        <LoaderIcon className="animate-spin" />
                    </div>

                }
                {
                    isError && <p className="text-red-500">Error loading data.</p>
                }
                {
                    tripCategories?.map((category: any, index: number) => (
                        <div key={index} className="flex flex-col lg:flex-row lg:gap-4 lg:items-center justify-between w-full">
                            <div className="flex gap-4 items-center">
                                <div className="w-4 h-4 border border-[#0C038B] rounded-full bg-[#0C038B]/10" />
                                <p className="text-[#666373] font-semibold text-[14px]">{category.name}</p>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <Progress value={category.percentage} className="[&>*]:bg-[#5E57CF] lg:w-[500px] w-[300px]" />
                                <span>{category.count}</span>
                                <span>{category.percentage}%</span>
                            </div>
                        </div>
                    ))
                }
                {/* <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center justify-between w-full">
                    <div className="flex gap-4 items-center">
                        <div className="w-4 h-4 border border-[#038B6B] rounded-full bg-[#038B6B]/10" />
                        <p className="text-[#666373] font-semibold text-[14px]">World Tour (WT)</p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Progress value={90} className="[&>*]:bg-[#038B6B] lg:w-[500px] w-[300px]" />
                        <span>48</span>
                        <span>39%</span>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center justify-between w-full">
                    <div className="flex gap-4 items-center">
                        <div className="w-4 h-4 border border-[#2858F6] rounded-full bg-[#2858F6]/10" />
                        <p className="text-[#666373] font-semibold text-[14px]">Workshops (WS)</p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Progress value={40} className="[&>*]:bg-[#2858F6] lg:w-[500px] w-[300px]" />
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
                        <Progress value={60} className="[&>*]:bg-[#8F5A1D] lg:w-[500px] w-[300px]" />
                        <span>48</span>
                        <span>39%</span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default CategoriesDistribution


