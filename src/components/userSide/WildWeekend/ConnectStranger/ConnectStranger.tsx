import setting from "../../../../assets/setting.png"
import connect1 from "../../../../assets/connect1.png"
import connect2 from "../../../../assets/connect2.png"
import { useTranslation } from "react-i18next";

const ConnectStranger = () => {
    const { t } = useTranslation();

    const sections = [1, 2, 3, 4, 5];

    return (
        <section className="relative bg-black min-h-screen flex flex-col justify-center py-20 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

                    {/* Text Content Area */}
                    <div className="flex flex-col gap-10 lg:gap-12 w-full lg:w-1/2 max-w-2xl text-left">
                        {sections.map((num) => (
                            <div key={num} className="flex gap-4 lg:gap-6 group">
                                <div className="flex-shrink-0 pt-1.5 ">
                                    <img
                                        src={setting}
                                        alt="setting"
                                        className="h-4 w-4 lg:h-5 lg:w-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 2xl:gap-3">
                                    <h4 className="text-white font-bold text-xl lg:text-2xl tracking-tight leading-tight">
                                        {t(`wildWeekend.connectStranger.title${num}`)}
                                    </h4>
                                    <div className="text-[#BCBCBC] text-sm lg:text-base leading-relaxed opacity-90">
                                        {t(`wildWeekend.connectStranger.desc${num}`).split('\n').map((paragraph: string, index: number) => (
                                            paragraph.trim() && (
                                                <p key={index} className="mb-3 last:mb-0">
                                                    {paragraph.trim()}
                                                </p>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image Area */}
                    <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-10 duration-1000">
                        <div className="relative">
                            <img
                                src={connect2}
                                alt="connect2"
                                className="w-[300px] md:w-[450px] lg:w-[500px] xl:w-[600px] h-auto object-cover rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-10 -left-10 lg:-left-20 animate-bounce-subtle">
                                <img
                                    src={connect1}
                                    alt="connect1"
                                    className="w-[150px] md:w-[250px] lg:w-[300px] h-auto object-contain drop-shadow-2xl border-4 border-black rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Background decorative elements if needed */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#565070]/20 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#221E33]/30 to-transparent blur-3xl pointer-events-none" />
        </section>
    );
};

export default ConnectStranger