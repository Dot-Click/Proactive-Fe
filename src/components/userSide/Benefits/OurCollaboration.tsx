import box2 from "../../../assets/box2.png"
import advantsges from "../../../assets/advatages.png"
import OurCollabrationCard from "./OurCollabrationCard"
import { useTranslation } from "react-i18next"

const OurCollaboration = () => {
    const { t } = useTranslation();
    return (
        <>
        <div className="flex justify-center items-start pt-50 ">
        <img src={advantsges} alt="advantsges" className="mr-100 h-25 lg:flex hidden"/>
        </div>
        <div className="md:py-80 py-60">
            <div className="flex flex-col justify-center items-center md:h-120 h-100 lg:gap-20 gap-4 px-2">
                <div className="relative">
                    <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                  font-bold lg:text-4xl relative z-10">
                        {t('benefits.ourCollaborations.title')}
                    </h1>
                    <img
                        src={box2}
                        alt="box2"
                        className="w-24 h-26 absolute -top-8 left-20  opacity-80 lg:flex hidden"
                    />
                </div>
                <OurCollabrationCard/>
            </div>
        </div>
        </>
    )
}

export default OurCollaboration