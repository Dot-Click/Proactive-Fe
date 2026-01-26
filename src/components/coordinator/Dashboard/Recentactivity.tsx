import { UsegetcoordinatordashboardStats } from "@/hooks/getcoordinatordashboardStats";
import { Clock } from "lucide-react";

type RecentActivityItem = {
  actionType?: string;
  tripName?: string;
  activityDate?: string;
};

const Recentactivity = () => {
  const { data, isLoading, isError } = UsegetcoordinatordashboardStats();

  const formatRelativeTime = (isoDate?: string) => {
    if (!isoDate) return "Unknown time";
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return "Unknown time";

    const diffSeconds = Math.max(
      0,
      Math.floor((Date.now() - date.getTime()) / 1000),
    );
    if (diffSeconds < 60) return "Just now";
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} min ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hrs ago`;
    if (diffSeconds < 2592000)
      return `${Math.floor(diffSeconds / 86400)} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatMessage = ({ actionType, tripName }: RecentActivityItem) => {
    const actionLabels: Record<string, string> = {
      approved: "Approved",
      rejected: "Rejected",
      created: "Created",
      published: "Published",
    };

    const normalized = actionType?.toLowerCase() || "Updated";
    const actionText =
      actionLabels[normalized] ||
      normalized.charAt(0).toUpperCase() + normalized.slice(1);
    return tripName ? `${actionText} ${tripName}` : actionText;
  };

  const recentActivity = Array.isArray(data?.recentActivity)
    ? data?.recentActivity
    : [];

  if (isError) {
    return <div>Error loading recent activity.</div>;
  }

  const displayItems = recentActivity.map((item: RecentActivityItem) => ({
    message: formatMessage(item),
    time: formatRelativeTime(item.activityDate),
  }));

  return (
    <div className="px-4 py-6 bg-white rounded-[25px] shadow-sm border border-[#E9ECF5] mt-2 w-full">
      <h1 className="bg-gradient-to-r from-[#221E33] to-[rgb(86,80,112)] mb-3  text-[16px] text-transparent bg-clip-text font-semibold">
        Recent Activity
      </h1>
      <div className="flex flex-col gap-3 max-h-[367px] overflow-y-auto pr-1">
        {isLoading && (
          <span className="text-[#A6ADB9] text-[12px]">
            Loading recent activity...
          </span>
        )}
        {!isLoading && displayItems.length === 0 && (
          <span className="text-[#A6ADB9] text-[12px]">
            No recent activity found.
          </span>
        )}
        {displayItems.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-[#FAFAFE] flex justify-between gap-4 px-4 py-4 rounded-[16px]"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[12px] text-[#666373] leading-[16px] font-semibold">
                {item.message}
              </span>
              <div className="flex gap-2 items-center">
                <Clock size={14} color="#A6ADB9" />
                <span className="text-[#A6ADB9] text-[12px]">{item.time}</span>
              </div>
            </div>
            {/* <div className="flex">
              <EllipsisVertical className="cursor-pointer text-[#4A5D61]/61" />
            </div> */}
          </div>
        ))}
      </div>
    </div>
);
};

export default Recentactivity;
