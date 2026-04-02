import AdventureMoment from "../../../../assets/Adventuremoment.avif"
import Adventuremomentscards from "./Adventuremomentscards"
import { useTranslation } from "react-i18next"

const Adventuremoments = () => {
    const { t } = useTranslation();
    return (
        <div className="relative w-full flex flex-col items-center py-16 sm:py-24 lg:py-32 px-4 overflow-hidden min-h-[600px]">
            {/* Background Image */}
            <img src={AdventureMoment} alt="AdventureMoment" className="absolute inset-0 w-full h-full object-cover z-0" />
            {/* Subtle Overlay Overlay */}
            <div className="absolute inset-0 bg-black/10 z-0" />
            
            {/* Header Content */}
            <div className="relative z-10 flex flex-col gap-6 sm:gap-8 mb-16 sm:mb-24 lg:mb-32 max-w-4xl w-full">
                <h1 className="font-bold lg:text-5xl md:text-4xl text-3xl text-center bg-linear-to-r from-[#FFFFFF] to-[#E3E3E3] text-transparent bg-clip-text">
                    {t('home.adventureMoments')}
                </h1>
                <p className="lg:tracking-wider text-center text-xs sm:text-sm lg:text-base text-[#FFFFFF] opacity-90 px-4" 
                    dangerouslySetInnerHTML={{ __html: t('home.adventureOpportunitiesSubtitle').replace(/\n/g, '<br className="lg:block hidden" />') }} 
                />
            </div>

            {/* Cards Container */}
            <div className="relative z-20 w-full max-w-7xl pointer-events-none">
                <div className="pointer-events-auto w-full">
                    <Adventuremomentscards />
                </div>
            </div>
        </div>
    )
}

export default Adventuremoments