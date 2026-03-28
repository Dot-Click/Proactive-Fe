import Navbar from "@/components/navbar"
import { SidebarNav } from "@/components/Sidebar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import Dashboard from "@/assets/sidebaricon/dashboard.svg";
import UserManagement from "@/assets/sidebaricon/user-management.avif";
import Coordinator from "@/assets/sidebaricon/coordinator-management.avif";
import Star from "@/assets/sidebaricon/star.avif";
import Trip from "@/assets/sidebaricon/trip-oppurtunities.avif";
import Chat from "@/assets/sidebaricon/chat-management.avif";
import Payment from "@/assets/sidebaricon/payment-membership.avif";
import Settings from "@/assets/sidebaricon/settings.avif";

const AdminItems = [
  { label: "sidebar.dashboard", href: "/dashboard", Icon: Dashboard },
  { label: "sidebar.userManagement", href: "/dashboard/user-management", Icon: UserManagement },
  { label: "sidebar.coordinatorManagement", href: "/dashboard/coordinator-management", Icon: Coordinator },
  { label: "sidebar.tripOpportunities", href: "/dashboard/trip-management", Icon: Trip },
  { label: "sidebar.googleReviews", href: "/dashboard/google-reviews", Icon: Star },
  { label: "sidebar.chatManagement", href: "/dashboard/chat-management", Icon: Chat },
  { label: "sidebar.paymentMembership", href: "/dashboard/payment-membership", Icon: Payment },
  { label: "sidebar.settings", href: "/dashboard/settings", Icon: Settings },
]


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <>
      <ScrollToTop />
      <div className="flex w-full py-8">
        <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} items={AdminItems} Url='/dashboard' />
        <Navbar collapsed={collapsed} role="admin" />
        <main
          className={`w-full min-w-0 px-4 transition-all duration-300 mt-16 md:mt-14 lg:mt-16 ${collapsed ? "md:-ml-40" : ""}`}
        >
          <Outlet />
        </main>
      </div>

    </>

  )
}

export default AdminLayout