import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";
import { useRef, useState } from "react"
import { FaPause, FaPlay } from "react-icons/fa";

const VideoSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [playing, setPlaying] = useState(false)

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
        <div className="flex flex-col gap-6 px-4 sm:px-16 py-6">
            <div className="relative w-full h-screen">
                <video ref={videoRef} className="rounded-[15px] h-screen" src="https://www.pexels.com/download/video/2256158/">
                </video>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF]/50 border border-[#FFFFFF] text-black text-xl font-bold px-6 py-6 rounded-full shadow-lg hover:bg-[#FFFFFF]/60 cursor-pointer"
                    onClick={ToggleVideo}>
                    {playing ? <FaPause color="#FFFFFF" /> : <FaPlay color="#FFFFFF" />}
                </div>
            </div>
            <div className="w-full">
                <Alert className="flex gap-3 items-center bg-[#DDFCE8] border border-[#00C951] px-4 py-5">
                    <div className="bg-[#00C951] px-4 py-4 rounded-full">
                        <Check className="text-[#FFFFFF]"/>                    
                    </div>
                    <div className="flex flex-col gap-1">
                        <AlertTitle className="text-[#016630] font-bold">This is the best price guaranteed!</AlertTitle>
                        <AlertDescription className="text-[#00C951] font-medium text-[10px]">
                            <span>We monitor prices across the market to ensure you get the best deal</span>
                        </AlertDescription>
                    </div>
                </Alert>
            </div>
        </div>
    )
}

export default VideoSection