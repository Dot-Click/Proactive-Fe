import Navbar from "@/components/navbar"
import { SidebarNav } from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <>
      <div className="flex w-full py-8">
        <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} />
        <Navbar collapsed={collapsed} />
        <main
          className={`w-full min-w-0 px-4 transition-all duration-300 mt-14 md:mt-16 ${collapsed ? "md:-ml-40" : ""}`}
        >
          <Outlet />
        </main>
      </div>

    </> 

  )
}

export default AdminLayout