import { TbArrowBackUp } from "react-icons/tb"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

const Header = () => {
const navigate = useNavigate()
    return (
        <div className="px-4 sm:px-16 py-8">
            <div className="flex flex-col gap-6 items-start">
            <Button onClick={() => navigate("/user-dashboard")} className="bg-[#EDEDED] text-[#000000] rounded-[10px] cursor-pointer hover:bg-[#d8d2d2] font-semibold">
                <TbArrowBackUp className="font-bold" />
                Back to Dashboard
            </Button>
            <div className="flex flex-col gap-1">
                <h4 className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text text-2xl font-bold">Profile Settings</h4>
                <span className="text-[#221E33] text-[14px]">Manage your personal information and account preferences</span>
            </div>
            </div>
        </div>
    )
}

export default Header