import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AvatarFallback } from "@radix-ui/react-avatar"
import goldmember from "../../../assets/goldmember.png"
import { Separator } from "@/components/ui/separator"
const UserProfile = () => {
    return (
        <>
            <div className="mt-6 border border-[#D9D9D9] bg-[#F0F5FC] rounded-[20px] flex flex-col ">
                <div className="px-16 py-6 flex flex-col items-center">
                    <Avatar className="w-16 h-16 border border-[#D9D9D9]">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col justify-center items-center mt-4">
                        <span className="text-[#141E20] font-semibold">Will Bettelheim</span>
                        <span className="text-[#332A2A] text-[12px]">willbettelhiem@gmail.com</span>
                    </div>

                    <div className="mt-4">
                        <Badge className="flex gap-2 py-2 px-4 bg-[#FFEEC2] border border-[#D79511]">
                            <img src={goldmember} alt="goldmember" className="h-6" />
                            <span className="text-[#D79511] font-bold">GOLD MEMBER</span>
                        </Badge>
                    </div>
                </div>
                <Separator className="border border-[#D9D9D9]" />
            </div>
        </>
    )
}

export default UserProfile