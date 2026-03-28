import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import goldmember from "../../../assets/goldmember.avif"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook"
import { useTranslation } from "react-i18next"

const UserProfile = () => {
    const { t, i18n } = useTranslation();
    const { data: userData } = UsegetCurrentUser();
    const navigate = useNavigate();
    const user = userData?.data?.user;

    // Calculate profile completeness based on filled fields
    const completeness = useMemo(() => {
        if (!user) return 0;
        const fields = [
            user.FirstName,
            user.LastName,
            user.NickName,
            user.PhoneNumber,
            user.dob,
            user.Gender,
            user.Address,
            user.EmergencyContact,
            user.DNI,
            user.DietRestrictions
        ];
        const filled = fields.filter(val => val && val.toString().trim() !== "").length;
        return Math.round((filled / fields.length) * 100);
    }, [user]);

    // Format member since date nicely
    const formatMemberSince = (dateString: string | null | undefined): string => {
        if (!dateString) return t("profile.member");

        try {
            const date = new Date(dateString);
            const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            const formattedDate = date.toLocaleDateString(locale, options);
            return t("profile.memberSince", { date: formattedDate });
        } catch (error) {
            return t("profile.member");
        }
    };

    // Get full name, prioritizing FirstName + LastName
    const getFullName = (): string => {
        const firstName = user?.FirstName || "";
        const lastName = user?.LastName || "";
        const fullName = `${firstName} ${lastName}`.trim();

        // Fallback to nickname only if no first/last name available
        if (!fullName && user?.NickName) {
            return user.NickName;
        }

        return fullName || t("profile.user");
    };

    // Get avatar URL - prioritize Google avatar, then regular avatar, then fallback
    const getAvatarUrl = (): string | undefined => {
        if (user?.avatar) {
            return user.avatar;
        }
        return undefined;
    };

    // Get avatar fallback initials from full name
    const getAvatarInitials = (): string => {
        const fullName = getFullName();
        if (!fullName || fullName === t("profile.user")) return "U";

        const parts = fullName.trim().split(" ");
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return fullName[0].toUpperCase();
    };

    return (
        <>
            <div className="mt-6 border border-[#D9D9D9] bg-[#F0F5FC] rounded-[20px] flex flex-col ">
                <div className="px-16 py-6 flex flex-col items-center">
                    <Avatar className="w-16 h-16 border border-[#D9D9D9]">
                        <AvatarImage src={getAvatarUrl()} alt={getFullName()} />
                        <AvatarFallback className="bg-[#D9D9D9] text-[#141E20] font-semibold">
                            {getAvatarInitials()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col justify-center items-center mt-4">
                        <span className="text-[#141E20] font-semibold text-lg text-center">{getFullName()}</span>
                        <span className="text-[#332A2A] text-[12px]">{user?.email}</span>
                        {user?.createdAt && (
                            <span className="text-[#666373] text-[11px] mt-1">
                                {formatMemberSince(user.createdAt)}
                            </span>
                        )}
                    </div>

                    <div className="mt-4">
                        <Badge className={`flex gap-2 py-2 px-4 rounded-full ${user?.membershipAvailable ? 'bg-[#FFEEC2] border-[#D79511]' : 'bg-[#EFEFEF] border-[#D4D4D4]'}`}>
                            {user?.membershipAvailable && <img src={goldmember} alt="goldmember" className="h-6" />}
                            <span className={user?.membershipAvailable ? 'text-[#D79511] font-bold' : 'text-[#666373] font-bold'}>
                                {user?.membershipAvailable ? t('profile.proMember') : t('profile.freeMember')}
                            </span>
                        </Badge>
                    </div>
                </div>
                <Separator className="border border-[#D9D9D9]" />

                <div className="px-4 py-6">
                    <div className="flex justify-between mb-1">
                        <span className="text-[#332A2A] font-semibold">{t("dashboard.profileCompleteness")}</span>
                        <span className="text-[#332A2A] font-semibold">{completeness}%</span>
                    </div>
                    <Progress value={completeness} className="[&>div]:bg-[#030213]" />
                    <div className="flex flex-col mt-3 gap-3">
                        <span className="text-[#4A5565] text-[12px] font-medium">
                            {completeness < 100 ? t("dashboard.completenessInstructions") : t("dashboard.profileComplete")}
                        </span>
                        <Button
                            onClick={() => navigate("/user-dashboard/user-settings")}
                            className="text-[#221E33] font-medium rounded-full py-6 bg-linear-to-b from-[#FFFFFF] to-[#F2F2F2] 
                            border border-[#D4D4D4] cursor-pointer hover:bg-[#E6E6E6] transform transition-all hover:scale-[1.02]
                        ">
                            {completeness < 100 ? t("dashboard.completeProfile") : t("dashboard.editProfile")}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile