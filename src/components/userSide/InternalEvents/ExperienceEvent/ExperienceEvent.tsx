import ExperienceEventVideo from "./ExperienceEventVideo"
import box1 from "../../../../assets/box.png"
import { useTranslation } from "react-i18next"

const ExperienceEvent = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="flex flex-col justify-center items-center lg:gap-8 lg:pt-30 pt-10">
                <div className="relative flex flex-col lg:gap-8 gap-4 px-4 text-center">
                    <h1 className="z-10 bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold lg:text-4xl">{t('internalEvents.experienceEvent.title')}</h1>
                    <img
                        src={box1}
                        alt="box1"
                        className="w-28 h-28 absolute bottom-6 right-74 opacity-50 lg:flex hiddenz-5"
                    />
                    <p className="text-[#221E33] text-[15px] text-center">{t('internalEvents.experienceEvent.subtitle')}</p>
                </div>
            </div>
            <div>
                <ExperienceEventVideo />
            </div>
        </>
    )
}

export default ExperienceEvent