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
        <div className="py-2">
            <div className="flex flex-wrap gap-3 items-center" role="tablist">
                {tabConfig.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onTabChange(tab.id)}
                            className={`group flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer border outline-none
                                ${isActive
                                    ? "bg-[#221E33] text-white border-[#221E33] shadow-lg shadow-gray-200"
                                    : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:text-gray-900 shadow-sm"
                                }`}
                        >
                            <span>{tab.label}</span>
                            <div
                                className={`rounded-lg px-2 py-0.5 text-[10px] font-black transition-colors ${
                                    isActive
                                        ? "bg-white text-[#221E33]"
                                        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600"
                                }`}
                            >
                                {tab.count}
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Tabs