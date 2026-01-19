import AchievementExplorer from "../../../assets/Achievementsexplorer.png"
import ShadowMountain from "../../../assets/ShadowMountain.png"
import Nature from "../../../assets/AchievementNatural.png"
import { Progress } from "@/components/ui/progress"
import { UsegetallAchievementsForUser } from "@/hooks/getallAchievementhook"

const Achievement = () =>
{
    const { data, isLoading, isError } = UsegetallAchievementsForUser();
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error loading achievements</div>
    }
    
    // Extract badge progress from API response
    const badgeProgress = data?.data?.badgeProgress || {};
    
    // Define badge configuration mapping
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
            textClass: "mt-2"
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
            textClass: "mt-5"
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
            textClass: "mt-6"
        }
    ];
    
    // Convert hex to rgba for background opacity
    const getBgColor = (hex: string, opacity: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };
    
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
            <div className="border border-[#D9D9D9] bg-[#FAFAFA] rounded-[20px] flex flex-col ">
                <div className="px-4 py-3">
                    <span className="font-bold text-[18px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Achievements</span>
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
                                <div 
                                    key={badge.name}
                                    className={`rounded-[15px] ${badge.containerClass} flex flex-col justify-between h-full`}
                                    style={{
                                        borderColor: badge.borderColor,
                                        backgroundColor: getBgColor(badge.borderColor, bgOpacity),
                                        borderWidth: '1px'
                                    }}
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Achievement