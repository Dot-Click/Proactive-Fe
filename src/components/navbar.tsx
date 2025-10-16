import { ChevronDown, LogOut } from "lucide-react"
import Country from "@/assets/sidebaricon/country.png"
import Notification from "@/assets/sidebaricon/notification.png"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useLocation } from "react-router-dom"
import { useIsMobile } from "../hooks/use-mobile"
import DrawerBar from "./Drawer"

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
  {
    name: "/dashboard/chat-management",
    subHeading: 'Monitor and manage all user & coordinator conversations. Control chat widget visibility.'
  },
  {
    name: "/dashboard/payment-membership",
    subHeading: 'Manage all payments, membership statuses, and discount codes from one place.'
  },
  {
    name: "/dashboard/settings",
    subHeading: 'Welcome back, Admin'
  },
  {
    name: "/coordinator-dashboard",
    subHeading: 'Monitor, approve, and manage all trips created by coordinators.'
  },
]
const Navbar = ({ collapsed }: NavbarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  let NavHeading = location.pathname.split("/")[2]?.split("-").join(" ");
  if (NavHeading === "payment membership") {
    NavHeading = "Payment & Membership";
  }

  const containerPositionClass = isMobile
    ? "left-4 right-4 top-4"
    : `${collapsed ? "left-20" : "left-60"} -right-0 top-6`;

  return (
    <header
      className={`absolute z-10 ${containerPositionClass} flex lg:flex-row flex-col justify-between items-center px-4 md:px-8 transition-all duration-300`}
    >
      {/* Left side */}
      <div className="flex flex-col  min-w-0">
        <div className="flex md:items-start items-center justify-between gap-2 md:gap-4">
          <h1 className="text-lg md:text-2xl font-semibold capitalize truncate max-w-[60vw] md:max-w-none mb-2 md:mb-0">{NavHeading ? NavHeading : 'Dashboard'}</h1>
          <DrawerBar />
        </div>
        {
          SubHeading.map((item) => {
            if (item.name === location.pathname) {
              return <span key={item.name} className="text-[#666373] text-[12px] md:text-[14px] hidden lg:block truncate">{item.subHeading}</span>
            }
          })}
      </div>

      {/* Right side */}
      <div className="flex md:items-center items-center gap-2 md:gap-4">
        {/* Country icon */}
        <div className="hidden md:flex bg-[#FFFFFF] rounded-full w-10 h-10 md:w-14 md:h-14 items-center justify-center mt-2 cursor-pointer">
          <img src={Country} alt="Country" />
        </div>

        {/* Notification icon */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="cursor-pointer relative bg-[#FFFFFF] rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mt-2">
              <Badge className="absolute left-6 bottom-5 md:left-7 md:bottom-8 bg-[#0DAC87] text-[9px] md:text-[10px] text-white rounded-full w-4 h-4 md:w-4 md:h-4 flex items-center justify-center">
                3
              </Badge>
              <img src={Notification} alt="Notification" />
              <DropdownMenuContent className="w-72">
                <DropdownMenuItem className="cursor-pointer">
                  <Avatar className="lg:w-8 lg:h-8 mr-2">
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
        <div className="flex items-center gap-2 md:gap-4">
          <Avatar className="w-10 h-10 md:w-16 md:h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col">
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
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
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