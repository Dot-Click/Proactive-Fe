import Footer from "@/components/Footer"
import HeroSection from "@/components/userSide/HeroSection/HeroSection"
import UserSideNavbar from "@/components/userSide/Navbar/Navbar"
import { Outlet } from "react-router-dom"

const UserSidelayout = () => {

    return (
        <div className="flex flex-col  bg-[#FFFFFF]">
            <div className="relative lg:h-[500px] h-[300px]">
                <UserSideNavbar />
                <HeroSection/>
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default UserSidelayout