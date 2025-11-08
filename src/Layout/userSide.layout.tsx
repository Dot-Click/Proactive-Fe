import Footer from "@/components/Footer"
import HeroSection from "@/components/userSide/HeroSection/HeroSection"
import UserSideNavbar from "@/components/userSide/Navbar/Navbar"
import { Outlet } from "react-router-dom"

const UserSidelayout = () => {
    return (
        <div className="flex flex-col h-500 justify-between bg-[#FFFFFF]">
            <div className="relative z-10 container mx-auto px-8">
                <UserSideNavbar />
            </div>
            <div className="absolute inset-0">
                <HeroSection />
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default UserSidelayout