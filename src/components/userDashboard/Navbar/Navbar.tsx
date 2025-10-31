import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import proactive from "../../../assets/proactive-logo.png"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, LogOut } from "lucide-react"
import Notification from "@/assets/sidebaricon/notification.png"
import { Link, useLocation } from "react-router-dom"

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
                        <div className="cursor-pointer relative bg-[#FFFFFF] rounded-full w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center md:mt-1">
                            <Badge className="font-bold absolute left-6 bottom-6 lg:left-7 lg:bottom-8 bg-[#000000] text-[9px] md:text-[10px] text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                                3
                            </Badge>
                            <img src={Notification} alt="Notification" />
                            <DropdownMenuContent className="w-72">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Avatar className="lg:w-8 lg:h-8 mr-2">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    New Notification from <span className="font-semibold">Pachums</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Avatar className="w-8 h-8 mr-2">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    New Notification from <span className="font-semibold">Pachums</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Avatar className="w-8 h-8 mr-2">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    New Notification from <span className="font-semibold">Pachums</span>
                                </DropdownMenuItem>
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
                                <ChevronDown color="#A6AAC9"/>
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