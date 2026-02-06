import Pastadventure1 from "../../assets/pastadventure1.png"
import Pastadventure2 from "../../assets/pastadventure2.png"
import Pastadventure3 from "../../assets/pastadventure3.png"
import Pastadventure4 from "../../assets/pastadventure4.png"
import Pastadventure5 from "../../assets/pastadventure5.png"
import Pastadventure6 from "../../assets/pastadventure6.png"
import Pastadventure7 from "../../assets/pastadventure7.png"
import Pastadventure8 from "../../assets/pastadventure8.png"
import calenderwhite from "../../assets/calenderwhite.png"
import { Button } from "../ui/button"
import { useState, useMemo } from "react"
import { UsegetPastTrips, type PastTrip } from "@/hooks/getPastTripshook"
import { LoaderIcon, Inbox } from "lucide-react"

const FALLBACK_IMAGES = [
    Pastadventure1, Pastadventure2, Pastadventure3, Pastadventure4,
    Pastadventure5, Pastadventure6, Pastadventure7, Pastadventure8,
]

const FALLBACK_PAST_ADVENTURES = [
    { id: "f1", img: Pastadventure1, category: "Wild Weekend", title: "Cayoning Barcelona", date: "05 October 2024" },
    { id: "f2", img: Pastadventure2, category: "Wild Trip", title: "Iceland Northern Lights", date: "15 November 2024" },
    { id: "f3", img: Pastadventure3, category: "Erasmus+", title: "Berlin Youth Exchange", date: "5 octubre de 2025" },
    { id: "f4", img: Pastadventure4, category: "Wild Weekend", title: "Portuguese Coast Adventure", date: "08 August 2024" },
    { id: "f5", img: Pastadventure5, category: "Wild Weekend", title: "Romanian Carpathians Trek", date: "05 October 2024" },
    { id: "f6", img: Pastadventure6, category: "Erasmus+", title: "French Culture Immersion", date: "15 November 2024" },
    { id: "f7", img: Pastadventure7, category: "Wild Trip", title: "Swiss Alpine Weekend", date: "5 octubre de 2025" },
    { id: "f8", img: Pastadventure8, category: "Wild Weekend", title: "Greek Islands Expedition", date: "5 octubre de 2025" },
]

function getCategoryButtonClass(category: string): string {
    const c = (category || "").toLowerCase()
    if (c.includes("wild weekend")) return "bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]"
    if (c.includes("wild trip")) return "bg-[#DFF2FF] hover:bg-[#ace4d6] cursor-pointer text-[#3B607A] font-semibold rounded-[10px] px-5"
    if (c.includes("erasmus")) return "bg-[#FFDFC4] hover:bg-[#f0d1b7] cursor-pointer text-[#622E15] font-semibold rounded-[10px] px-5"
    return "bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]"
}

type DisplayItem = {
    id: string
    imageUrl: string
    category: string
    title: string
    date: string
}

const Pastadventures = () => {
    const [loadmore, setLoadmore] = useState(false)
    const { data, isLoading, isError } = UsegetPastTrips()
    const apiTrips = data?.trips ?? []

    const displayItems = useMemo((): DisplayItem[] => {
        if (apiTrips.length > 0) {
            return apiTrips.map((t: PastTrip, index: number) => ({
                id: t.id,
                imageUrl: t.coverImage || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
                category: t.category || t.type || "Adventure",
                title: t.name || t.title || "Past Adventure",
                date: t.startDate ? new Date(t.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : "",
            }))
        }
        const fallback = loadmore ? [...FALLBACK_PAST_ADVENTURES, ...FALLBACK_PAST_ADVENTURES] : FALLBACK_PAST_ADVENTURES
        return fallback.map((f) => ({
            id: f.id,
            imageUrl: f.img,
            category: f.category,
            title: f.title,
            date: f.date,
        }))
    }, [apiTrips, loadmore])

    const useFallback = apiTrips.length === 0
    const showLoadMore = useFallback && !loadmore

    return (
        <div className="bg-[#FAFAFA] px-4 sm:px-16 py-8">
            <div className="flex flex-col gap-2 justify-center items-center">
                <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-4xl">Past Adventures</h4>
                <span className="text-[#221E33] text-sm text-center">Explore our completed adventures and see the amazing experiences we&apos;ve created</span>
            </div>

            {isLoading ? (
                <div className="w-full flex items-center justify-center py-16">
                    <LoaderIcon className="animate-spin h-10 w-10 text-[#0DAC87]" />
                </div>
            ) : isError ? (
                <div className="w-full flex flex-col items-center justify-center py-16">
                    <div className="bg-[#FEE2E2] rounded-full p-4 mb-4">
                        <Inbox className="h-10 w-10 text-[#DC2626]" />
                    </div>
                    <p className="text-[#666373] text-sm font-medium mb-1">
                        Unable to load past adventures
                    </p>
                    <p className="text-[#999999] text-xs">
                        Please try again later
                    </p>
                </div>
            ) : displayItems.length === 0 && !useFallback ? (
                <div className="w-full flex flex-col items-center justify-center py-16">
                    <div className="bg-[#F3F4F6] rounded-full p-4 mb-4">
                        <Inbox className="h-10 w-10 text-[#666373]" />
                    </div>
                    <p className="text-[#666373] text-sm font-medium mb-1">
                        No past adventures available
                    </p>
                    <p className="text-[#999999] text-xs">
                        Check back later for completed adventures
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid lg:grid-cols-4 gap-4 py-12">
                        {displayItems.map((item) => (
                            <div key={item.id} className="relative flex justify-center">
                                <img src={item.imageUrl} alt={item.title} className="w-100 h-100 rounded-[14px] object-cover" />
                                <div className="absolute inset-0 bg-linear-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]" />
                                <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                                    <Button className={getCategoryButtonClass(item.category)}>{item.category}</Button>
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">{item.title}</h4>
                                        <div className="flex items-center gap-3">
                                            <img src={calenderwhite} alt="calender" className="w-5" />
                                            <span className="text-[#FFFFFF] text-sm">{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showLoadMore && (
                        <div className="flex justify-center items-center py-6">
                            <Button onClick={() => setLoadmore(true)} className="bg-[#0DAC87] hover:bg-[#0ca07d] cursor-pointer rounded-full px-10 py-6">Load More Adventures</Button>
                        </div>
                    )}
                    {useFallback && loadmore && (
                        <div className="flex justify-center items-center py-6">
                            <Button className="bg-[#0DAC87] hover:bg-[#0ca07d] cursor-pointer rounded-full px-10 py-6">No More Adventures Available</Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Pastadventures
