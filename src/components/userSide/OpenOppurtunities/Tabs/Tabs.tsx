import { UsegetTrips } from "@/hooks/gettriphook"
import { useTranslation } from "react-i18next"

export type TabId = "all" | "open" | "coming-soon" | "closed"

interface TabsProps {
    activeTab: TabId
    onTabChange: (tab: TabId) => void
}

const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
    const { t } = useTranslation();
    const { data } = UsegetTrips()
    const rawCounts = data?.counts ?? { all: 0, open: 0, comingSoon: 0, closed: 0 }

    const normalizeCount = (value: unknown): number => {
        if (typeof value === "number" && Number.isFinite(value)) return value
        if (typeof value === "string") {
            const parsed = Number(value)
            return Number.isFinite(parsed) ? parsed : 0
        }
        return 0
    }

    const openCount = normalizeCount((rawCounts as Record<string, unknown>)?.open ?? (rawCounts as Record<string, unknown>)?.Open)
    const closedCount = normalizeCount((rawCounts as Record<string, unknown>)?.closed ?? (rawCounts as Record<string, unknown>)?.Closed)
    const comingSoonCount = normalizeCount(
        (rawCounts as Record<string, unknown>)?.comingSoon ??
        (rawCounts as Record<string, unknown>)?.coming_soon ??
        (rawCounts as Record<string, unknown>)?.["coming-soon"]
    )

    const allCountFromApi = normalizeCount((rawCounts as Record<string, unknown>)?.all ?? (rawCounts as Record<string, unknown>)?.total)
    const computedTotal = openCount + comingSoonCount + closedCount
    const allCount = computedTotal > 0 ? computedTotal : allCountFromApi

    const counts = {
        all: allCount,
        open: openCount,
        comingSoon: comingSoonCount,
        closed: closedCount,
    }

    const tabConfig: { id: TabId; label: string; count: number }[] = [
        { id: "all", label: t('openOpportunities.all'), count: counts.all },
        { id: "open", label: t('openOpportunities.open'), count: counts.open },
        { id: "coming-soon", label: t('openOpportunities.comingSoon'), count: counts.comingSoon },
        { id: "closed", label: t('openOpportunities.closed'), count: counts.closed },
    ]

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
                                    onClick={() => onTabChange(tab.id)}
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