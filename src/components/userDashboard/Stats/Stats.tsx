import userstats1 from "../../../assets/userstats1.png"
import userstats2 from "../../../assets/userstats2.png"
import userstats3 from "../../../assets/userstats3.png"
// import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook"
import { UsegetPayment } from "@/hooks/getPaymenthook"
import { UsegetallAchievementsForUser } from "@/hooks/getallAchievementhook"
import { useMemo } from "react"

const Stats = () => {
    // const /{ data: userData } = UsegetCurrentUser();
    const { data: paymentData } = UsegetPayment();
    const { data: achievementsData } = UsegetallAchievementsForUser();
    
    // Calculate stats from user data - all start at 0
    const stats = useMemo(() => {
        // Get paid trips (completed or upcoming)
        const tripPayments = paymentData?.tripPayments || [];
        const paidTrips = tripPayments.filter((p: any) => 
            p.status === "completed" || p.status === "paid" || p.status === "confirmed"
        );
        
        // Count completed trips (past adventures)
        const today = new Date();
        const completedTrips = paidTrips.filter((p: any) => {
            if (!p.trip?.endDate) return false;
            const endDate = new Date(p.trip.endDate);
            return endDate < today;
        });
        
        // Get unique countries visited
        const countriesVisited = new Set(
            completedTrips
                .map((p: any) => p.trip?.location?.split(',')[0]?.trim())
                .filter(Boolean)
        );
        
        // Count unlocked achievements
        const badgeProgress = achievementsData?.data?.badgeProgress || {};
        const unlockedAchievements = Object.values(badgeProgress).filter(
            (progress: any) => progress.unlocked === true
        ).length;
        
        // Calculate adventure points (can be based on trips attended or achievements)
        const adventurePoints = completedTrips.length * 100 + unlockedAchievements * 50;
        
        return {
            tripsAttended: completedTrips.length || 0,
            countriesCount: countriesVisited.size || 0,
            achievements: unlockedAchievements || 0,
            adventurePoints: adventurePoints || 0,
            pointsToNextLevel: Math.max(0, 1000 - (adventurePoints % 1000))
        };
    }, [paymentData, achievementsData]);
    
    return (
        <div className="border border-[#D9D9D9] bg-[#FAFAFA] rounded-[16px] w-full mt-6 ">
            <div className="px-4 py-8">
                <span className="font-bold">Key States</span>
                <div className="mt-4 grid lg:grid-cols-3 gap-4">
                    <div className="flex gap-4 border border-[#0DAC87] bg-[#F0FFFC] rounded-[20px] px-8 py-4">
                        <div className="bg-[#0DAC87] rounded-full w-20 h-20 flex items-center justify-center mt-4 mb-2">
                            <img src={userstats1} alt="userstats1" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-medium text-[12px]">Trips Attended</span>
                            <span className="font-bold text-2xl">{stats.tripsAttended}</span>
                            <span className="text-[#332A2A] text-[10px]">
                                {stats.countriesCount > 0 ? `Across ${stats.countriesCount} ${stats.countriesCount === 1 ? 'country' : 'countries'}` : 'Start your adventure'}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4 border border-[#0D57AC] bg-[#F0FAFF] rounded-[20px] px-8 py-4">
                        <div className="bg-[#0D57AC] rounded-full w-20 h-20 flex items-center justify-center mt-4 mb-2">
                            <img src={userstats2} alt="userstats2" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-medium text-[12px]">Achievements</span>
                            <span className="font-bold text-2xl">{String(stats.achievements).padStart(2, '0')}</span>
                            <span className="text-[#332A2A] text-[10px]">badges earned</span>
                        </div>
                    </div>
                    <div className="flex gap-4 border border-[#C29605] bg-[#FFFEF0] rounded-[20px] px-8 py-4">
                        <div className="bg-[#C29605] rounded-full w-20 h-20 flex items-center justify-center mt-4 mb-2">
                            <img src={userstats3} alt="userstats3" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-medium text-[12px] text-nowrap">Adventure Points</span>
                            <span className="font-bold text-2xl">{stats.adventurePoints}</span>
                            <span className="text-[#332A2A] text-[10px]">
                                {stats.pointsToNextLevel > 0 ? `${stats.pointsToNextLevel} to next level` : 'Max level reached'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats