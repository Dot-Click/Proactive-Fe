import connectingPeople from "../../../../assets/ConnectingPeople.png"
import box2 from "../../../../assets/box2.png"
import { useTranslation } from "react-i18next"

const ConnectingPeople = () => {
    const { t } = useTranslation();
    return (
        <div className="relative">
            <img src={connectingPeople} alt="connectingPeople" />
            <div className="flex flex-col lg:justify-end h-130 lg:gap-12 gap-4 absolute inset-0 lg:py-0 py-6 px-2">
                <div className="relative">
                    <h1 className="text-center text-[#F7EBBE] 
      font-bold lg:text-4xl relative z-10 tracking-wider">
                        {t('about.connectingPeople.title')}
                    </h1>
                    <img
                        src={box2}
                        alt="box2"
                        className="w-25 h-25 absolute -top-7 left-120  opacity-20 lg:flex hidden"
                    />
                </div>
                <p className="text-center text-[#FFFFFF] lg:text-[14px] text-[10px]" dangerouslySetInnerHTML={{ __html: t('about.connectingPeople.description').replace(/\n/g, '<br className="lg:flex hidden" />') }} />
            </div>
        </div>
    )
}

export default ConnectingPeople
