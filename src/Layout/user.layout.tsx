import Footer from "@/components/Footer"
import UserSideNavbar from "@/components/userSide/Navbar/Navbar"
import { Outlet } from "react-router-dom"

const Userlayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#FFFFFF] w-full relative">
            <UserSideNavbar />
            <div className="pt-24 flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Userlayout