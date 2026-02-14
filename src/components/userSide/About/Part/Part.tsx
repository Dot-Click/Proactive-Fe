import setting from "../../../../assets/setting.png"
import AboutPart1 from "../../../../assets/AboutPart1.png"
import AboutPart2 from "../../../../assets/AboutPart2.png"
import box1 from "../../../../assets/box.png"
import { useTranslation } from "react-i18next"

const Part = () => {
    const { t } = useTranslation();
    return (
        <div className="relative bg-[#F0F5FD]/28 px-4 sm:px-6 lg:px-12">
            <div className="relative max-w-7xl mx-auto">
                <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                  font-bold lg:text-4xl relative z-10 text-center lg:py-20 py-10 tracking-wider">
                    {t('about.part.title')}
                </h1>
                <img
                    src={box1}
                    alt="box1"
                    className="w-22 h-26 absolute top-10 left-122 -translate-x-1/2  opacity-80 lg:flex hidden"
                />
            </div>
            <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-30 gap-10 lg:py-10 py-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:gap-8 gap-6 px-4 sm:px-6 lg:px-8 max-w-2xl">
                    <div className="flex gap-3 lg:gap-4">
                        <img src={setting} alt="setting" className="h-4 mt-2 flex-shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl mb-1" dangerouslySetInnerHTML={{ __html: t('about.part.motivatedGroup.title').replace(/\n/g, '<br />') }} />
                            <div className="text-[#221E33] text-[12px] lg:text-[14px] leading-relaxed lg:leading-loose space-y-2">
                                {t('about.part.motivatedGroup.description').split('\n').map((para: string, i: number) => para.trim() && <p key={i} className="mb-2 last:mb-0">{para.trim()}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 lg:gap-4">
                        <img src={setting} alt="setting" className="h-4 mt-2 flex-shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl mb-1">{t('about.part.priorityYouth.title')}</h4>
                            <div className="text-[#221E33] text-[12px] lg:text-[14px] leading-relaxed lg:leading-loose space-y-2">
                                {t('about.part.priorityYouth.description').split('\n').map((para: string, i: number) => para.trim() && <p key={i} className="mb-2 last:mb-0">{para.trim()}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 lg:gap-4">
                        <img src={setting} alt="setting" className="h-4 mt-2 flex-shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl mb-1">{t('about.part.creatingTeam.title')}</h4>
                            <div className="text-[#221E33] text-[12px] lg:text-[14px] leading-relaxed lg:leading-loose space-y-2">
                                {t('about.part.creatingTeam.description').split('\n').map((para: string, i: number) => para.trim() && <p key={i} className="mb-2 last:mb-0">{para.trim()}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 lg:gap-4">
                        <img src={setting} alt="setting" className="h-4 mt-2 flex-shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl mb-1" dangerouslySetInnerHTML={{ __html: t('about.part.makeDifference.title').replace(/\n/g, '<br />') }} />
                            <div className="text-[#221E33] text-[12px] lg:text-[14px] leading-relaxed lg:leading-loose space-y-2">
                                {t('about.part.makeDifference.description').split('\n').map((para: string, i: number) => para.trim() && <p key={i} className="mb-2 last:mb-0">{para.trim()}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 lg:gap-4">
                        <img src={setting} alt="setting" className="h-4 mt-2 flex-shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl mb-1">{t('about.part.benefitsDaily.title')}</h4>
                            <div className="text-[#221E33] text-[12px] lg:text-[14px] leading-relaxed lg:leading-loose space-y-2">
                                {t('about.part.benefitsDaily.description').split('\n').map((para: string, i: number) => para.trim() && <p key={i} className="mb-2 last:mb-0">{para.trim()}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 lg:gap-4">
                        <img src={setting} alt="setting" className="h-4 mt-2 flex-shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl mb-1" dangerouslySetInnerHTML={{ __html: t('about.part.continuousTraining.title').replace(/\n/g, '<br />') }} />
                            <div className="text-[#221E33] text-[12px] lg:text-[14px] leading-relaxed lg:leading-loose space-y-2">
                                {t('about.part.continuousTraining.description').split('\n').map((para: string, i: number) => para.trim() && <p key={i} className="mb-2 last:mb-0">{para.trim()}</p>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start">
                    <img src={AboutPart1} alt="AboutPart1" className="lg:h-100 h-50" />
                    <img src={AboutPart2} alt="AboutPart2" className="lg:h-70 h-30 -mt-[60px] -ml-6" />
                </div>
            </div>
        </div>
    )
}

export default Part