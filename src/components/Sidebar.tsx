import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import Proactivelogo from "../assets/Proactive-logo.png";
import Favicon from "../assets/sidebaricon/favicon.png";
import SidebarIcon from "../assets/sidebaricon/SidebarIcon.png";
import Dashboard from "../assets/sidebaricon/Dashboard.png";
import UserManagement from "../assets/sidebaricon/User-management.png";
import Coordinator from "../assets/sidebaricon/Coordinator-management.png";
import Trip from "../assets/sidebaricon/Trip-oppurtunities.png";
import Chat from "../assets/sidebaricon/Chat-management.png";
import Payment from "../assets/sidebaricon/Payment-membership.png";
import Settings from "../assets/sidebaricon/settings.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavItems = [
  { label: "Dashboard", href: "/dashboard", Icon: Dashboard },
  { label: "User Management", href: "/dashboard/user-management", Icon: UserManagement },
  { label: "Coordinator Management", href: "/dashboard/coordinator-management", Icon: Coordinator },
  { label: "Trip Opportunities", href: "/", Icon: Trip },
  { label: "Chat Management", href: "/", Icon: Chat },
  { label: "Payment & Membership", href: "/", Icon: Payment },
  { label: "Settings", href: "/", Icon: Settings },
]


export function SidebarNav({collapsed, setCollapsed}: {collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Sidebar className={`${collapsed ? "w-20" : "w-62"} transition-all duration-300`}>
        <SidebarHeader className="bg-[#FFFFFF]">
          <div
            className={`relative px-4 py-8 flex items-center justify-between`}
          >
            {!collapsed ? (
              <img
                src={Proactivelogo}
                alt="Proactivelogo"
                className="w-28 transition-opacity"
              />
            ) : (
              <img
                src={Favicon}
                alt="Favicon"
                className={`w-8 transition-opacity ${collapsed ? "spin-once" : ""}`}
              />
            )}
            <div
              onClick={() => setCollapsed(!collapsed)}
              className={`bg-white shadow-xl rounded-full w-8 h-8 flex items-center justify-center cursor-pointer 
            ${collapsed ? "absolute right-[-20px]" : ""}`}
            >
              <img src={SidebarIcon} alt="SidebarIcon" className="w-4" />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-[#FFFFFF] font-quicksand">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[#666373] text-[14px] px-6 mb-2">
              Menu
            </SidebarGroupLabel>
            {NavItems.map(({ label, href, Icon }) => (
              <SidebarGroupContent key={label}>
                <SidebarMenu>
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      onClick={() => setActiveItem(label)}
                      asChild
                      className={`px-6 py-5 flex items-center w-full text-[#A19EAE] rounded-none ${activeItem === label && "bg-black text-[white] font-semibold hover:bg-black hover:text-[white]"}`}
                    >
                      <Link to={href} className="flex items-center gap-3 w-full">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <img
                                src={Icon}
                                alt={`${label} icon`}
                                className={`w-4 h-4 transition ${activeItem === label ? "brightness-0 invert" : "invert-[0.6]"
                                  }`}
                              />
                            </TooltipTrigger>
                            {collapsed && (
                              <TooltipContent side="right">
                                <span>{label}</span>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                        {/* {!collapsed && <span>{label}</span>} */}
                        {!collapsed && <span>{label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            ))}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>



      <style>
        {
          `
        @keyframes spinOnce {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-once {
          animation: spinOnce 0.5s linear forwards;
        }
      `
        }
      </style>
    </>

  )
}