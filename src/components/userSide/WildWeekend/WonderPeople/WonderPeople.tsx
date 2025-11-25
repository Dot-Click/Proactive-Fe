import { useRef, useState } from "react"
import WonderPeoplebg from "../../../../assets/WonderPeoplebg.png"
import WonderPeopleVideo from "../../../../assets/WonderPeopleVideo.png"
import { FaPause, FaPlay } from "react-icons/fa";
const WonderPeople = () => {
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const ToggleVideo = () => {
        if (videoRef?.current?.paused) {
            videoRef?.current?.play()
            setPlaying(true)
        } else {
            videoRef?.current?.pause();
            setPlaying(false)
        }
    }

    return (
        <>
            <div className="relative">
                <img src={WonderPeoplebg} alt="WonderPeoplebg" className="lg:h-screen md: h-100 w-full" />
                <div className="bg-black absolute inset-0 opacity-60 lg:h-screen" ></div>
                <div className="flex flex-col justify-center items-center lg:gap-12 gap-6 absolute inset-0 lg:mt-12 py-8 px-4">
                    <h1 className="text-center text-[#FFFFFF] lg:text-3xl text-[14px] font-bold tracking-wide">Las personas maravillosas que lo han experimentado te lo cuentan.</h1>
                    <img src={WonderPeopleVideo} alt="WonderPeopleVideo" className="lg:w-220 h-full object-cover rounded-2xl" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 lg:translate-y-1/2 bg-[#FC1616]/50 text-black text-xl font-bold px-6 py-6 rounded-full shadow-lg hover:bg-[#FC1616]/60 cursor-pointer"
                    onClick={ToggleVideo}>
                    {playing ? <FaPause color="#FFFFFF" /> : <FaPlay color="#FFFFFF" />}
                </div>
            </div>
        </>
    )
}

export default WonderPeople