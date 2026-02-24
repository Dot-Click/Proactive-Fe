import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import proactive from "../../../assets/proactive-logo.png";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DrawerBar from "@/components/Drawer";
import { UserSideDrawerItems } from "@/components/DrawerItems";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { UsegetCurrentUser } from '@/hooks/getCurrentUserhook'
import { useLogoutUser } from '@/hooks/Uselogouthook'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge";
import { RiCheckDoubleLine } from "react-icons/ri";
import { FaCheckDouble } from "react-icons/fa";
import { UsegetNotifications } from "@/hooks/getNotificationhook";
import { useMarkAsReadNotification } from "@/hooks/MarkAsReadNotification";
import { LayoutDashboard, Wallet, Settings, LogOut, Compass } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PaymentModal from "@/components/userDashboard/Alert/PaymentModal";
import NotificationIconAsset from "../../../assets/sidebaricon/notification.png";
import TripPaymentModal from "@/components/payment/TripPaymentModal";
// import { UserDashboardDrawerItems } from "@/components/DrawerItems";

const UserSideNavbar = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate()
    const { data: user } = UsegetCurrentUser()
    const logout = useLogoutUser()
    const userData = user?.data?.user
    const DrawerItems = [
        ...UserSideDrawerItems,
        ...(userData?.role === "user" ? [
            { label: "My Dashboard", href: "/user-dashboard" },
            { label: "Adventure Opportunities", href: "/user-dashboard/adventure-oppurtunities" }
        ] : [])
    ];

    const { data: notifications, isLoading: notificationsLoading } = UsegetNotifications()
    const markAsRead = useMarkAsReadNotification();
    const [showAllNotifications, setShowAllNotifications] = useState(true);
    const [openPayment, setOpenPayment] = useState(false);
    const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const displayName = userData?.role === "coordinator" ? userData?.coordinatorDetails?.fullName : userData?.FirstName || userData?.email || "User";

    return (
        <>
            <div className="flex justify-between items-center gap-8 px-6 mt-6 absolute top-0 left-0 right-0 container mx-auto z-10">
                <Link to="/" className="shrink-0 flex items-center">
                    <img src={proactive} alt="proactive" className="lg:h-10 h-6 w-auto" />
                </Link>

                <div className="hidden bg-[#FFFFFF]/75 shadow-lg lg:flex items-center px-4 py-2 rounded-full gap-6 cursor-pointer">

                    <Link to="/">
                        <span
                            className={`${location.pathname === "/"
                                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold"
                                : ""
                                }`}
                        >
                            {t('navbar.home')}
                        </span>
                    </Link>
                    <Link to="/open-oppurtunities">
                        <span
                            className={`text-nowrap ${location.pathname ===
                                "/open-oppurtunities"
                                ? "bg-[#000000] rounded-full px-6 py-2 text-white font-semibold text-nowrap"
                                : ""
                                }`}
                        >
                            {t('navbar.openOpportunities')}
                        </span>
                    </Link>
                    <div
                        className={`rounded-full px-4 py-2 font-semibold ${location.pathname === "/what-we-do" ? "bg-[#0DAC87] text-white" : "bg-[#000000] text-white"}`}>
                        <span className="flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <Link to="/what-we-do">
                                        <div className="flex gap-1 items-center text-nowrap">
                                            {t('navbar.whatWeDo')}
                                            <ChevronDown className='w-4 h-4' />
                                        </div>
                                    </Link>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#FFFFFF]/95 flex flex-col justify-center items-center px-4 mt-4">
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <Link to="/wild-weekend">
                                        <DropdownMenuItem className="cursor-pointer text-[#332A2A]">{t('navbar.wildWeekend')}</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <Link to={'/wild-trip'}>
                                        <DropdownMenuItem className="cursor-pointer text-[#332A2A]">{t('navbar.wildTrip')}</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <Link to={'/erasmus-plus'}>
                                        <DropdownMenuItem className="cursor-pointer text-[#332A2A]">{t('navbar.erasmusPlus')}</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator className="my-1 w-full border-t border-[#CECECE]" />
                                    <Link to={'/internal-events'}>
                                        <DropdownMenuItem className="cursor-pointer text-[#332A2A]">{t('navbar.internalEvents')}</DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </span>
                    </div>
                    <div
                        className="bg-[#000000] rounded-full px-4 py-2 text-white font-semibold">
                        <span className="flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <div className="flex gap-1 items-center">
                                        <span>{t('navbar.info')}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="bg-[#FFFFFF]/95 mt-4 p-4">
                                    <div className="flex gap-8">

                                        {/*  Info */}
                                        <div className="flex flex-col min-w-[160px]">
                                            <span className="text-xs font-semibold text-gray-400 mb-2">{t('navbar.info').toUpperCase()}</span>

                                            <Link to="/about">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    {t('navbar.aboutUs')}
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/member">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    {t('navbar.becomeMember')}
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/travel-coordinator">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    {t('navbar.coordinators')}
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/advantages">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    {t('navbar.benefits')}
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/contact">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    {t('navbar.contact')}
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/faq">
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    {t('navbar.faq')}
                                                </DropdownMenuItem>
                                            </Link>
                                        </div>

                                        {/* Community */}
                                        <div className="flex flex-col min-w-[180px]">
                                            <span className="text-xs font-semibold text-gray-400 mb-2">
                                                {t('navbar.community')}
                                            </span>

                                            <a
                                                href="WHATSAPP_LINK_HERE"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    <BsWhatsapp className="w-4 h-4" /> {t('navbar.whatsappCommunity')}
                                                </DropdownMenuItem>
                                            </a>

                                            <a
                                                href="TELEGRAM_LINK_HERE"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <DropdownMenuItem className="cursor-pointer text-[#332A2A]">
                                                    <BsTelegram className="w-4 h-4" /> {t('navbar.telegramBroadcast')}
                                                </DropdownMenuItem>
                                            </a>
                                        </div>

                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </span>
                    </div>
                </div>

                <div className="lg:flex hidden items-center gap-4">
                    <LanguageSwitcher />
                    {userData?.role === "user" ? (
                        <div className="flex items-center gap-4">
                            {!userData?.membershipAvailable && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="bg-[#0DAC87] hover:bg-[#11a180] text-white rounded-full px-6 py-2 font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer items-center gap-2">
                                            <Wallet size={16} />
                                            Become a Member (€50)
                                        </Button>
                                    </DialogTrigger>
                                    <PaymentModal />
                                </Dialog>
                            )}

                            {/* Notifications */}
                            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                                <DropdownMenuTrigger asChild>
                                    <div className="cursor-pointer relative bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-colors">
                                        <Badge className="font-bold absolute -top-1 -right-1 bg-black text-[10px] text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                            {notifications?.filter((n: any) => !n.read).length || '0'}
                                        </Badge>
                                        <img src={NotificationIconAsset} alt="Notification" className="w-5 h-5 invert" />
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-80 lg:w-96 max-h-[500px] overflow-y-auto">
                                    <div className="px-4 py-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                                Notifications
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <RiCheckDoubleLine className="text-black w-5 h-5" />
                                                <span
                                                    onClick={() => {
                                                        const unreadIds = notifications?.filter((n: any) => !n.read).map((n: any) => n.id as string) || [];
                                                        if (unreadIds.length > 0) markAsRead.mutate(unreadIds);
                                                    }}
                                                    className="underline cursor-pointer text-[#060A14] font-semibold text-sm"
                                                >
                                                    {notificationsLoading ? "Loading..." : "Mark all as read"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-4 cursor-pointer text-sm">
                                            <span
                                                onClick={() => setShowAllNotifications(true)}
                                                className={`${showAllNotifications ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
                                            >
                                                All
                                            </span>
                                            <span
                                                onClick={() => setShowAllNotifications(false)}
                                                className={`${!showAllNotifications ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
                                            >
                                                Unread
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-100" />

                                    {(showAllNotifications ? notifications : notifications?.filter((n: any) => !n.read))?.map((notification: any) => (
                                        <div key={notification.id} className="p-2">
                                            <div className={`rounded-lg p-3 transition-colors ${notification.read ? 'bg-white' : 'bg-gray-50'}`}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-bold text-xs">{notification.title}</span>
                                                    {!notification.read && <div className="w-2 h-2 bg-[#0DAC87] rounded-full shrink-0 mt-1" />}
                                                </div>
                                                <p className="text-gray-500 text-xs mb-3">{notification.description}</p>
                                                <div className="flex justify-between items-center">
                                                    {notification.type === "trip" && notification.title === "Application approved" && (
                                                        <Button
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const tripId = notification.description.split("with trip id ")[1];
                                                                setSelectedTripId(tripId);
                                                                setDropdownOpen(false);
                                                                setOpenPayment(true);
                                                            }}
                                                            className="bg-[#0DAC87] hover:bg-[#109c7c] h-7 text-[10px] rounded-full px-3"
                                                        >
                                                            Pay Now
                                                        </Button>
                                                    )}
                                                    <FaCheckDouble
                                                        className={`cursor-pointer ml-auto w-4 h-4 ${notification.read ? "text-blue-500" : "text-gray-300"}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            markAsRead.mutate(notification.id);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!notifications || notifications.length === 0) && (
                                        <div className="py-8 text-center text-gray-400 text-sm">No notifications yet</div>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-white shadow-sm">
                                    <AvatarImage src={userData?.avatar || 'https://github.com/shadcn.png'} />
                                    <AvatarFallback>{(userData?.FirstName || userData?.email || 'U').charAt(0)}</AvatarFallback>
                                </Avatar>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="cursor-pointer">
                                        <div className="flex flex-col text-left">
                                            <span className="font-bold text-sm lg:text-base leading-tight">{displayName}</span>
                                            <span className="text-xs text-gray-500 truncate max-w-[120px]">{userData?.email}</span>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuItem onClick={() => navigate('/user-dashboard')} className="cursor-pointer gap-2">
                                            <LayoutDashboard className="w-4 h-4 text-[#0DAC87]" /> My Dashboard
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate('/user-dashboard/adventure-oppurtunities')} className="cursor-pointer gap-2">
                                            <Compass className="w-4 h-4 text-[#0DAC87]" /> Adventure Opportunities
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate('/user-dashboard/user-settings')} className="cursor-pointer gap-2">
                                            <Settings className="w-4 h-4 text-gray-400" /> Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => logout.mutate({ role: 'user' })} className="cursor-pointer text-red-600 gap-2">
                                            <LogOut className="w-4 h-4" /> Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Button onClick={() => navigate("/login")} className="bg-light text-black hover:bg-[#c5e4dc] cursor-pointer px-7 py-6 font-bold rounded-full">{t('navbar.logIn')}</Button>
                            <Button onClick={() => navigate("/signup")} className="bg-[#0DAC87] hover:bg-[#0fa17f] border border-[#FFFFFF]/64 cursor-pointer px-7 py-6 font-bold rounded-full">{t('navbar.joinNow')}</Button>
                        </>
                    )}
                </div>

                <div className="lg:hidden flex items-center gap-3">
                    <LanguageSwitcher />
                    <DrawerBar items={DrawerItems} />
                </div>

            </div>

            <Dialog open={openPayment} onOpenChange={(val) => {
                setOpenPayment(val);
                if (!val) setSelectedTripId(null);
            }}>
                {selectedTripId && <TripPaymentModal tripId={selectedTripId} />}
            </Dialog>
        </>
    )
}

export default UserSideNavbar;
