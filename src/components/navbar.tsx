import { ChevronDown, LogOut } from "lucide-react"
import Country from "@/assets/sidebaricon/country.png"
import Notification from "@/assets/sidebaricon/notification.png"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useLocation } from "react-router-dom"
import { useIsMobile } from "../hooks/use-mobile"
import DrawerBar from "./Drawer"
import { AdminDrawerItems, CoordinatorDrawerItems, UserDashboardDrawerItems } from "./DrawerItems"
import { useLogoutUser } from "@/hooks/Uselogouthook"
import { toast } from "sonner"
import { UsegetNotifications } from "@/hooks/getNotificationhook"
import { FaCheckDouble } from "react-icons/fa6";
import { useMarkAsReadNotification } from "@/hooks/MarkAsReadNotification"
import { useState } from "react"
import PaymentModal from "@/components/payment/PaymentModal"
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook"

interface NavbarProps {
  collapsed: boolean;
  role: string
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
  {
    name: "/coordinator-dashboard/add-new-trip",
    subHeading: 'Manage all trips: add, edit, and update their status.'
  },
  {
    name: "/coordinator-dashboard/oppurtunities-management",
    subHeading: 'Manage all trips: add, edit, and update their status.'
  },
  {
    name: "/coordinator-dashboard/applicants-review",
    subHeading: 'Review participant applications, watch intro videos, and approve or reject applicants for each trip.'
  },
  {
    name: "/coordinator-dashboard/achievements-control",
    subHeading: 'Assign and manage achievement badges and adventure points for participants.'
  },
  {
    name: "/coordinator-dashboard/chat-users",
    subHeading: 'Manage and respond to participant conversations'
  },
  {
    name: "/coordinator-dashboard/settings",
  }
]

const Navbar = ({ collapsed, role }: NavbarProps) => {
  const { data, isLoading, isError } = UsegetNotifications()
  const markAsRead = useMarkAsReadNotification();
  const location = useLocation();
  const isMobile = useIsMobile();
  const Logoutmutation = useLogoutUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentTripId, setPaymentTripId] = useState<string | null>(null);
  const [paymentNotificationId, setPaymentNotificationId] = useState<string | null>(null);
  const { data: user } = UsegetCurrentUser();
  const userData = user?.data?.user;

  const DrawerItems = userData?.role === "user"
    ? UserDashboardDrawerItems
    : role === "coordinator"
      ? CoordinatorDrawerItems
      : AdminDrawerItems;
  const displayName = userData?.role === "coordinator" ? userData?.coordinatorDetails?.fullName : userData?.FirstName || "Admin";
  const pathPart = location.pathname.split("/")[2];
  let NavHeading = pathPart ? pathPart.split("-").join(" ") : undefined;
  if (NavHeading === "payment membership") {
    NavHeading = "Payment & Membership";
  }

  const containerPositionClass = isMobile
    ? "left-4 right-4 top-4"
    : `${collapsed ? "left-20" : "left-60"} -right-0 top-6`;


  const Handlelogout = async () => {
    try {
      await Logoutmutation.mutateAsync({ role })
    } catch (error: any) {
      const message = error?.response?.data?.message || "Error on logout";
      toast.error(message)
    }
  }
  return (
    <>
      <header
        className={`absolute z-10 ${containerPositionClass} flex justify-between items-center px-4 md:px-8 transition-all duration-300`}
      >
      {/* Left side */}
      <div className="flex flex-col min-w-0 flex-grow">
        <div className="flex md:items-start items-center justify-between gap-2 lg:gap-4">
          <h1 className="text-[14px] lg:text-2xl font-semibold capitalize mt-2 mb-1 lg:mt-0"><span className="truncate max-w-[60vw] md:max-w-none">{NavHeading ? NavHeading : 'Dashboard'}</span></h1>
        </div>
        {
          SubHeading.map((item) => {
            if (item.name === location.pathname) {
              return <span key={item.name} className="text-[#666373] text-[10px] lg:text-[14px] hidden md:block">{item.subHeading}</span>
            }
          })}
      </div>

      {/* Right side */}
      <div className="flex md:items-center gap-2 lg:gap-3 mt-3 md:mt-0">
        {/* Country icon */}
        <div className="hidden md:flex bg-[#FFFFFF] rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center md:mt-1 cursor-pointer">
          <img src={Country} alt="Country" />
        </div>


        {/* Notification icon */}
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer relative bg-[#FFFFFF] rounded-full w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center md:mt-1">
              <Badge className="font-bold absolute left-6 bottom-6 lg:left-7 lg:bottom-8 bg-[#0DAC87] text-[9px] md:text-[10px] text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                {data?.filter(n => !n.read).length ?? 0}
              </Badge>
              <img src={Notification} alt="Notification" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-80"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {isLoading && (
              <div className="px-3 py-2 text-sm">Loading...</div>
            )}
            {isError && (
              <div className="px-3 py-2 text-sm text-red-500">Error</div>
            )}

            {!isLoading && !isError && data?.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                No Notification
              </div>
            )}

            {!isLoading && !isError && data && data?.length > 0 &&
              data?.map((val) => (
                <div
                  key={val.id}
                  className="px-3 py-2 hover:bg-muted rounded-md"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">{val.title}</span>

                    <FaCheckDouble
                      className={`cursor-pointer ${val.read ? "text-blue-500" : "text-gray-400"
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead.mutate(val.id);
                      }}
                    />
                  </div>

                  <span className="text-sm text-gray-500">
                    {val.description}
                  </span>
                  {/* Pay Now button for approved applications */}
                  {val.title === "Application approved" && val.type === "trip" && (
                    <div className="mt-2 flex justify-end">
                      <button
                        className="text-sm bg-[#0DAC87] text-white px-3 py-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          // parse trip id from description
                          const parts = (val.description || "").split("with trip id ");
                          const tid = parts[1] ? parts[1].trim() : null;
                          if (tid) {
                            setPaymentTripId(tid);
                            setPaymentNotificationId(val.id);
                            setPaymentModalOpen(true);
                          } else {
                            toast.error("Unable to determine trip for payment");
                          }
                        }}
                      >
                        Pay Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar and dropdown (only for regular users) */}
        <div className="flex items-center gap-2 lg:gap-3">
          {userData?.role === "user" && (
            <>
              <Avatar className="w-12 h-12 lg:w-20 lg:h-20">
                <AvatarImage src={user?.data?.user?.avatar || "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col">
                <span className="font-semibold text-base lg:text-xl">{displayName}</span>
                <span className="text-sm text-gray-500">{user?.data?.user?.email}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <div className="lg:p-2 rounded-full hover:bg-gray-100">
                    <ChevronDown />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex flex-col gap-2 items-start cursor-pointer">
                    <div className="flex lg:hidden flex-col">
                      <span className="font-semibold text-sm lg:text-lg">{displayName}</span>
                      <span className="text-sm text-gray-500">{user?.data?.user?.email}</span>
                    </div>
                    <a href="/user-dashboard" className="w-full">
                      <div className="flex justify-start items-center gap-3">
                        <span>My Dashboard</span>
                      </div>
                    </a>
                    <div className="flex justify-start items-center gap-3" onClick={Handlelogout}>
                      <LogOut />
                      Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <DrawerBar items={DrawerItems} />
        </div>

      </div >

      </header >
      {/* Payment Modal */}
      <PaymentModal open={paymentModalOpen} onOpenChange={(v) => setPaymentModalOpen(v)} tripId={paymentTripId} notificationId={paymentNotificationId} />
    </>
  );
};

export default Navbar;