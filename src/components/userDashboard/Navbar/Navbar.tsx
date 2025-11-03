import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import proactive from "../../../assets/proactive-logo.png"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, LogOut } from "lucide-react"
import Notification from "@/assets/sidebaricon/notification.png"
import { Link, useLocation } from "react-router-dom"
import { RiCheckDoubleLine } from "react-icons/ri"
import { Button } from "@/components/ui/button"

const Navbar = () => {
    const location = useLocation();

    return (
        <div className="flex lg:justify-between lg:items-center justify-center mt-6">
            <img src={proactive} alt="proactive" className="h-10 hidden lg:flex" />

            <div className="hidden bg-[#FFFFFF] shadow-md lg:flex items-center px-4 py-3 rounded-full gap-6 cursor-pointer">
                <Link to="/user-dashboard">
                    <span className={`${location.pathname === "/user-dashboard" ? 'bg-[#000000] rounded-full px-6 py-2 text-white font-semibold' : ''}`}>Dashboard</span>
                </Link>
                <Link to="/user-dashboard/adventure-oppurtunities">
                    <span className={`${location.pathname === "/user-dashboard/adventure-oppurtunities" ? 'bg-[#000000] rounded-full px-6 py-2 text-white font-semibold' : ''}`}>Oppurtunities</span>
                </Link>
            </div>

            <div className="flex gap-4">
                {/* Notification icon */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="cursor-pointer relative bg-[#F2FBF9] rounded-full w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center md:mt-1">
                            <Badge className="font-bold absolute left-6 bottom-6 lg:left-7 lg:bottom-8 bg-[#000000] text-[9px] md:text-[10px] text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                                3
                            </Badge>
                            <img src={Notification} alt="Notification" />
                            <DropdownMenuContent className="w-100">
                                <div className="px-4 py-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">
                                            Notification
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <RiCheckDoubleLine color="#000000" size={20} />
                                            <span className="underline text-[#060A14] font-semibold">Mark all as read</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex items-center gap-4 cursor-pointer">
                                        <span className="border-b-2 mt-1 border-[#000000]">All Notification</span>
                                        <span>Unread</span>
                                    </div>
                                </div>
                                < div className="border-b border-[#D9D9D9] -mt-[16px]" />
                                <div className="px-2 py-2">
                                <div className="bg-[#F4F4F4] rounded-[10px] px-4 py-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-[12px]">Application Approved</span>
                                        <div className="w-2 h-2 bg-[#0DAC87] rounded-full"/>
                                    </div>
                                    <div className="flex flex-col items-start gap-4 mt-2">
                                        <span className="text-[#787878] text-[12px] ">Your application for Wild Trip: Egypt has been approved! You can now proceed with payment</span>
                                        <Button className="rounded-full px-6 bg-[#0DAC87] cursor-pointer hover:bg-[#109c7c]">Pay Now</Button>
                                    </div>
                                </div>
                                </div>
                            </DropdownMenuContent>
                        </div>
                    </DropdownMenuTrigger>
                </DropdownMenu>

                {/* Avatar and dropdown */}
                <div className="flex items-center gap-2 lg:gap-3">
                    <Avatar className="w-10 h-10 lg:w-16 lg:h-16">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:flex flex-col">
                        <span className="font-semibold text-sm lg:text-lg">Pachums</span>
                        <span className="text-sm text-gray-500">Pachums@gmail.com</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <div className="rounded-full hover:bg-gray-100">
                                <ChevronDown color="#A6AAC9" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="flex flex-col gap-2 items-start cursor-pointer">
                                <div className="flex lg:hidden flex-col">
                                    <span className="font-semibold text-sm lg:text-lg">Pachums</span>
                                    <span className="text-sm text-gray-500">Pachums@gmail.com</span>
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <LogOut />
                                    Logout
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>

        </div>
    )
}

export default Navbar