import setting from "../../../../assets/setting.png"
import connect1 from "../../../../assets/connect1.png"
import connect2 from "../../../../assets/connect2.png"
import { useTranslation } from "react-i18next";

const ConnectStranger = () => {
    const { t } = useTranslation();
    return (
        <div className="relative ">
            <div className="bg-black lg:h-[90vh] h-[100vh]"></div>
            <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-20 gap-10 absolute inset-0">
               
                <div className="flex flex-col lg:gap-8 gap-6 px-5 lg:px-0">
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="text-[#FFFFFF] font-bold text-xl">{t('wildWeekend.connectStranger.title1')}</h4>
                            <p className="text-[#BCBCBC] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc1').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="text-[#FFFFFF] font-bold text-xl">{t('wildWeekend.connectStranger.title2')}</h4>
                            <p className="text-[#BCBCBC] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc2').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="text-[#FFFFFF] font-bold text-xl">{t('wildWeekend.connectStranger.title3')}</h4>
                            <p className="text-[#BCBCBC] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc3').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="text-[#FFFFFF] font-bold text-xl">{t('wildWeekend.connectStranger.title4')}</h4>
                            <p className="text-[#BCBCBC] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc4').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="text-[#FFFFFF] font-bold text-xl">{t('wildWeekend.connectStranger.title5')}</h4>
                            <p className="text-[#BCBCBC] text-[12px]" dangerouslySetInnerHTML={{ __html: t('wildWeekend.connectStranger.desc5').replace(/\n/g, '<br />') }} />
                        </div>
                    </div>

                </div>

                <div className="flex flex-col justify-start items-start lg:mt-20 mt-0">
                    <img src={connect2} alt="connect2" className="lg:h-100 md:h-60 h-30" />
                    <img src={connect1} alt="connect1" className="lg:h-70 md:h-30 h-20 -mt-[60px] lg:-ml-10 -ml-5" />
                </div>

            </div>
        </div>
    )
}

export default ConnectStranger