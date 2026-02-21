import AchievementExplorer from "../../../assets/Achievementsexplorer.png"
import ShadowMountain from "../../../assets/ShadowMountain.png"
import Nature from "../../../assets/AchievementNatural.png"
import { Progress } from "@/components/ui/progress"
import { UsegetallAchievementsForUser } from "@/hooks/getallAchievementhook"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
// import { X } from "lucide-react"

const Achievement = () =>
{
    const { data, isLoading, isError } = UsegetallAchievementsForUser();
    const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);
    const [allOpen, setAllOpen] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error loading achievements</div>
    }
    
    // Extract badge progress from API response
    const badgeProgress = data?.data?.badgeProgress || {};
    
    // Define badge configuration mapping with descriptions
    const badgeConfig = [
        {
            name: "Mountain Climber",
            image: ShadowMountain,
            imageAlt: "ShadowMountain",
            imageClass: "w-16 h-20",
            borderColor: "#0DAC87",
            bgColor: "#0DAC87/5",
            progressColor: "#0DAC87",
            containerClass: "py-2 px-3",
            contentClass: "-mt-[16px]",
            textClass: "mt-2",
            description: "Complete mountain climbing adventures and reach new heights! This achievement is unlocked by participating in mountain-related trips and outdoor climbing activities.",
            howToGet: [
                "Join mountain climbing trips",
                "Complete at least 3 mountain adventures",
                "Reach elevation milestones during trips"
            ]
        },
        {
            name: "Culture Explorer",
            image: AchievementExplorer,
            imageAlt: "AchievementExplorer",
            imageClass: "w-16 h-16",
            borderColor: "#DDAC24",
            bgColor: "#DDAC24/5",
            progressColor: "#DDAC24",
            containerClass: "py-4 px-4",
            contentClass: "-mt-[26px]",
            textClass: "mt-5",
            description: "Discover new cultures and explore diverse destinations! This achievement rewards your curiosity and passion for cultural experiences.",
            howToGet: [
                "Visit different countries and cities",
                "Participate in cultural tours and activities",
                "Complete trips in at least 5 different cultural destinations"
            ]
        },
        {
            name: "Nature Lover",
            image: Nature,
            imageAlt: "Nature",
            imageClass: "w-16 h-16",
            borderColor: "#A04CD9",
            bgColor: "#A04CD9/10",
            progressColor: "#A04CD9",
            containerClass: "py-4 px-3",
            contentClass: "-mt-[28px]",
            textClass: "mt-6",
            description: "Connect with nature and explore the great outdoors! This achievement celebrates your love for natural environments and wildlife.",
            howToGet: [
                "Join nature-focused adventures",
                "Complete outdoor activities and hikes",
                "Participate in eco-friendly trips"
            ]
        }
    ];
    
    // Convert hex to rgba for background opacity
    const getBgColor = (hex: string, opacity: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };
    
    const AllAchievementsDialog = () => (
        <Dialog open={allOpen} onOpenChange={(open) => setAllOpen(open)}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">All Achievements</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="grid gap-4">
                        {badgeConfig.map((badge) => {
                            const progress = badgeProgress[badge.name] || { percentage: 0, unlocked: false };
                            const percentage = Math.round(progress.percentage || 0);
                            return (
                                <div key={badge.name} className="p-4 rounded-lg border" style={{ borderColor: badge.borderColor }}>
                                    <div className="flex items-center gap-4">
                                        <img src={badge.image} alt={badge.imageAlt} className={badge.imageClass} />
                                        <div>
                                            <h3 className="font-semibold text-lg">{badge.name} — {percentage}%</h3>
                                            <p className="text-sm text-[#666373] mt-1">{badge.description}</p>
                                            <div className="mt-2">
                                                <h4 className="font-semibold">How to get:</h4>
                                                <ul className="list-disc list-inside text-sm text-[#666373] mt-1">
                                                    {badge.howToGet.map((it, i) => <li key={i}>{it}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );

    return (
        <>
            <style>{`
                [data-progress-id="mountain"] [data-slot="progress-indicator"] {
                    background-color: #0DAC87 !important;
                }
                [data-progress-id="culture"] [data-slot="progress-indicator"] {
                    background-color: #DDAC24 !important;
                }
                [data-progress-id="nature"] [data-slot="progress-indicator"] {
                    background-color: #A04CD9 !important;
                }
            `}</style>
            <AllAchievementsDialog />
            <div className="border border-[#D9D9D9] bg-[#FAFAFA] rounded-[20px] flex flex-col ">
                <div className="px-4 py-3">
                    <span className="font-bold text-[18px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Achievements</span>
                    <div className="float-right">
                        <button onClick={() => setAllOpen(true)} className="bg-[#0DAC87] text-white px-3 py-1 rounded-full">View All</button>
                    </div>
                    <div className="mt-6 grid lg:grid-cols-1 gap-3">
                        {badgeConfig.map((badge) => {
                            const progress = badgeProgress[badge.name] || {
                                percentage: 0,
                                unlocked: false
                            };
                            const percentage = Math.round(progress.percentage || 0);
                            
                            const bgOpacity = badge.name === "Nature Lover" ? 0.1 : 0.05;
                            const progressId = 
                                badge.name === "Mountain Climber" ? "mountain" :
                                badge.name === "Culture Explorer" ? "culture" :
                                "nature";
                            
                            return (
                                <Dialog key={badge.name} open={selectedAchievement === badge.name} onOpenChange={(open) => !open && setSelectedAchievement(null)}>
                                    <DialogTrigger asChild>
                                        <div 
                                            className={`rounded-[15px] ${badge.containerClass} flex flex-col justify-between h-full cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]`}
                                            style={{
                                                borderColor: badge.borderColor,
                                                backgroundColor: getBgColor(badge.borderColor, bgOpacity),
                                                borderWidth: '1px'
                                            }}
                                            onClick={() => setSelectedAchievement(badge.name)}
                                        >
                                            <div className={`flex items-center gap-2 ${badge.contentClass}`}>
                                                <img 
                                                    src={badge.image} 
                                                    alt={badge.imageAlt} 
                                                    className={badge.imageClass} 
                                                />
                                                <div className={`flex flex-col ${badge.textClass}`}>
                                                    <p className="text-[#221E33] text-md font-medium mb-0">{badge.name}</p>
                                                    <p className="text-[10px] text-[#666373] whitespace-nowrap mt-1">{percentage}% Completed</p>
                                                    <div 
                                                        data-progress-id={progressId}
                                                        className="h-[6px] lg:w-45 mt-1"
                                                    >
                                                        <Progress 
                                                            value={percentage} 
                                                            className="h-[6px] border bg-transparent"
                                                            style={{
                                                                borderColor: badge.progressColor
                                                            } as React.CSSProperties}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md">
                                        <DialogHeader>
                                            <div className="flex items-center gap-4 mb-4">
                                                <img 
                                                    src={badge.image} 
                                                    alt={badge.imageAlt} 
                                                    className={badge.imageClass} 
                                                />
                                                <DialogTitle className="text-2xl font-bold text-[#221E33]">
                                                    {badge.name}
                                                </DialogTitle>
                                            </div>
                                            <div className="mb-2">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm font-semibold text-[#666373]">Progress:</span>
                                                    <span className="text-sm font-bold text-[#221E33]">{percentage}%</span>
                                                </div>
                                                <div 
                                                    data-progress-id={progressId}
                                                    className="h-[8px] w-full"
                                                >
                                                    <Progress 
                                                        value={percentage} 
                                                        className="h-[8px] border bg-transparent"
                                                        style={{
                                                            borderColor: badge.progressColor
                                                        } as React.CSSProperties}
                                                    />
                                                </div>
                                                {progress.unlocked && (
                                                    <div className="mt-2 text-sm font-semibold text-[#0DAC87]">
                                                        ✓ Achievement Unlocked!
                                                    </div>
                                                )}
                                            </div>
                                        </DialogHeader>
                                        <DialogDescription className="text-left space-y-4">
                                            <div>
                                                <h3 className="font-semibold text-[#221E33] mb-2">Description</h3>
                                                <p className="text-[#666373] text-sm leading-relaxed">
                                                    {badge.description}
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-[#221E33] mb-2">How to Get This Achievement</h3>
                                                <ul className="list-disc list-inside space-y-1 text-[#666373] text-sm">
                                                    {badge.howToGet.map((item, idx) => (
                                                        <li key={idx}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </DialogDescription>
                                    </DialogContent>
                                </Dialog>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Achievement