import { useRef, useState } from "react"
import WonderPeoplebg from "../../../../assets/WonderPeoplebg.png"
import { FaPause, FaPlay } from "react-icons/fa";
import Youtube1 from "../../../../assets/Youtube1.png"
import Youtube2 from "../../../../assets/Youtube2.png"
const Aboutvideo = () => {
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
                <img src={WonderPeoplebg} alt="WonderPeoplebg" className="lg:h-screen h-100 w-full" />
                <div className="bg-black absolute inset-0 opacity-60 lg:h-screen" ></div>
                <div className="flex flex-col justify-center items-center lg:h-180 lg:gap-16 gap-6 absolute inset-0 px-4">
                    <h1 className="text-center bg-linear-to-r from-[#FFFFFF] to-[#E3E3E3]  text-transparent bg-clip-text font-bold lg:text-4xl">We are all part of a large and <br className="lg:flex hidden"/> vibrant community</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                            <img src={Youtube1} alt="Youtube1" className="lg:w-100 object-cover rounded-2xl" />
                            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 lg:translate-y-1/2 bg-[#FC1616]/50 text-black text-xl font-bold px-6 py-6 rounded-full shadow-lg hover:bg-[#FC1616]/60 cursor-pointer"
                                onClick={ToggleVideo}>
                                {playing ? <FaPause color="#FFFFFF" /> : <FaPlay color="#FFFFFF" />}
                            </div>
                        </div>
                        <div className="relative">
                            <img src={Youtube2} alt="Youtube2" className="lg:w-100 object-cover rounded-2xl" />
                            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 lg:translate-y-1/2 bg-[#FC1616]/50 text-black text-xl font-bold px-6 py-6 rounded-full shadow-lg hover:bg-[#FC1616]/60 cursor-pointer"
                                onClick={ToggleVideo}>
                                {playing ? <FaPause color="#FFFFFF" /> : <FaPlay color="#FFFFFF" />}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 lg:translate-y-1/2 bg-[#FC1616]/50 text-black text-xl font-bold px-6 py-6 rounded-full shadow-lg hover:bg-[#FC1616]/60 cursor-pointer"
                    onClick={ToggleVideo}>
                    {playing ? <FaPause color="#FFFFFF" /> : <FaPlay color="#FFFFFF" />}
                </div> */}
            </div>
        </>
    )
}

export default Aboutvideo