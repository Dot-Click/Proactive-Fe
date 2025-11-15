import { useEffect, useState } from "react";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

type CalendarCell = {
    dayNumber: number | null;
    isCurrentMonth: boolean;
};

function buildMonthGrid(daysInMonth: number, startDayIndexMondayBased: number): { weeks: CalendarCell[][]; totalCells: number } {
    const needsSixRows = daysInMonth + startDayIndexMondayBased > 35;
    const totalCells = needsSixRows ? 42 : 35;
    const cells: CalendarCell[] = [];

    for (let i = 0; i < startDayIndexMondayBased; i++) {
        cells.push({ dayNumber: null, isCurrentMonth: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
        cells.push({ dayNumber: day, isCurrentMonth: true });
    }
    let nextMonthDay = 1;
    while (cells.length < totalCells) {
        cells.push({ dayNumber: nextMonthDay++, isCurrentMonth: false });
    }

    const weeks: CalendarCell[][] = [];
    for (let i = 0; i < totalCells; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }
    return { weeks, totalCells };
}

const Upcomingtrips = () => {
    const [viewDate, setViewDate] = useState(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const year = viewDate.getFullYear();
    const monthIndex = viewDate.getMonth(); // 0-11

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDaySundayBased = new Date(year, monthIndex, 1).getDay(); // 0=Sun ... 6=Sat
    const startDayIndex = (firstDaySundayBased + 6) % 7; // convert to Monday=0
    const { weeks, totalCells } = buildMonthGrid(daysInMonth, startDayIndex);

    const monthTitle = new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(viewDate);

    // function goToPrevMonth() {
    //     setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    // }
    function goToNextMonth() {
        setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    }

    // Compute the second weekend (Sat+Sun) of the current month
    function getSecondWeekendDays(): { saturday: number | null; sunday: number | null } {
        let saturdayCount = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const dow = new Date(year, monthIndex, day).getDay();
            if (dow === 6) {
                saturdayCount += 1;
                if (saturdayCount === 2) {
                    const sun = day + 1 <= daysInMonth ? day + 1 : null;
                    return { saturday: day, sunday: sun };
                }
            }
        }
        return { saturday: null, sunday: null };
    }

    const secondWeekend = getSecondWeekendDays();

    // Right-calendar date selection state (per visible month)
    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    useEffect(() => {
        setSelectedDays([]);
    }, [year, monthIndex]);

    function toggleSelected(day: number | null | undefined) {
        if (!day) return;
        setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
    }

    return (
        <div className="bg-[#F6F8FD] px-4 sm:px-16 py-8">
            <div className="flex flex-col justify-center items-center gap-2">
                <h4 className="text-center bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold lg:text-4xl">Upcoming Wild Weekends & Trips</h4>
                <span className="text-center text-[#221E33] text-[12px] lg:text-[14px]">Browse all our upcoming adventures at a glance. See available weekends and trips directly on the <br className="hidden lg:block"/> calendar.</span>
            </div>

            <div className="mt-8 flex lg:flex-row flex-col justify-center lg:items-start items-center gap-6">
                {/* Left sidebar: mini calendar + search */}
                <div className="w-64 space-y-4">
                    <div className="rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-4xl font-bold text-[#221E33]">{monthTitle}</div>
                            <div className="flex items-center gap-1">
                                <button aria-label="Next month" onClick={goToNextMonth} className="w-6 h-6 grid place-items-center rounded-full bg-[#666373] hover:bg-[#595763] text-[#FFFFFF] cursor-pointer">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                                <button aria-label="Next month" onClick={goToNextMonth} className="w-6 h-6 grid place-items-center rounded-full bg-[#666373] hover:bg-[#595763] text-[#FFFFFF] cursor-pointer">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 text-[11px] text-[#565070] mb-1">
                            {WEEKDAY_LABELS.map((label) => (
                                <div key={`mini-label-${label}`} className="text-center py-1">
                                    {label}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {weeks.flat().map((cell, idx) => {
                                const isWildWeekend = cell.isCurrentMonth && (cell.dayNumber === secondWeekend.saturday || cell.dayNumber === secondWeekend.sunday);
                                const isMuted = !cell.isCurrentMonth;
                                let classes = "aspect-square rounded-lg text-xs text-[#221E33] flex items-center justify-center ";
                                classes += isWildWeekend ? "text-[#165E52] " : "";
                                classes += isMuted ? "text-[#A0A3AD]" : "text-[#221E33]";

                                return (
                                    <>
                                        <div key={`mini-cell-${idx}`} className={classes}>
                                            {cell.dayNumber}
                                        </div>
                                    </>
                                );
                            })}
                            <div className="w-2 h-2 border-b border-[#666373]" />

                        </div>
                    </div>

                    <div className="relative">
                        <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#565070]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="1.6" />
                            <path d="m21 21-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <input
                            className="w-full pl-10 pr-3 py-2 bg-white rounded-[12px] shadow-sm placeholder-[#A0A3AD] text-sm text-[#221E33] outline-none"
                            placeholder="Search Place"
                        />
                    </div>
                </div>

                {/* Main calendar */}
                <div className="flex-1 w-full">
                    <div className="bg-white rounded-2xl">

                        <div className="mt-6 grid grid-cols-7 text-sm text-[#565070] bg-[#F6F6F6] rounded-tl-[12px] rounded-tr-[12px]">
                            {WEEKDAY_LABELS.map((label) => (
                                <div key={`label-${label}`} className="py-6 text-center border-l">
                                    {label}
                                </div>
                            ))}
                        </div>

                        <div className={"grid grid-cols-7 " + (totalCells === 35 ? "grid-rows-5" : "grid-rows-6") + "relative"}>
                            {weeks.flat().map((cell, idx) => {
                                const isMuted = !cell.isCurrentMonth;
                                const isClickable = cell.isCurrentMonth && cell.dayNumber !== null;
                                const isWildWeekend = cell.isCurrentMonth && (cell.dayNumber === secondWeekend.saturday || cell.dayNumber === secondWeekend.sunday);
                                const isSelected = cell.isCurrentMonth && cell.dayNumber !== null && selectedDays.includes(cell.dayNumber);

                                let classes = "h-24 border flex items-center justify-center text-2xl text-[#221E33] relative font-semibold";
                                if (isSelected) {
                                    classes += "bg-emerald-300 border-emerald-400 text-[#165E52]";
                                } else if (isWildWeekend) {
                                    classes += "bg-emerald-100 border-emerald-200";
                                } else {
                                    classes += "bg-white border-[#ECECF1]";
                                }
                                classes += isMuted ? "text-[#A0A3AD]" : "text-[#221E33]";
                                classes += isClickable ? " cursor-pointer hover:bg-emerald-50" : "";

                                return (
                                    <div
                                        key={`cell-${idx}`}
                                        className={classes}
                                        onClick={() => (isClickable ? toggleSelected(cell.dayNumber) : undefined)}
                                        aria-pressed={isSelected}
                                    >
                                        {cell.dayNumber}
                                        {isWildWeekend && cell.dayNumber === secondWeekend.saturday && (
                                            <span className="absolute mt-6 mr-auto ml-2 text-xs text-[#2A7765]">Wild Weekend</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upcomingtrips;