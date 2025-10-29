import Footer from "@/components/Footer"
import Navbar from "@/components/userDashboard/Navbar/Navbar"
import { Outlet } from "react-router-dom"

const Userlayout = () => {
    return (
        <div className="flex flex-col justify-between bg-[#FFFFFF]">
            <div className="container mx-auto px-16">
                <Navbar />
            </div>
            <Outlet/>
            <Footer />
        </div>
    )
}

export default Userlayout