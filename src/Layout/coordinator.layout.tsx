import Navbar from "@/components/navbar"
import { SidebarNav } from "@/components/Sidebar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import Dashboard from "@/assets/sidebaricon/dashboard.svg";
import oppurtunityManagement from "@/assets/sidebaricon/oppurtunity.avif";
import Applicants from "@/assets/sidebaricon/ApplicantReview.avif";
import Achievement from "@/assets/sidebaricon/Achievement.avif";
import CoordinatorChat from "@/assets/sidebaricon/coordinatormsg.avif";
import CoordinatorSettings from "@/assets/sidebaricon/settings.avif";

const CoordinaItems = [
  { label: "sidebar.dashboard", href: "/coordinator-dashboard", Icon: Dashboard },
  { label: "sidebar.opportunityManagement", href: "/coordinator-dashboard/oppurtunities-management", Icon: oppurtunityManagement },
  { label: "sidebar.applicantsReview", href: "/coordinator-dashboard/applicants-review", Icon: Applicants },
  { label: "sidebar.achievementControl", href: "/coordinator-dashboard/achievements-control", Icon: Achievement },
  { label: "sidebar.chatsWithUsers", href: "/coordinator-dashboard/chat-users", Icon: CoordinatorChat },
  { label: "sidebar.settings", href: "/coordinator-dashboard/settings", Icon: CoordinatorSettings },
]


const CoordinatorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <>
      <ScrollToTop />
      <div className="flex w-full py-8">
        <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} items={CoordinaItems} Url='/coordinator-dashboard' />
        <Navbar collapsed={collapsed} role="coordinator"/>
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