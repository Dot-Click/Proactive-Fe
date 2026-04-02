import importantMask from "../../../../assets/importantmask.avif"
import importantbg from "../../../../assets/importantbg.avif"
import importantlayer from "../../../../assets/importantlayer.avif"
import OurValuesCard from "./OurValuesCard"
import { useTranslation } from "react-i18next"

const OurValues = () => {
    const { t } = useTranslation();
    return (
        <div className="relative bg-[#F0F5FD]/28 py-16 lg:py-24">
            {/* Background Layers */}
            <img
                src={importantMask}
                alt="importantMask"
                className="absolute inset-0 w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0">
                <img src={importantbg} alt="importantbg" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="absolute inset-0">
                <img src={importantlayer} alt="importantlayer" className="w-full h-full object-cover opacity-80" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col gap-10 max-w-7xl mx-auto px-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-center text-3xl lg:text-5xl bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE]/96 text-transparent bg-clip-text font-extrabold uppercase transition-all duration-300">
                        {t('about.ourValues.title')}
                    </h1>
                    <p className="text-sm lg:text-lg font-semibold text-white/90 text-center max-w-2xl mx-auto leading-relaxed italic">
                        {t('about.ourValues.subtitle')}
                    </p>
                </div>
                
                <div className="w-full">
                    <OurValuesCard />
                </div>
            </div>
        </div>
    )
}

export default OurValues