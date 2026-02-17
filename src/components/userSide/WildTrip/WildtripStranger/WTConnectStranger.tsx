import setting from "../../../../assets/setting.png"
import WT1 from "../../../../assets/WT1.png"
import WT2 from "../../../../assets/WT2.png"
import { useTranslation } from "react-i18next"

const WTConnectStranger = () => {
    const { t } = useTranslation();

    const sections = [1, 2, 3, 4, 5];

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32">

                    {/* Image Area */}
                    <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <div className="relative">
                            <img
                                src={WT1}
                                alt="Wild Trip 1"
                                className="w-[300px] md:w-[400px] lg:w-[450px] h-auto object-cover rounded-2xl shadow-xl"
                            />
                            <div className="absolute -bottom-8 -right-8 lg:-right-16 drop-shadow-2xl">
                                <img
                                    src={WT2}
                                    alt="Wild Trip 2"
                                    className="w-[150px] md:w-[200px] lg:w-[250px] h-auto object-contain border-4 border-white rounded-xl shadow-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Content Area */}
                    <div className="flex flex-col gap-8 lg:gap-10 w-full lg:w-1/2 max-w-2xl">
                        {sections.map((num) => (
                            <div key={num} className="flex gap-4 group">
                                <div className="flex-shrink-0 pt-1">
                                    <img
                                        src={setting}
                                        alt="setting"
                                        className="h-4 w-4 lg:h-5 lg:w-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h4 className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl lg:text-2xl tracking-tight">
                                        {t(`wildWeekend.connectStranger.title${num}`)}
                                    </h4>
                                    <div className="text-[#221E33]/80 text-sm lg:text-base leading-relaxed">
                                        {t(`wildWeekend.connectStranger.desc${num}`).split('\n').map((paragraph: string, index: number) => (
                                            paragraph.trim() && (
                                                <p key={index} className="mb-2 last:mb-0">
                                                    {paragraph.trim()}
                                                </p>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WTConnectStranger