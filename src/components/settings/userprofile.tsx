import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import goldmember from "../../assets/goldmember.png"
import email from "../../assets/email.png"
import calender from "../../assets/calenderblack.png"
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook"

// Format date to nice readable format
const formatMemberDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    
    try {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    } catch (error) {
        return dateString;
    }
};

const Userprofile = () => {
    const { data: userData } = UsegetCurrentUser();
    const user = userData?.data?.user;
    
    // Get full name for alias
    const fullName = user?.FirstName && user?.LastName 
        ? `${user.FirstName} ${user.LastName}`.trim()
        : user?.NickName || user?.email?.split('@')[0] || "User";
    
    // Get avatar - prioritize Google avatar if available
    const avatarUrl = user?.avatar || user?.profilePicture || null;
    
    return (
        <div className="">
            <div className="lg:w-80 border border-[#D9D9D9] bg-[#FAFAFA] rounded-[20px] flex flex-col">
                <div className="px-16 py-6 flex flex-col items-center">

                    <Avatar className="w-16 h-16 border border-[#D9D9D9]">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>
                            {user?.FirstName?.[0] || user?.LastName?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col justify-center items-center mt-4">
                        <span className="text-[#141E20] font-semibold text-lg">{user?.FirstName} {user?.LastName}</span>
                    </div>

                    <div className="mt-4">
                        <Badge className="flex gap-2 py-2 px-4 bg-[#FFEEC2] border border-[#D79511]">
                            <img src={goldmember} alt="goldmember" className="h-6" />
                            <span className="text-[#D79511] font-bold">GOLD MEMBER</span>
                        </Badge>
                    </div>

                </div>
                <div className="bg-[#F4F4F4] mx-4 mb-6 rounded-[15px] px-1 py-1">
                    <div className="flex flex-col gap-4 px-4 py-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[#303030] font-bold">@</span>
                            <span className="text-[#666373] text-[12px]">{fullName}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <img src={email} alt="email" />
                            <span className="text-[#666373] text-[12px]">{user?.email}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <img src={calender} alt="calender" />
                            <span className="text-[#666373] text-[12px]">Member since {formatMemberDate(user?.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userprofile
