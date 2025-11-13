import { Link, useNavigate } from "react-router-dom";
import proactive from "../../../assets/proactive-logo.png";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import carousel from "../../../assets/carousel.png"

const UserSideNavbar = () => {
const navigate = useNavigate()
    return (
        <>
            <div className="relative ">
                <img
                    src={carousel}
                    alt="carousel"
                    className="w-full h-[60vh] object-cover object-center md:h-full"
                />
            </div>
            <div className="flex justify-between lg:items-center mt-6 absolute top-0 left-0 right-0 container mx-auto px-8 z-10">
                <img src={proactive} alt="proactive" className="lg:h-10 h-8" />

                <div className="hidden bg-[#FFFFFF] shadow-lg lg:flex items-center px-4 py-2 rounded-full gap-6 cursor-pointer">
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
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <div className="flex gap-1 items-center">
                                        What We Do
                                        <ChevronDown className='w-4 h-4' />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#FFFFFF]/95 flex flex-col justify-center items-center px-4 mt-4">
                                    <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Wild Weekend</DropdownMenuItem>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Wild Trip</DropdownMenuItem>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Erasmus+</DropdownMenuItem>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Internal Events</DropdownMenuItem>
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
                                <DropdownMenuContent className="bg-[#FFFFFF]/95 flex flex-col justify-center items-center px-4 py-4 mt-4">
                                    <div className="flex gap-6">
                                        <div className="flex flex-col gap-2">
                                            <DropdownMenuLabel className="font-bold">Nosotros</DropdownMenuLabel>
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">¿Quienes somos?</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Socios</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Coordinadores</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Ventajas</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Contacto</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">FAQ</DropdownMenuItem>
                                        </div>
                                        <div className="border-r border-[#565960]/40" />
                                        <div className="flex flex-col gap-2">
                                            <DropdownMenuLabel className="font-bold">Comunidad</DropdownMenuLabel>
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Comunidad de whatsapp</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-[#332A2A]">Difusión de telegram</DropdownMenuItem>
                                        </div>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </span>
                    </div>
                </div>

                <div className="lg:flex hidden items-center gap-4">
                    <Button onClick={()=> navigate("/login")} className="bg-light text-black hover:bg-[#c5e4dc] cursor-pointer px-7 py-6 font-bold rounded-full">Log In</Button>
                    <Button onClick={()=> navigate("/signup")} className="bg-[#0DAC87] hover:bg-[#0fa17f] cursor-pointer px-7 py-6 font-bold rounded-full">Join Now</Button>
                </div>

                <div className="lg:hidden flex">
                    <Menu color="#000000"/>
                </div>

            </div>
        </>
    )
}

export default UserSideNavbar
