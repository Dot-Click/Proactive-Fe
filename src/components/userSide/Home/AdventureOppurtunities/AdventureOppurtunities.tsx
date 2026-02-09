// import linearline from "../../../assets/linearline.png"
// import Box from "../../../assets/box.png"
import Adventureoppurtunitiescard from "./Adventureoppurtunitiescard"
import box1 from "../../../../assets/box.png"
import { UsegetTrips } from "@/hooks/gettriphook"
import { useTranslation } from "react-i18next"

const AdventureOppurtunities = () => {
    const { t } = useTranslation();
    const { data: trip } = UsegetTrips()
    const tripsData = trip?.trips
    console.log('tripsData',tripsData)
    return (
        <div className="bg-linear-to-r   md:mt-[290px] lg:mt-28 xl:mt-38 sm:mt-[80px]  mt-[250px] from-[#F0F5FD]/18 to-[#F0F5FD]">
            <div className="relative flex flex-col lg:gap-8 gap-4 py-20 px-4">
                <h1 className="z-10 text-center lg:text-4xl text-2xl font-bold bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">{t('home.adventureOpportunities')}</h1>
                <img
                    src={box1}
                    alt="box1"
                    className="w-26 h-28 absolute bottom-8 right-108 opacity-50 lg:flex hiddenz-5"
                />
                <p className="text-center text-sm text-[#221E33]" dangerouslySetInnerHTML={{ __html: t('home.adventureOpportunitiesSubtitle').replace(/\n/g, '<br className="lg:block hidden" />') }} />
            </div>
            <div className="px-4 sm:px-16 py-18 flex justify-center items-center">
                <Adventureoppurtunitiescard />
            </div>
        </div>
    )
}

export default AdventureOppurtunities