import { Button } from "@/components/ui/button"
import openoppurtunitiesbg from "../../../assets/openoppurtunitiesbg.avif"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const JoinOurStory = () => {
const { t } = useTranslation();
const navigate = useNavigate()
    return (
        <div className="relative w-full min-h-[400px] sm:min-h-[500px] flex items-center justify-center p-8">
            <img
                src={openoppurtunitiesbg}
                alt="openoppurtunitiesbg"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex flex-col justify-center items-center gap-6 max-w-4xl w-full translate-y-4">
                <h1 className="text-center bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE] text-3xl lg:text-5xl text-transparent bg-clip-text font-extrabold uppercase">
                    {t('joinOurStory.title')}
                </h1>
                <p className="text-center text-white text-sm md:text-base lg:text-xl max-w-2xl leading-relaxed italic font-medium" 
                   dangerouslySetInnerHTML={{ __html: t('joinOurStory.subtitle').replace(/\n/g, '<br />') }} 
                />
                <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4 sm:gap-6 w-full sm:w-auto">
                    <Button onClick={() => navigate('/open-oppurtunities')} className="hover:scale-105 transition-all duration-300 bg-white hover:bg-gray-100 text-[#03664F] font-bold rounded-full px-10 py-6 text-lg shadow-xl border-none">
                        {t('joinOurStory.startJourney')}
                    </Button>
                    <Button onClick={() => navigate('/contact')} variant={'ghost'} className="hover:scale-105 transition-all duration-300 hover:bg-white/10 text-white border-2 border-white rounded-full px-10 py-6 text-lg font-bold shadow-lg">
                        {t('joinOurStory.contactUs')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default JoinOurStory