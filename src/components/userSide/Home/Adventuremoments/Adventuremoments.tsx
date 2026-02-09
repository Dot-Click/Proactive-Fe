import AdventureMoment from "../../../../assets/Adventuremoment.png"
import Adventuremomentscards from "./Adventuremomentscards"
import { useTranslation } from "react-i18next"

const Adventuremoments = () => {
    const { t } = useTranslation();
    return (
        <div className="relative ">
            <img src={AdventureMoment} alt="AdventureMoment" className="w-full h-300 lg:h-full"/>
            <div className="flex flex-col lg:gap-8 gap-4 absolute inset-0 top-20">
                <h1 className="font-bold lg:text-4xl text-2xl text-center bg-linear-to-r from-[#FFFFFF] to-[#E3E3E3] text-transparent bg-clip-text">{t('home.adventureMoments')}</h1>
                <p className="lg:tracking-wider text-center text-sm text-[#FFFFFF]" dangerouslySetInnerHTML={{ __html: t('home.adventureOpportunitiesSubtitle').replace(/\n/g, '<br className="lg:block hidden" />') }} />
            </div>
            <div className="absolute inset-0 top-60 flex justify-center">
                <Adventuremomentscards />
            </div>
        </div>
    )
}

export default Adventuremoments