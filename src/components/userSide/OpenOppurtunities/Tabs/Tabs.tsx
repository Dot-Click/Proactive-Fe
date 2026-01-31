import { useState } from "react"

type TabId = "all" | "open" | "coming-soon" | "closed"

const tabConfig: { id: TabId; label: string; count: number }[] = [
    { id: "all", label: "All", count: 3 },
    { id: "open", label: "Open", count: 2 },
    { id: "coming-soon", label: "Coming Soon", count: 1 },
    { id: "closed", label: "Closed", count: 0 },
]

const Tabs = () => {
    const [activeTab, setActiveTab] = useState<TabId>("all")

    return (
        <>
            <div className="px-4 sm:px-16 py-6">
                <div className="bg-[#FFFFFF] border border-[#D9D9D9] shadow-md rounded-full px-6 py-2 w-fit">
                    <div className="flex flex-wrap lg:gap-8 gap-2 items-center justify-center" role="tablist">
                        {tabConfig.map((tab) => {
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[#0DAC87] focus-visible:ring-offset-2 ${
                                        isActive
                                            ? "bg-[#000000] text-[#FFFFFF]"
                                            : "bg-[#F3F3F3] text-[#666373] hover:bg-[#E8E8E8]"
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    <div
                                        className={`rounded-[3px] px-[4px] h-5 font-semibold flex items-center justify-center ${
                                            isActive
                                                ? "bg-[#FFFFFF] text-[#000000]"
                                                : "bg-[#666373] text-[#FFFFFF]"
                                        }`}
                                    >
                                        {tab.count}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="border-b border-[#D9D9D9] -mt-[4px]" />
        </>
    )
}

export default Tabs