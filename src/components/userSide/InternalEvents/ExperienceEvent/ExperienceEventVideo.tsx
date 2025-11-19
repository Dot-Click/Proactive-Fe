import { useRef, useState } from "react"
import ExperienceVideo from "../../../../assets/ExperienceVideo.png"
import { FaPause, FaPlay } from "react-icons/fa";

const ExperienceEventVideo = () => {
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
        <div className="flex flex-col justify-center items-center lg:gap-12 gap-6 py-12 px-4">
          <img src={ExperienceVideo} alt="ExperienceVideo" className="lg:w-220 h-full object-cover rounded-2xl" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2  bg-[#FC1616]/50 text-black text-xl font-bold px-6 py-6 rounded-full shadow-lg hover:bg-[#FC1616]/60 cursor-pointer"
          onClick={ToggleVideo}>
          {playing ? <FaPause color="#FFFFFF" /> : <FaPlay color="#FFFFFF" />}
        </div>
      </div>
    </>
  )
}

export default ExperienceEventVideo