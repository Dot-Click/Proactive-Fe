import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import arrowup from "../../../assets/sidebaricon/arrowup.png"

const chartData = [
    { month: "January", desktop: 80 },
    { month: "February", desktop: 50, },
    { month: "March", desktop: 100, },
    { month: "April", desktop: 120, },
    { month: "May", desktop: 150, },
    { month: "June", desktop: 180, },
    { month: "July", desktop: 200, },
    { month: "August", desktop: 230, },
    { month: "September", desktop: 250, },
    { month: "October", desktop: 280, },
    { month: "November", desktop: 300, },
    { month: "December", desktop: 320, },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
} satisfies ChartConfig

export function Chart() {
    return (
        <>
            <div className="bg-white rounded-[25px] px-4 py-6 shadow-md mt-1">
                <div className="flex justify-between items-center">
                    <h1 className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-medium md:text-[18px]">Earnings Overview</h1>
                    <h1 className="text-[#221E33] font-bold md:text-[28px]">€ 1060.00</h1>
                </div>
                <div className="flex justify-end gap-3">
                    <span className="flex items-center gap-1 text-[#009A2B] text-[12px] md:text-[16px]">
                        <img src={arrowup} alt="arrowup" />
                        10.5%
                    </span>
                    <div>
                        <span className="text-[#666373]">From Last Month</span>
                    </div>
                </div>
                <ChartContainer config={chartConfig} className="md:min-h-[200px] md:w-[720px]">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
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
                            domain={[0, 300]} // 👈 Y-axis min=0, max=250
                            ticks={[0, 50, 100, 150, 200, 250, 300]} // 👈 manual tick steps
                            tick={{
                                fill: "#999999",
                                fontSize: 12,
                            }}
                            tickMargin={20}
                            tickFormatter={(value) => `€${value}`}
                        />

                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="desktop"
                            fill="url(#barGradient)"
                            radius={[6, 6, 0, 0]}
                            barSize={40}
                            className="bgradient-to-b from-[#221E33] to-[#565070]"
                        />
                    </BarChart>
                </ChartContainer>
            </div>
        </>
    )
}
