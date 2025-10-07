import Navbar from "@/components/navbar"
import { SidebarNav } from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="flex py-8">
        <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} />
        <Navbar collapsed={collapsed} />
        <main
          className={`transition-all duration-300 ${collapsed ? "-ml-40" : ""
            } mt-16`}
        >
          <Outlet />
        </main>
      </div>

    </> 

  )
}

export default AdminLayout