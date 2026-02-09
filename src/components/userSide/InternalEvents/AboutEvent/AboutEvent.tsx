import { useTranslation } from "react-i18next"

const AboutEvent = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#EDE8F3]">
   <div className="flex flex-col justify-center items-center lg:gap-8 gap-4 lg:py-14 pt-10 px-2">
    <h1 className="text-[#221E33] font-bold lg:text-3xl">{t('internalEvents.aboutEvent.title')}</h1>
    <p className="text-center text-[#221E33] lg:text-[16px] text-[13px]" dangerouslySetInnerHTML={{ __html: t('internalEvents.aboutEvent.desc1').replace(/\n/g, '<br className="lg:block hidden" />') }} />
    <p className="text-center text-[#221E33] text-[13px]" dangerouslySetInnerHTML={{ __html: t('internalEvents.aboutEvent.desc2').replace(/\n/g, '<br className="lg:block hidden" />') }} />
   </div>
    </div>
  )
}

export default AboutEvent