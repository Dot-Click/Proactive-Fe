import Navbar from "@/components/navbar"
import { SidebarNav } from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import Dashboard from "@/assets/sidebaricon/dashboard.png";
import UserManagement from "@/assets/sidebaricon/user-management.png";
import Coordinator from "@/assets/sidebaricon/coordinator-management.png";
import Trip from "@/assets/sidebaricon/trip-oppurtunities.png";
import Chat from "@/assets/sidebaricon/chat-management.png";
import Payment from "@/assets/sidebaricon/payment-membership.png";
import Settings from "@/assets/sidebaricon/settings.png";

const AdminItems = [
  { label: "Dashboard", href: "/dashboard", Icon: Dashboard },
  { label: "User Management", href: "/dashboard/user-management", Icon: UserManagement },
  { label: "Coordinator Management", href: "/dashboard/coordinator-management", Icon: Coordinator },
  { label: "Trip Opportunities", href: "/dashboard/trip-management", Icon: Trip },
  { label: "Chat Management", href: "/dashboard/chat-management", Icon: Chat },
  { label: "Payment & Membership", href: "/dashboard/payment-membership", Icon: Payment },
  { label: "Settings", href: "/dashboard/settings", Icon: Settings },
]


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <>
      <div className="flex w-full py-8">
        <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} items={AdminItems} Url='/dashboard'/>
        <Navbar collapsed={collapsed} role="admin"/>
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