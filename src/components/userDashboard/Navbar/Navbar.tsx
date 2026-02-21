import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RiCheckDoubleLine } from "react-icons/ri";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import proactive from "../../../assets/proactive-logo.png";
import Notification from "../../../assets/sidebaricon/notification.png";
import PayNow from "@/components/Adventureoppurtunities/ViewDetailtrip/PayNow";
import { UserDashboardDrawerItems } from "@/components/DrawerItems";
import DrawerBar from "@/components/Drawer";
import { useLogoutUser } from "@/hooks/Uselogouthook";
import { toast } from "sonner";
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook";
import { FaCheckDouble } from "react-icons/fa";
import { UsegetNotifications } from "@/hooks/getNotificationhook";
import { useMarkAsReadNotification } from "@/hooks/MarkAsReadNotification";

interface NavbarProps {
  role: string
}
const Navbar = ({ role }: NavbarProps) => {
  const DrawerItems = role === "user-dashboard"
    ? UserDashboardDrawerItems
    : [];
  const { data: notifications, isLoading: notificationsLoading } = UsegetNotifications()
  const markAsRead = useMarkAsReadNotification();
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const Logoutmutation = useLogoutUser();
  const { data: user } = UsegetCurrentUser();
  const userData = user?.data?.user;
  const displayName = userData?.role === "coordinator" ? userData?.coordinatorDetails?.fullName : userData?.FirstName || "Admin";

  const Handlelogout = async () => {
    try {
      await Logoutmutation.mutateAsync({ role: 'user' })
    } catch (error: any) {
      const message = error?.response?.data?.message || "Error on logout";
      toast.error(message)
    }
  }


  return (
    <>
      <div className="flex lg:justify-between lg:items-center justify-center items-center gap-6 mt-6">
        <img src={proactive} alt="proactive" className="h-10 hidden lg:flex" />

        <div className="hidden bg-[#FFFFFF] shadow-md lg:flex items-center px-4 py-3 rounded-full gap-6 cursor-pointer">
          <Link to="/">
            <span
              className={`${location.pathname === "/"
                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold"
                : ""
                }`}
            >
              Home
            </span>
          </Link>

          <Link to="/open-oppurtunities">
            <span
              className={`${location.pathname === "/open-oppurtunities"
                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold"
                : ""
                }`}
            >
              Open Opportunities
            </span>
          </Link>

          <Link to="/user-dashboard">
            <span
              className={`${location.pathname === "/user-dashboard"
                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold"
                : ""
                }`}
            >
              Dashboard
            </span>
          </Link>

          <Link to="/user-dashboard/adventure-oppurtunities">
            <span
              className={`${location.pathname ===
                "/user-dashboard/adventure-oppurtunities"
                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold"
                : ""
                }`}
            >
              Opportunities
            </span>
          </Link>

          
        </div>

        <div className="flex gap-4">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer relative bg-[#F2FBF9] rounded-full w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center md:mt-1">
                <Badge className="font-bold absolute left-6 bottom-6 lg:left-7 lg:bottom-8 bg-[#000000] text-[9px] md:text-[10px] text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {notifications?.filter((n: any) => !n.read).length || '0'}
                </Badge>
                <img src={Notification} alt="Notification" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-100">
              <div className="px-4 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                    Notification
                  </span>
                  <div className="flex items-center gap-1">
                    <RiCheckDoubleLine color="#000000" size={20} />
                    <span 
                      onClick={() => {
                        const unreadIds = notifications?.filter((n: any) => !n.read).map((n: any) => n.id as string) || [];
                        if (unreadIds && unreadIds.length > 0) {
                          markAsRead.mutate(unreadIds);
                        }
                      }} 
                      className="underline cursor-pointer text-[#060A14] font-semibold"
                    >
                      {notificationsLoading ? "Loading..." : "Mark all as read"}
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4 cursor-pointer">
                  <span
                    onClick={() => setShow(true)}
                    className={`${show
                      ? "border-b-2 mt-1 border-[#000000] font-medium"
                      : "text-[#606066]"
                      }`}
                  >
                    All Notification
                  </span>
                  <span
                    onClick={() => setShow(false)}
                    className={`${show
                      ? "text-[#606066]"
                      : "border-b-2 mt-1 border-[#000000] font-medium"
                      }`}
                  >
                    Unread
                  </span>
                </div>
              </div>

              <div className="border-b border-[#D9D9D9] -mt-[16px]" />

              {/* Notification Item */}
              {(show ? notifications : notifications?.filter((n: any) => !n.read))?.map((notification: any) => (
                <div className="px-2 py-2">
                <div className="bg-[#F4F4F4] rounded-[10px] px-4 py-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[12px]">
                      {notification.title}
                    </span>
                    <div className="w-2 h-2 bg-[#0DAC87] rounded-full" />
                  </div>

                  <div className="flex flex-col items-start gap-4 mt-2">
                    <span className="text-[#787878] text-[12px]">
                      {notification.description.split("with payment.")[0] + "with payment."}
                    </span>
                    {notification.type === "trip" && notification.title === "Application approved" && <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        const tripId = notification.description.split("with trip id ")[1];
                        setSelectedTripId(tripId);
                        setDropdownOpen(false);
                        setOpen(true);
                      }}
                      className="rounded-full px-6 bg-[#0DAC87] cursor-pointer hover:bg-[#109c7c]"
                    >
                      Pay Now
                    </Button>
                    }
                    <FaCheckDouble
                      className={`cursor-pointer ${notification.read ? "text-blue-500" : "text-gray-400"
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead.mutate(notification.id);
                      }}
                    />  
                  </div>
                </div>
              </div>
              ))}

            </DropdownMenuContent>
          </DropdownMenu>

          {userData?.role === "user" && (
            <div className="flex items-center gap-2 lg:gap-3">
              <Avatar className="w-10 h-10 lg:w-16 lg:h-16 bg-red-500">
                <AvatarImage src={user?.data?.user?.avatar}/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col">
                <span className="font-semibold text-sm lg:text-lg">{displayName}</span>
                <span className="text-sm text-gray-500">{user?.data?.user?.email}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <div className="rounded-full hover:bg-gray-100">
                    <ChevronDown color="#A6AAC9" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>

                  <div className="lg:hidden flex flex-col px-3 py-2">
                    <span className="font-semibold text-sm lg:text-lg">{displayName}</span>
                    <span className="text-sm text-gray-500">{user?.data?.user?.email}</span>
                  </div>

                  <div className="flex flex-col">
                          <DropdownMenuItem asChild>
                            <div onClick={Handlelogout} className="inline-flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
                              <LogOut />
                              Logout
                            </div>
                          </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        to="/user-dashboard/user-settings"
                        className="inline-flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        <Settings />
                        Setting
                      </Link>
                    </DropdownMenuItem>
                  </div>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

        </div>

        <div className="lg:hidden flex">
          <DrawerBar items={DrawerItems} />
        </div>

      </div>

      <Dialog open={open} onOpenChange={(val) => {
        setOpen(val);
        if (!val) setSelectedTripId(null);
      }}>
        <PayNow tripId={selectedTripId} />
      </Dialog>

    </>
  );
};

export default Navbar;
