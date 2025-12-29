import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import arrowup from "../../../assets/sidebaricon/arrowup.png"
import { UsegetdashboardStats } from "@/hooks/getdashboardStats"

// const chartData = [
//     { month: "January", desktop: 130 },
//     { month: "February", desktop: 200, },
//     { month: "March", desktop: 150, },
//     { month: "April", desktop: 80, },
//     { month: "May", desktop: 230, },
//     { month: "June", desktop: 120, },
//     { month: "July", desktop: 200, },
//     { month: "August", desktop: 150, },
//     { month: "September", desktop: 230, },
//     { month: "October", desktop: 200, },
//     { month: "November", desktop: 70, },
//     { month: "December", desktop: 90, },
// ]

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "#2563eb",
  },
} satisfies ChartConfig

export function Chart() {
    const { data, isLoading, isError } = UsegetdashboardStats();
    const chartData = data?.earningsOverview?.monthlyData?.map((item: { month: string, earnings: number }) => ({
        month: item.month,
        earnings: item.earnings,
    })) || [];
    if (isError) {
        return <div>Error loading chart data.</div>;
    }
    if (isLoading) {
        return <div>Loading chart data...</div>;
    }

    return (
        <>
            <div className="bg-white rounded-[25px] px-6 py-4 shadow-sm border border-[#E9ECF5] mt-1">
                <div className="flex justify-between items-start py-2">
                    <h1 className="bg-gradient-to-r from-[#221E33] mt-2 to-[#565070] text-transparent bg-clip-text font-medium md:text-[18px]">Earnings Overview</h1>
                    <div className="flex flex-col items-end">
                        <h2 className="text-[#221E33] font-bold md:text-[24px]">€ {isLoading ? "Loading..." : data?.earningsOverview?.totalEarnings}</h2>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-[#009A2B] text-[12px] md:text-[14px]">
                                <img src={arrowup} alt="arrowup" />
                                {isLoading ? "Loading..." : data?.earningsOverview?.percentageChange}%
                            </span>
                            <span className="text-[#A3A1AC] text-[12px]">From Last Month</span>
                        </div>
                    </div>
                </div>
                <ChartContainer config={chartConfig} className="lg:h-[280px] h-[240px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    >

                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#514B6A" />
                                <stop offset="100%" stopColor="#2E2A41" />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={true}
                            tickFormatter={(value) => value.slice(0, 3)}
                            tick={{
                                fill: "#221E33",
                                fontSize: 13,
                                fontWeight: 500,
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 300]}
                            ticks={[0, 50, 100, 150, 200, 250, 300]}
                            tick={{
                                fill: "#999999",
                                fontSize: 12,
                            }}
                            tickMargin={20}
                            tickFormatter={(value) => `€ ${value}`}
                        />

                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="earnings"
                            fill="url(#barGradient)"
                            radius={[6, 6, 0, 0]}
                            barSize={34}
                            className="bgradient-to-b from-[#221E33] to-[#565070]"
                        />
                    </BarChart>
                </ChartContainer>
            </div>
        </>
    )
}
