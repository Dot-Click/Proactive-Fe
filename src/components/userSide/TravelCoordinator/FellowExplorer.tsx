import FellowExplorerImg from "../../../assets/FellowExplorer.png"
import box2 from "../../../assets/box2.png"
import Fellowexplorer1 from "../../../assets/Fellowexplorer1.png"
import Fellowexplorer2 from "../../../assets/Fellowexplorer2.png"
import Fellowexplorer3 from "../../../assets/Fellowexplorer3.png"
import Fellowexplorer4 from "../../../assets/Fellowexplorer4.png"
import { useTranslation } from "react-i18next"
import { useRef, useState } from "react"
import { Globe, MapPin } from "lucide-react"
import { FaPlay } from "react-icons/fa"

const FELLOW_EXPLORER_VIDEO = "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462860/6010648_Couple_Man_3840x2160_exvauy.mp4"
const FALLBACK_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

const FellowExplorer = () => {
    const { t } = useTranslation();
    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoError, setVideoError] = useState(false)
    const [hovering, setHovering] = useState(false)
    const videoSrc = videoError ? FALLBACK_VIDEO : FELLOW_EXPLORER_VIDEO

    const handleMouseEnter = () => {
        setHovering(true)
        videoRef.current?.play().catch(() => {})
    }
    const handleMouseLeave = () => {
        setHovering(false)
        videoRef.current?.pause()
        if (videoRef.current) videoRef.current.currentTime = 0
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-16 gap-12 lg:py-60 md:py-12 lg:mb-0 mb-20">
                <div
                    className="relative overflow-hidden w-full max-w-[280px] lg:max-w-[360px] aspect-[9/16] flex-shrink-0"
                style={{ borderRadius: "1.5rem 2.5rem 1.5rem 1.5rem" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-full object-cover pointer-events-none"
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    controlsList="nofullscreen nodownload noremoteplayback"
                    onError={() => setVideoError(true)}
                    poster={FellowExplorerImg}
                />
                {!hovering && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/40 rounded-full p-4">
                            <FaPlay className="text-white text-2xl" />
                        </div>
                    </div>
                )}
                {/* Globe overlay - bottom right */}
                <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-teal-50/95 border-2 border-dashed border-teal-200 flex items-center justify-center">
                    <div className="relative">
                        <Globe className="w-10 h-10 text-teal-800" strokeWidth={1.5} />
                        <MapPin className="absolute -top-1 -right-1 w-4 h-4 text-teal-500" fill="currentColor" />
                        <MapPin className="absolute top-2 -left-2 w-3 h-3 text-teal-600" fill="currentColor" />
                        <MapPin className="absolute -bottom-1 right-2 w-3 h-3 text-teal-500" fill="currentColor" />
                    </div>
                </div>
            </div>
                <div className="flex flex-col gap-8 lg:max-w-xl w-full">
                <div className="relative">
                    <h1 className="text-center lg:text-start lg:mt-10 bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                                  font-bold lg:text-4xl relative z-10" dangerouslySetInnerHTML={{ __html: t('travelCoordinator.fellowExplorer.title').replace(/\n/g, '<br />') }} />
                    <img
                        src={box2}
                        alt="box2"
                        className="w-30 h-30 absolute top-2 -left-8  opacity-80 lg:flex hidden"
                    />
                </div>

                <div className="flex justify-center flex-col gap-8 px-4">
                    <div className="flex flex-col lg:flex-row lg:items-start items-center gap-4">
                        <img src={Fellowexplorer1} alt="Fellowexplorer1" className="h-6" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center lg:text-start">{t('travelCoordinator.fellowExplorer.passionateTravelers')}</h1>
                            <p className="text-center lg:text-start" dangerouslySetInnerHTML={{ __html: t('travelCoordinator.fellowExplorer.passionateTravelersDesc').replace(/\n/g, '<br className="md:flex hidden" />') }} />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-start items-center gap-4">
                        <img src={Fellowexplorer2} alt="Fellowexplorer2" className="h-6" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center lg:text-start">{t('travelCoordinator.fellowExplorer.passionateTravelers')}</h1>
                            <p className="text-center lg:text-start" dangerouslySetInnerHTML={{ __html: t('travelCoordinator.fellowExplorer.passionateTravelersDesc').replace(/\n/g, '<br className="md:flex hidden" />') }} />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-start items-center gap-4">
                        <img src={Fellowexplorer3} alt="Fellowexplorer3" className="h-6" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center lg:text-start">{t('travelCoordinator.fellowExplorer.passionateTravelers')}</h1>
                            <p className="text-center lg:text-start" dangerouslySetInnerHTML={{ __html: t('travelCoordinator.fellowExplorer.passionateTravelersDesc').replace(/\n/g, '<br className="md:flex hidden" />') }} />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-start items-center gap-4">
                        <img src={Fellowexplorer4} alt="Fellowexplorer4" className="h-6" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center lg:text-start">{t('travelCoordinator.fellowExplorer.passionateTravelers')}</h1>
                            <p className="text-center lg:text-start" dangerouslySetInnerHTML={{ __html: t('travelCoordinator.fellowExplorer.passionateTravelersDesc').replace(/\n/g, '<br className="md:flex hidden" />') }} />
                        </div>
                    </div>
                    <div
                        className="lg:flex hidden absolute left-280 -translate-y-1/2 -translate-x-1/3 w-60 h-80 bg-[radial-gradient(circle_at_50%_50%,#76F0D4,rgba(250,250,250,0.05))] rounded-full blur-3xl opacity-30">
                    </div>
                </div>

                </div>
            </div>
        </div>
    )
}

export default FellowExplorer