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

const UserSideNavbar = ({ role }: { role: string }) => {
    const location = useLocation();
    const { t } = useTranslation();
    const DrawerItems = role === "UserSide"
        ? UserSideDrawerItems
        : [];
    const navigate = useNavigate()
    const { data: user } = UsegetCurrentUser()
    const logout = useLogoutUser()
    const userData = user?.data?.user
    return (
        <>
            <div className="flex justify-between items-center gap-8 px-6 mt-6 absolute top-0 left-0 right-0 container mx-auto z-10">
                <img src={proactive} alt="proactive" className="lg:h-10 h-5 lg:flex hidden" />

                <div className="hidden bg-[#FFFFFF]/75 shadow-lg lg:flex items-center px-4 py-2 rounded-full gap-6 cursor-pointer">
                    {userData?.role === "user" && (
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
                    )}
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
                        <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12 lg:w-16 lg:h-16">
                                <AvatarImage src={userData?.avatar || 'https://github.com/shadcn.png'} />
                                <AvatarFallback>{(userData?.FirstName || userData?.email || 'U').charAt(0)}</AvatarFallback>
                            </Avatar>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <div className="flex flex-col text-left">
                                        <span className="font-semibold text-base lg:text-lg">{userData?.FirstName || userData?.coordinatorDetails?.fullName || userData?.email}</span>
                                        <span className="text-sm text-gray-500">{userData?.email}</span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => navigate('/user-dashboard')}>My Dashboard</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => logout.mutate({ role: 'user' })}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
        </>
    )
}

export default UserSideNavbar
