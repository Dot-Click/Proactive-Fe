import { Link, useNavigate } from "react-router-dom";
import proactive from "../../../assets/proactive-logo.png";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const UserSideNavbar = () => {
const navigate = useNavigate()
    return (
        <>
            <div className="flex justify-between lg:items-center mt-6 absolute top-0 left-0 right-0 container mx-auto px-8 z-10">
                <img src={proactive} alt="proactive" className="lg:h-10 h-5" />

                <div className="hidden bg-[#FFFFFF]/75 shadow-lg lg:flex items-center px-4 py-2 rounded-full gap-6 cursor-pointer">
                    <Link to="/">
                        <span
                            className={`${location.pathname === "/"
                                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold"
                                : ""
                                }`}
                        >
                            Home
                        </span>
                    </Link>
                    <Link to="/open-oppurtunities">
                        <span
                            className={`${location.pathname ===
                                "/open-oppurtunities"
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
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <div className="flex gap-1 items-center">
                                        What We Do
                                        <ChevronDown className='w-4 h-4' />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#FFFFFF]/95 flex flex-col justify-center items-center px-4 mt-4">
                                    <Link to="/wild-weekend">
                                    <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Wild Weekend</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <Link to={'/wild-trip'}>
                                    <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Wild Trip</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <Link to={'/erasmus-plus'}>
                                    <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Erasmus+</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <Link to={'/internal-events'}>
                                    <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Internal Events</DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </span>
                    </div>
                    <div
                        className="bg-[#000000] rounded-full px-4 py-2 text-white font-semibold">
                        <span className="flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <div className="flex gap-1 items-center">
                                        <span>Info</span>
                                        <ChevronDown className='w-4 h-4' />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#FFFFFF]/95 flex flex-col justify-center items-center px-2 mt-4">
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A] mt-2">About Us</DropdownMenuItem>
                                            <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Become a Member</DropdownMenuItem>
                                            <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Coordinators</DropdownMenuItem>
                                            <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Benefits</DropdownMenuItem>
                                            <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Contact</DropdownMenuItem>
                                            <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">FAQ</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </span>
                    </div>
                </div>

                <div className="lg:flex hidden items-center gap-4">
                    <Button onClick={()=> navigate("/login")} className="bg-light text-black hover:bg-[#c5e4dc] cursor-pointer px-7 py-6 font-bold rounded-full">Log In</Button>
                    <Button onClick={()=> navigate("/signup")} className="bg-[#0DAC87] hover:bg-[#0fa17f] border border-[#FFFFFF]/64 cursor-pointer px-7 py-6 font-bold rounded-full">Join Now</Button>
                </div>

                <div className="lg:hidden flex">
                    <Menu color="#000000"/>
                </div>

            </div>
        </>
    )
}

export default UserSideNavbar
