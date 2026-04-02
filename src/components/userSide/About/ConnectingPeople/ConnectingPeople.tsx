import connectingPeople from "../../../../assets/ConnectingPeople.avif"
import box2 from "../../../../assets/box2.avif"
import { useTranslation } from "react-i18next"

const ConnectingPeople = () => {
    const { t } = useTranslation();
    return (
    <div className="relative w-full min-h-[400px] lg:h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
            src={connectingPeople} 
            alt="connectingPeople" 
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 py-12 px-4 max-w-4xl mx-auto">
            <div className="relative">
                <h1 className="text-center text-[#F7EBBE] font-bold text-2xl lg:text-4xl tracking-wider">
                    {t('about.connectingPeople.title')}
                </h1>
                <img
                    src={box2}
                    alt="box2"
                    className="w-25 h-25 absolute -top-7 left-120 opacity-20 lg:flex hidden"
                />
            </div>
            <p className="text-center text-[#FFFFFF] text-sm lg:text-base leading-relaxed" 
               dangerouslySetInnerHTML={{ __html: t('about.connectingPeople.description').replace(/\n/g, '<br class="hidden md:block" />') }} 
            />
        </div>
    </div>
    )
}

export default ConnectingPeople
