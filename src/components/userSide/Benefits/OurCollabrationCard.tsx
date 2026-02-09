import collabration2 from "../../../assets/OurCollabration2.png"
import collabration1 from "../../../assets/OurCollabration1.png"
import iati from "../../../assets/iati.png"
import AboutCarousel1 from "../../../assets/AboutCarousel1.png"
import { useTranslation } from "react-i18next"

const OurCollabrationCard = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-12 mb-24 md:mb-0">

            <div className="flex lg:flex-row flex-col lg:gap-12 gap-8 items-center">
                <img src={collabration2} alt="collabration2" className="lg:h-100 h-50" />
                <div
                    className="lg:flex hidden absolute left-50 top-220 -translate-y-1/2 -translate-x-1/3 w-60 h-80 bg-[radial-gradient(circle_at_50%_50%,#76F0D4,rgba(250,250,250,0.05))] rounded-full blur-3xl opacity-30">
                </div>
                <div className="flex flex-col lg:items-start items-center gap-6">
                    <div>
                        <h1 className="text-[#221E33] font-bold md:text-4xl lg:text-start text-center" dangerouslySetInnerHTML={{ __html: t('benefits.ourCollaborations.travelInsurance.title').replace(/\n/g, '<br className="lg:flex hidden" />') }} />
                        <p className="text-[#221E33] md:text-[12px] text-[10px] lg:text-start text-center" dangerouslySetInnerHTML={{ __html: t('benefits.ourCollaborations.travelInsurance.description').replace(/\n/g, '<br className="lg:flex hidden" />') }} />
                    </div>
                    <img src={iati} alt="iati" className="h-10" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col md:gap-12 gap-6 items-center">
                <div className="flex flex-col lg:items-start items-center gap-6">
                    <div>
                        <h1 className="text-[#221E33] font-bold md:text-4xl lg:text-start text-center" dangerouslySetInnerHTML={{ __html: t('benefits.ourCollaborations.sheltersTransportation.title').replace(/\n/g, '<br className="lg:flex hidden" />') }} />
                        <p className="lg:text-start text-center text-[#221E33] md:text-[12px] text-[10px]" dangerouslySetInnerHTML={{ __html: t('benefits.ourCollaborations.sheltersTransportation.description').replace(/\n/g, '<br className="lg:flex hidden" />') }} />
                    </div>
                    <img src={AboutCarousel1} alt="AboutCarousel1" className="h-16" />
                </div>
                <img src={collabration1} alt="collabration1" className="lg:h-100 h-50" />
                <div
                    className="lg:flex hidden absolute left-280 top-360 -translate-y-1/2 -translate-x-1/3 w-60 h-80 bg-[radial-gradient(circle_at_50%_50%,#76F0D4,rgba(250,250,250,0.05))] rounded-full blur-3xl opacity-30">
                </div>
            </div>

        </div>
    )
}

export default OurCollabrationCard
