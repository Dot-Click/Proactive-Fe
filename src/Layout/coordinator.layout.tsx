import Navbar from "@/components/navbar"
import { SidebarNav } from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import Dashboard from "@/assets/sidebaricon/dashboard.png";
import oppurtunityManagement from "@/assets/sidebaricon/oppurtunity.png";
import Applicants from "@/assets/sidebaricon/ApplicantReview.png";
import Achievement from "@/assets/sidebaricon/Achievement.png";
import CoordinatorChat from "@/assets/sidebaricon/coordinatormsg.png";
import CoordinatorSettings from "@/assets/sidebaricon/settings.png";

const AdminItems = [
  { label: "Dashboard", href: "/coordinator-dashboard", Icon: Dashboard },
  { label: "Opportunity Management", href: "/coordinator-dashboard/oppurtunities-management", Icon: oppurtunityManagement },
  { label: "Applicants Review", href: "/coordinator-dashboard/applicants-review", Icon: Applicants },
  { label: "Achievement Control", href: "/coordinator-dashboard/achievements-control", Icon: Achievement },
  { label: "Chats with Users", href: "/coordinator-dashboard/chat-users", Icon: CoordinatorChat },
  { label: "Settings", href: "/coordinator-dashboard/settings", Icon: CoordinatorSettings },
]


const CoordinatorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <>
      <div className="flex w-full py-8">
        <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} items={AdminItems} Url='/coordinator-dashboard' />
        <Navbar collapsed={collapsed} />
        <main
          className={`w-full min-w-0 px-4 transition-all duration-300 mt-16 md:mt-22 lg:mt-16 ${collapsed ? "md:-ml-40" : ""}`}
        >
          <Outlet />
        </main>
      </div>

    </>

  )
}

export default CoordinatorLayout