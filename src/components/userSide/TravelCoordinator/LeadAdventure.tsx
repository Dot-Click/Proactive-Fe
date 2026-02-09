import { Button } from "@/components/ui/button"
import leadadventurebg from "../../../assets/LeadAdventure.png"
import leadadventurebgcolor from "../../../assets/leadadventurebg.png"
import { useTranslation } from "react-i18next"

const LeadAdventure = () => {
    const { t } = useTranslation();
    return (
        <div className="relative w-full">
            <img
                src={leadadventurebg}
                alt="leadadventurebg"
                className="relative w-full object-cover lg:h-100 h-80"
            />
            <img src={leadadventurebgcolor} alt="leadadventurebgcolor" className="absolute inset-0 opacity-50 lg:h-100 md:h-80 h-80"/>
            <div className="flex flex-col justify-center gap-6 absolute inset-0 px-4">
                <h1 className="text-center text-[#F7EBBE] lg:text-4xl md:text-3xl sm:text-2xl font-bold">
                    {t('travelCoordinator.leadAdventure.title')}
                </h1>
                <p className="text-center text-[#FFFFFF] text-sm md:text-base lg:text-lg" dangerouslySetInnerHTML={{ __html: t('travelCoordinator.leadAdventure.subtitle').replace(/\n/g, '<br className="lg:flex hidden" />') }} />
                <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-6">
                    <Button className="font-bold hover:scale-105 transition-all duration-300 bg-[#0DAC87] hover:bg-[#0DAC87] cursor-pointer text-[#FFFFFF] rounded-full px-6 py-6">
                        {t('travelCoordinator.leadAdventure.applyNow')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LeadAdventure