import { Menu } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "./ui/drawer"
import { Link } from "react-router-dom";
import Proactivelogo from "@/assets/proactive-logo.png";
import Country from "@/assets/sidebaricon/country.png"

// const DrawerItems = [
//     { label: "Dashboard", href: "/dashboard", Icon: Dashboard },
//     { label: "User Management", href: "/dashboard/user-management", Icon: UserManagement },
//     { label: "Coordinator Management", href: "/dashboard/coordinator-management", Icon: Coordinator },
//     { label: "Trip Opportunities", href: "/dashboard/trip-management", Icon: Trip },
//     { label: "Chat Management", href: "/dashboard/chat-management", Icon: Chat },
//     { label: "Payment & Membership", href: "/dashboard/payment-membership", Icon: Payment },
//     { label: "Settings", href: "/dashboard/settings", Icon: Settings },
// ]

interface Itemsprops {
    items: { label: string, href: string, Icon?: string }[]
}

const DrawerBar = ({ items }: Itemsprops) => {
    return (
        <div>
            <Drawer direction="left">
                <DrawerTrigger asChild>
                    <Menu className="w-6 h-6 cursor-pointer lg:hidden block" color="black"/>
                </DrawerTrigger>
                <DrawerContent className="h-screen w-72 sm:w-80 p-0 border-r">
                    <div className="h-full flex flex-col bg-white">
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <span className="font-semibold">
                                <img src={Proactivelogo} alt="Proactivelogo" className="w-30 h-10" />
                            </span>
                            <DrawerClose asChild>
                                <button className="text-sm px-2 py-1 rounded-md border">Close</button>
                            </DrawerClose>
                        </div>
                        <nav className="flex-1 overflow-auto p-4">
                            <div className="flex flex-col gap-1">
                                {items.map((item) => (
                                    <DrawerClose asChild key={item.label}>
                                        <Link to={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[#F5F6FA]">
                                            {
                                                item.Icon ? (
                                                    <img src={item.Icon ? item.Icon : ''} alt={item.label ? item.label : ''} className={`w-5 h-5 ${item.label === 'Dashboard' ? 'brightness-0 invert-[0.6]' : ''}`} />
                                                ) :
                                                    (
                                                        <div className="w-5 h-5" />
                                                    )
                                            }
                                            <span className="text-[#221E33] text-sm font-medium">{item.label}</span>
                                        </Link>
                                    </DrawerClose>
                                ))}
                            </div>
                            {/* Country icon */}
                            <div className="hidden lg:flex bg-[#FFFFFF] rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center md:mt-1 cursor-pointer">
                                <img src={Country} alt="Country" />
                            </div>
                        </nav>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default DrawerBar;