import Footer from "@/components/Footer"
import HeroSection from "@/components/userSide/Home/HeroSection/HeroSection"
import UserSideNavbar from "@/components/userSide/Navbar/Navbar"
import HeroSectionOppurtunities from "@/components/userSide/OpenOppurtunities/HeroSection/HeroSection"
import { Outlet, useLocation } from "react-router-dom"

const UserSidelayout = () => {
const location = useLocation()
console.log(location);

    return (
        <div className="flex flex-col  bg-[#FFFFFF]">
            <div className="relative">
                <UserSideNavbar />
                {
                    location.pathname === '/' ? <HeroSection /> : <HeroSectionOppurtunities/>
                }
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default UserSidelayout