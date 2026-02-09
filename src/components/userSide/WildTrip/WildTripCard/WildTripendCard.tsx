import What from "../../../../assets/Whatis.png"
import Howdo from "../../../../assets/Howdo.png"
import when from "../../../../assets/When.png"
import { useTranslation } from "react-i18next"

const WildTripCard = () => {
    const { t } = useTranslation();
    return (
        <div className="flex lg:flex-row flex-col justify-center items-center gap-6 py-6 lg:mb-30 lg:-mt-10 md:mt-20 mb-20 -mt-10">
            <div className="relative">
                <img src={What} alt="What" className="lg:h-65 h-50" />
                <div className="flex flex-col lg:gap-6 gap-2 absolute inset-0 px-4 lg:py-12 py-6">
                    <h4 className="font-bold lg:text-3xl">{t('wildTrip.whatIs.title')}</h4>
                    <span className="lg:text-[12px] text-[10px] text-[#221E33]">{t('wildTrip.whatIs.description')}</span>
                </div>
            </div>
            <div className="relative lg:mt-5">
                <img src={when} alt="when" className="lg:h-60 h-50" />
                <div className="flex flex-col lg:gap-8 gap-2 absolute inset-0 px-4 lg:py-7 py-6">
                    <h4 className="font-bold lg:text-3xl">{t('wildTrip.when.title')}</h4>
                    <span className="text-[12px] text-[#221E33]">{t('wildTrip.when.description')}</span>
                </div>
            </div>
            <div className="relative">
                <img src={Howdo} alt="Howdo" className="lg:h-65 h-50" />
                <div className="flex flex-col lg:gap-6 gap-2 absolute inset-0 px-4 lg:py-12 py-6">
                    <h4 className="font-bold lg:text-3xl">{t('wildTrip.howToParticipate.title')}</h4>
                    <span className="text-[12px] text-[#221E33]">{t('wildTrip.howToParticipate.description')}</span>
                </div>
            </div>
        </div>
    )
}

export default WildTripCard 