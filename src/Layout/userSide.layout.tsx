import { useEffect } from "react"
import Footer from "@/components/Footer"
import HeroSection from "@/components/userSide/HeroSection/HeroSection"
import UserSideNavbar from "@/components/userSide/Navbar/Navbar"
import { Outlet, useLocation } from "react-router-dom"

const UserSidelayout = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <div className="flex flex-col min-h-screen w-full bg-[#FFFFFF]">
            <div className="relative shrink-0">
                <UserSideNavbar role="UserSide" />
                <HeroSection />
            </div>
            <main className="flex-1 min-h-0">
                <Outlet />
            </main>
            <footer className="w-full shrink-0">
                <Footer />
            </footer>
        </div>
    )
}

export default UserSidelayout