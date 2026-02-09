import OurMissionImg from "../../../../assets/OurMission.png"
import box2 from "../../../../assets/box2.png"
import { useTranslation } from "react-i18next"

const OurMission = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-linear-to-r from-[#F0F5FD]/18 to-[#F0F5FD] lg:py-16 md:py-10 lg:-mt-30 md:mt-4 py-10 -mt-15">
      <div className="flex lg:flex-row flex-col lg:gap-20 gap-8 justify-center items-center">
        <div className="flex flex-col lg:gap-8 gap-2 lg:mt-16">
          <div className="relative">
            <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
      font-bold lg:text-4xl relative z-10">
              {t('about.ourMission')}
            </h1>
            <img
              src={box2}
              alt="box2"
              className="w-22 h-22 absolute -top-7 -left-2  opacity-80 lg:flex hidden"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#221E33] text-[14px]" dangerouslySetInnerHTML={{ __html: t('about.missionText1').replace(/\n/g, '<br />') }} />
            <p className="text-[#221E33] text-[14px]" dangerouslySetInnerHTML={{ __html: t('about.missionText2').replace(/\n/g, '<br />') }} />
          </div>
        </div>
        <div className="relative w-fit">
          <div
            className="lg:flex hidden absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/3 
            w-60 h-80 
            bg-[radial-gradient(circle_at_50%_50%,#76F0D4,rgba(250,250,250,0.05))] 
            rounded-full blur-3xl opacity-70">
          </div>
          <img src={OurMissionImg} alt="OurMissionImg" className="lg:h-120 h-80 relative z-10" />
        </div>
      </div>
    </div>
  )
}

export default OurMission