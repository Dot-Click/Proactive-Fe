import { Badge } from "@/components/ui/badge";
import AchievementExplorer from "../../../assets/AchievementExplorer.png";
import ShadowMountain from "../../../assets/ShadowMountain.png";
import Nature from "../../../assets/Naturelover.png";
import Leader from "../../../assets/LeaderLibrary.png";

type AchievementItem = {
  id: string;
  points: number;
  progress: number;
  level: string;
  badges: string;
  unlocked: boolean;
  role: string;
};

type AchievementlibraryProps = {
  achievements: AchievementItem[];
};

const badgeIconMap: Record<string, string> = {
  "mountain climber": ShadowMountain,
  explorer: AchievementExplorer,
  "nature lover": Nature,
  leader: Leader,
};

const Achievementlibrary = ({ achievements }: AchievementlibraryProps) => {
  const hasData = achievements && achievements.length > 0;

  return (
    <div className="bg-white px-4 py-5 rounded-[25px] mt-2">
      <span className="font-semibold bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
        Achievements Library
      </span>

      {!hasData && (
        <p className="text-sm text-[#666373] mt-4">No achievements yet.</p>
      )}

      {hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
          {achievements.map((item) => {
            const iconKey = item.badges?.toLowerCase() ?? "";
            const iconSrc = badgeIconMap[iconKey] ?? ShadowMountain;
            const badgeColor = item.unlocked ? "#0DAC87" : "#666373";
            return (
              <div
                key={item.id}
                className="border border-[#E6E2F5] bg-[#FAFAFE] rounded-[20px] py-3 px-3 flex flex-col justify-between h-full"
              >
                <div className="flex items-center mt-1 gap-2">
                  <img src={iconSrc} alt={item.badges} className="w-12" />
                  <div>
                    <p className="text-[#221E33] text-md font-bold mb-0 capitalize">
                      {item.badges || "Achievement"}
                    </p>
                    <p className="text-[11px] text-[#666373] text-nowrap">
                      Level: {item.level || "-"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#666373] text-[12px] font-bold capitalize">
                    {item.role || "participant"}
                  </span>
                  <Badge
                    className="text-sm rounded-full px-3 py-1 border"
                    style={{
                      color: badgeColor,
                      backgroundColor: `${badgeColor}1a`,
                      borderColor: `${badgeColor}40`,
                    }}
                  >
                    +{item.points}pts
                  </Badge>
                </div>
                {/* <div className="mt-2 text-[12px] text-[#666373] flex justify-between">
                                    <span>Progress</span>
                                    <span>{item.progress}</span>
                                </div> */}
                <div className="mt-1 text-[12px] text-[#666373]">
                  Status: {item.unlocked ? "Unlocked" : "Locked"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Achievementlibrary;
