import { Link } from "react-router-dom";
import proactive from "../../../assets/proactive-logo.png";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const UserSideNavbar = () => {
    return (
        <>
            <div className="flex lg:justify-between lg:items-center justify-center mt-6">
                <img src={proactive} alt="proactive" className="h-10 hidden lg:flex" />

                <div className="hidden bg-[#FFFFFF] shadow-lg lg:flex items-center px-4 py-3 rounded-full gap-6 cursor-pointer">
                    <Link to="/user-dashboard">
                        <span
                            className={`${location.pathname === "/user-dashboard"
                                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold"
                                : ""
                                }`}
                        >
                            Home
                        </span>
                    </Link>
                    <Link to="/user-dashboard/adventure-oppurtunities">
                        <span
                            className={`${location.pathname ===
                                "/user-dashboard/adventure-oppurtunities"
                                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold"
                                : ""
                                }`}
                        >
                            Open Opportunities
                        </span>
                    </Link>
                    <div
                        className="bg-[#000000] rounded-full px-4 py-2 text-white font-semibold">
                        <span className="flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex gap-1 items-center">
                                    What We Do
                                    <ChevronDown className='w-4 h-4' />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </span>
                    </div>
                    <div
                        className="bg-[#000000] rounded-full px-4 py-2 text-white font-semibold">
                        <span className="flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex gap-1 items-center">
                                        <span>Info</span>
                                        <ChevronDown className='w-4 h-4' />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button className="bg-light text-black hover:bg-[#c5e4dc] cursor-pointer px-7 py-6 font-bold rounded-full">Log In</Button>
                    <Button className="bg-[#0DAC87] hover:bg-[#0fa17f] cursor-pointer px-7 py-6 font-bold rounded-full">Join Now</Button>
                </div>

            </div>
        </>
    )
}

export default UserSideNavbar