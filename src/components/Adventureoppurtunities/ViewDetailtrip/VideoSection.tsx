import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";
import { useRef, useState, useEffect } from "react"
import { FaPause, FaPlay } from "react-icons/fa";

// Fallback video URL - using a sample nature/adventure video
const FALLBACK_VIDEO_URL = "https://res.cloudinary.com/dkkq2n15h/video/upload/v1770462860/6010648_Couple_Man_3840x2160_exvauy.mp4";

const VideoSection = ({ trip }: { trip: any }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [playing, setPlaying] = useState(false)
    const [videoError, setVideoError] = useState(false)
    const [currentVideoSrc, setCurrentVideoSrc] = useState<string>("")
    const [isUsingFallback, setIsUsingFallback] = useState(false)
    
    // Extract trip data - handle both direct trip object and nested structure
    const data = trip?.trip?.[0] || trip?.trip || trip;
    
    // Get video URL from trip data - check multiple possible fields
    const tripVideoUrl = data?.promotionalVideo || data?.promotional_video || data?.video || null;
    
    // Check if video URL is valid (not empty, not null, not undefined, is a string)
    const hasValidVideoUrl = tripVideoUrl && 
        typeof tripVideoUrl === 'string' && 
        tripVideoUrl.trim() !== '' && 
        tripVideoUrl !== 'null' && 
        tripVideoUrl !== 'undefined';
    
    useEffect(() => {
        // Reset states when trip data changes
        setVideoError(false);
        setIsUsingFallback(false);
        
        if (hasValidVideoUrl) {
            // Use API video if available
            setCurrentVideoSrc(tripVideoUrl);
        } else {
            // No video from API - use fallback immediately
            setCurrentVideoSrc(FALLBACK_VIDEO_URL);
            setIsUsingFallback(true);
        }
    }, [tripVideoUrl, hasValidVideoUrl]);
    
    const handleVideoError = () => {
        // If API video fails to load, switch to fallback
        if (!isUsingFallback && currentVideoSrc !== FALLBACK_VIDEO_URL) {
            setCurrentVideoSrc(FALLBACK_VIDEO_URL);
            setVideoError(true);
            setIsUsingFallback(true);
        }
    };
    
    const ToggleVideo = () => {
        if (videoRef?.current?.paused) {
            videoRef?.current?.play()
            setPlaying(true)
        } else {
            videoRef?.current?.pause();
            setPlaying(false)
        }
    }
    
    // Don't render if no video source available at all
    if (!currentVideoSrc) {
        return null;
    }
    
    return (
        <div className="flex flex-col lg:gap-6 gap-4 px-4 sm:px-16 py-6">
            <div className="relative w-full lg:h-screen">
                <video 
                    ref={videoRef} 
                    className="rounded-[15px] lg:h-screen w-full object-cover" 
                    src={currentVideoSrc}
                    onError={handleVideoError}
                    onLoadedData={() => setVideoError(false)}
                >
                    Your browser does not support the video tag.
                </video>
                {(videoError || isUsingFallback) && (
                    <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded z-10">
                        Showing sample video
                    </div>
                )}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF]/50 border border-[#FFFFFF] text-black text-xl font-bold px-6 py-6 rounded-full shadow-lg hover:bg-[#FFFFFF]/60 cursor-pointer"
                    onClick={ToggleVideo}>
                    {playing ? <FaPause color="#FFFFFF" /> : <FaPlay color="#FFFFFF" />}
                </div>
            </div>
            <div className="lg:w-full">
                <Alert className="flex gap-3 items-center bg-[#DDFCE8] border border-[#00C951] px-4 py-5">
                    <div className="bg-[#00C951] px-4 py-4 rounded-full">
                        <Check className="text-[#FFFFFF]"/>                    
                    </div>
                    <div className="flex flex-col gap-1">
                        <AlertTitle className="text-[#016630] font-bold">This is the best price guaranteed!</AlertTitle>
                        <AlertDescription className="text-[#00C951] font-medium text-[10px]">
                            <span>{data?.bestPriceMsg || "We monitor prices across the market to ensure you get the best deal"}</span>
                        </AlertDescription>
                    </div>
                </Alert>
            </div>
        </div>
    )
}

export default VideoSection