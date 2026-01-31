import { Link, useLocation, useNavigate } from "react-router-dom";
import proactive from "../../../assets/proactive-logo.png";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DrawerBar from "@/components/Drawer";
import { UserSideDrawerItems } from "@/components/DrawerItems";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";

const UserSideNavbar = ({ role }: { role: string }) => {
    const location = useLocation();
    const DrawerItems = role === "UserSide"
        ? UserSideDrawerItems
        : [];
    const navigate = useNavigate()
    return (
        <>
            <div className="flex justify-between items-center gap-8 px-6 mt-6 absolute top-0 left-0 right-0 container mx-auto z-10">
                <img src={proactive} alt="proactive" className="lg:h-10 h-5 lg:flex hidden" />

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
                            className={`text-nowrap ${location.pathname ===
                                "/open-oppurtunities"
                                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold text-nowrap"
                                : ""
                                }`}
                        >
                            Open Opportunities
                        </span>
                    </Link>
                    <div
                        className={`rounded-full px-4 py-2 font-semibold ${location.pathname === "/what-we-do" ? "bg-[#0DAC87] text-white" : "bg-[#000000] text-white"}`}>
                        <span className="flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <div className="flex gap-1 items-center text-nowrap">
                                        What We Do
                                        <ChevronDown className='w-4 h-4' />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#FFFFFF]/95 flex flex-col justify-center items-center px-4 mt-4">
                                    <Link to="/what-we-do">
                                        <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Overview</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
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
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="bg-[#FFFFFF]/95 mt-4 p-4">
                                    <div className="flex gap-8">

                                        {/*  Info */}
                                        <div className="flex flex-col min-w-[160px]">
                                            <span className="text-xs font-semibold text-gray-400 mb-2">INFO</span>

                                            <Link to="/about">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    About Us
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/member">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    Become a Member
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/travel-coordinator">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    Coordinators
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/advantages">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    Benefits
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/contact">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    Contact
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/faq">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    FAQ
                                                </DropdownMenuItem>
                                            </Link>
                                        </div>

                                        {/* Community */}       
                                        <div className="flex flex-col min-w-[180px]">
                                            <span className="text-xs font-semibold text-gray-400 mb-2">
                                                COMMUNITY
                                            </span>

                                            <a
                                                href="WHATSAPP_LINK_HERE"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    <BsWhatsapp className="w-4 h-4" /> Comunidad de WhatsApp
                                                </DropdownMenuItem>
                                            </a>

                                            <a
                                                href="TELEGRAM_LINK_HERE"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    <BsTelegram className="w-4 h-4" /> Difusión en Telegram
                                                </DropdownMenuItem>
                                            </a>
                                        </div>

                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </span>
                    </div>
                </div>

                <div className="lg:flex hidden items-center gap-4">
                    <Button onClick={() => navigate("/login")} className="bg-light text-black hover:bg-[#c5e4dc] cursor-pointer px-7 py-6 font-bold rounded-full">Log In</Button>
                    <Button onClick={() => navigate("/signup")} className="bg-[#0DAC87] hover:bg-[#0fa17f] border border-[#FFFFFF]/64 cursor-pointer px-7 py-6 font-bold rounded-full">Join Now</Button>
                </div>

                <div className="lg:hidden flex">
                    <DrawerBar items={DrawerItems} />
                </div>

            </div>
        </>
    )
}

export default UserSideNavbar
