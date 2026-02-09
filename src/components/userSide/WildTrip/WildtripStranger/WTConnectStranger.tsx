import setting from "../../../../assets/setting.png"
import WT1 from "../../../../assets/WT1.png"
import WT2 from "../../../../assets/WT2.png"
import { useTranslation } from "react-i18next"

const WTConnectStranger = () => {
    const { t } = useTranslation();
    return (
        <div className="relative ">
            {/* <div className="bg-black lg:h-[130vh] md:h-[200vh] h-[120vh]"></div> */}
            <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-30 gap-10 lg:py-10">
                <div className="flex flex-col justify-end items-end lg:mt-15 mt-10">
                    <img src={WT1} alt="WT1" className="lg:h-100 h-50" />
                    <img src={WT2} alt="WT2" className="lg:h-70 h-30 -mt-[60px] lg:-mr-10" />
                </div>

                <div className="flex flex-col lg:gap-8 gap-6 px-5 lg:px-0">
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">{t('wildWeekend.connectStranger.title1')}</h4>
                            <p className="text-[#221E33] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc1').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">{t('wildWeekend.connectStranger.title2')}</h4>
                            <p className="text-[#221E33] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc2').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">{t('wildWeekend.connectStranger.title3')}</h4>
                            <p className="text-[#221E33] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc3').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">{t('wildWeekend.connectStranger.title4')}</h4>
                            <p className="text-[#221E33] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc4').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">{t('wildWeekend.connectStranger.title5')}</h4>
                            <p className="text-[#221E33] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc5').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WTConnectStranger