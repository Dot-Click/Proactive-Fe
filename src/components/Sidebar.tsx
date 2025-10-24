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
import Proactivelogo from "@/assets/proactive-logo.png";
import Favicon from "@/assets/sidebaricon/favicon.png";
import SidebarIcon from "@/assets/sidebaricon/sidebarIcon.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface Urlprops {
  Url: string
  collapsed: boolean,
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  items: { label: string, href: string, Icon: string }[]
}

export function SidebarNav({ collapsed, setCollapsed, items, Url }: Urlprops) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const current = items.find(item => item.href === location.pathname);
    if (current) setActiveItem(current.label);
  }, [location.pathname]);

  return (
    <>
      <Sidebar className={`${collapsed ? "w-20" : "w-62"} transition-all duration-300 h-full`}>
        <SidebarHeader className="bg-[#FFFFFF]">
          <div
            className={`relative px-4 py-8 flex items-center justify-between`}
          >
            {!collapsed ? (
              <Link to={Url ? Url : ''}>
                <img
                  src={Proactivelogo}
                  alt="Proactivelogo"
                  className="w-28 transition-opacity"
                />
              </Link>
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
            {items.map(({ label, href, Icon }) => (
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
                                className={`${Icon === 'oppurtunityManagement' ? 'w-2 h-3' : 'w-4 h-4'} transition ${activeItem === label ? "brightness-0 invert" : "invert-[0.6]"
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