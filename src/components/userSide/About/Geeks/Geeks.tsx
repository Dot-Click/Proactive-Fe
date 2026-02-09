import { useTranslation } from "react-i18next"

const Geeks = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-[#EDE8F3]">
            <div className="flex lg:flex-row flex-col lg:gap-40 gap-10 justify-center items-center py-20">
                <div className="flex flex-col gap-6">
                    <h1 className="text-[#221E33] font-bold text-4xl">{t('about.geeks.title')}</h1>
                    <div className="flex flex-col gap-6">
                            <p className="text-[#221E33] text-[12px]" dangerouslySetInnerHTML={{ __html: t('about.geeks.desc1').replace(/\n/g, '<br />') }} />
                            <p className="text-[#221E33] text-[12px]" dangerouslySetInnerHTML={{ __html: t('about.geeks.desc2').replace(/\n/g, '<br />') }} />
                            <p className="text-[#221E33] text-[12px]" dangerouslySetInnerHTML={{ __html: t('about.geeks.desc3').replace(/\n/g, '<br />') }} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#0DAC87] rounded-full" />
                        <p className="text-[#221E33]">{t('about.geeks.year0')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#0DAC87] rounded-full" />
                        <p className="text-[#221E33]">{t('about.geeks.year2')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#0DAC87] rounded-full" />
                        <p className="text-[#221E33]">{t('about.geeks.year3')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#0DAC87] rounded-full" />
                        <p className="text-[#221E33]">{t('about.geeks.year4')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#0DAC87] rounded-full" />
                        <p className="text-[#221E33]">{t('about.geeks.year5')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#0DAC87] rounded-full" />
                        <p className="text-[#221E33]">{t('about.geeks.year6')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#0DAC87] rounded-full" />
                        <p className="text-[#221E33]">{t('about.geeks.year7')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Geeks