import { ChevronDown, LogOut } from "lucide-react"
import Country from "../assets/sidebaricon/Country.png"
import Notification from "../assets/sidebaricon/Notification.png"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useLocation } from "react-router-dom"

// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { ChevronDown, LogOut } from "lucide-react";
// import { useLocation } from "react-router-dom";
// import Country from "@/assets/country.png";
// import Notification from "@/assets/notification.png";

interface NavbarProps {
  collapsed: boolean;
}

const SubHeading = [
  {
    name: "/dashboard",
    subHeading: 'Good afternoon, Will! Here’s what’s happening today.'
  },
  {
    name: "/dashboard/user-management",
    subHeading: 'All registered users and their details at a glance.'
  },
  {
    name: "/dashboard/coordinator-management",
    subHeading: 'Monitor performance and assigned responsibilities'
  },
  {
    name: "/dashboard/add-new-coordinator",
    subHeading: 'Fill in the details to onboard a new coordinator to the platform.'
  },
  {
    name: "/dashboard/edit-coordinator/:id",
    subHeading: 'Edit the details to update this coordinator’s profile'
  },
  {
    name: "/dashboard/trip-management",
    subHeading: 'Monitor, approve, and manage all trips created by coordinators.'
  },
  {
    name: "/dashboard/add-new-trip",
    subHeading: 'Manage all trips: add, edit, and update their status.'
  },
]
const Navbar = ({ collapsed }: NavbarProps) => {
  const location = useLocation();
  const NavHeading = location.pathname.split("/")[2]?.split("-").join(" ");

  return (
    <header
      className={`fixed top-6 -right-8 flex justify-between items-center px-8 transition-all duration-300 ${collapsed ? "left-20" : "left-60"
        }`}
    >
      {/* Left side */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold capitalize">{NavHeading ? NavHeading : 'Dashboard'}</h1>
        {
          SubHeading.map((item) => {
            if (item.name === location.pathname) {
              return <span key={item.name} className="text-[#666373] text-[14px]">{item.subHeading}</span>
            }
          })}
      </div>

      {/* Right side */}
      <div className="flex gap-4">
        {/* Country icon */}
        <div className="flex bg-[#FFFFFF] rounded-full w-14 h-14 items-center justify-center mt-2 cursor-pointer">
          <img src={Country} alt="Country" />
        </div>

        {/* Notification icon */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="cursor-pointer relative bg-[#FFFFFF] rounded-full w-14 h-14 flex items-center justify-center mt-2">
              <Badge className="absolute left-7 bottom-8 bg-[#0DAC87] text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center">
                3
              </Badge>
              <img src={Notification} alt="Notification" />
              <DropdownMenuContent className="w-72">
                <DropdownMenuItem className="cursor-pointer">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  New Notification from <span className="font-semibold">Pachums</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  New Notification from <span className="font-semibold">Pachums</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  New Notification from <span className="font-semibold">Pachums</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>

        {/* Avatar and dropdown */}
        <div className="flex gap-4 items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">Pachums</span>
            <span className="text-sm text-gray-500">Pachums@gmail.com</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <div className="p-2 rounded-full hover:bg-gray-100">
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer ">
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div >
    </header >
  );
};

export default Navbar;