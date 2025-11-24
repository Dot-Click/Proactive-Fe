import { useRef, useState } from "react"
import Explore1 from "../../../../assets/Explore1.png"
import Explore2 from "../../../../assets/Explore2.png"
import { FaPause, FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Explorecard = () => {
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
    <div className="flex flex-col gap-4 px-4">

      <div className="relative w-full max-w-[960px] mx-auto">
        <img src={Explore1} alt="Explore1" className="w-full lg:h-auto h-100 block rounded-lg object-cover" />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FC1616]/50 text-white text-2xl font-bold lg:px-6 lg:py-6 px-2 py-2 rounded-full shadow-lg hover:bg-[#FC1616]/60 cursor-pointer z-10"
          onClick={ToggleVideo}
        >
          {playing ? <FaPause /> : <FaPlay className="lg:h-8 h-4"/>}
        </div>

        <div className="absolute lg:bottom-6 bottom-2 left-4 right-4 flex lg:flex-row flex-col justify-between items-center z-10">
          <div className="flex flex-col justify-center items-start gap-2">
            <Button className="bg-[#FBF2DB] text-[#845111] font-bold hover:bg-[#eee3c6] cursor-pointer ">Wild Weekend Asturias</Button>
            <p className="text-white font-bold lg:text-2xl ">Adventure and good vibes</p>
          </div>
          <Button className="bg-[#0DAC87] hover:bg-[#0f9e7d] cursor-pointer text-white rounded-full lg:px-8 lg:py-5">More Info</Button>
        </div>

      </div>

      <div className="relative w-full max-w-[960px] mx-auto">
        <img src={Explore2} alt="Explore2" className="w-full h-auto block rounded-lg" />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FC1616]/50 text-white text-2xl font-bold lg:px-6 lg:py-6 px-2 py-2 rounded-full shadow-lg hover:bg-[#FC1616]/60 cursor-pointer z-10"
          onClick={ToggleVideo}
        >
          {playing ? <FaPause /> : <FaPlay className="lg:h-8 h-4"/>}
        </div>

        <div className="absolute lg:bottom-6 bottom-2 left-4 right-4 flex justify-between items-center z-10">
          <div className="flex flex-col justify-center items-start gap-2">
            <Button className="bg-[#FBF2DB] text-[#845111] font-bold hover:bg-[#eee3c6] cursor-pointer ">Wild Weekend Asturias</Button>
            <p className="text-white font-bold lg:text-2xl ">Adventure and good vibes</p>
          </div>
          <Button className="bg-[#0DAC87] hover:bg-[#0f9e7d] cursor-pointer text-white rounded-full lg:px-8 lg:py-5">More Info</Button>
        </div>

      </div>

    </div>
  )
}

export default Explorecard