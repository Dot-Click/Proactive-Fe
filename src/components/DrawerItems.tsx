import Dashboard from "@/assets/sidebaricon/dashboard.png";
import UserManagement from "@/assets/sidebaricon/user-management.png";
import Coordinator from "@/assets/sidebaricon/coordinator-management.png";
import Trip from "@/assets/sidebaricon/trip-oppurtunities.png";
import Chat from "@/assets/sidebaricon/chat-management.png";
import Payment from "@/assets/sidebaricon/payment-membership.png";
import Settings from "@/assets/sidebaricon/settings.png";
import CoordinatorDashboard from "@/assets/sidebaricon/dashboard.png";
import oppurtunityManagement from "@/assets/sidebaricon/oppurtunity.png";
import Applicants from "@/assets/sidebaricon/ApplicantReview.png";
import Achievement from "@/assets/sidebaricon/Achievement.png";
import CoordinatorChat from "@/assets/sidebaricon/coordinatormsg.png";
import CoordinatorSettings from "@/assets/sidebaricon/settings.png";


export const AdminDrawerItems = [
    { label: "Dashboard", href: "/dashboard", Icon: Dashboard },
    { label: "User Management", href: "/dashboard/user-management", Icon: UserManagement },
    { label: "Coordinator Management", href: "/dashboard/coordinator-management", Icon: Coordinator },
    { label: "Trip Opportunities", href: "/dashboard/trip-management", Icon: Trip },
    { label: "Chat Management", href: "/dashboard/chat-management", Icon: Chat },
    { label: "Payment & Membership", href: "/dashboard/payment-membership", Icon: Payment },
    { label: "Settings", href: "/dashboard/settings", Icon: Settings },
];

export const CoordinatorDrawerItems = [
    { label: "Dashboard", href: "/coordinator-dashboard", Icon: CoordinatorDashboard },
    { label: "Opportunity Management", href: "/coordinator-dashboard/oppurtunities-management", Icon: oppurtunityManagement },
    { label: "Applicants Review", href: "/coordinator-dashboard/applicants-review", Icon: Applicants },
    { label: "Achievement Control", href: "/coordinator-dashboard/achievements-control", Icon: Achievement },
    { label: "Chats with Users", href: "/coordinator-dashboard/chat-users", Icon: CoordinatorChat },
    { label: "Settings", href: "/coordinator-dashboard/settings", Icon: CoordinatorSettings },
];

export const UserDashboardDrawerItems = [
    { label: "Dashboard", href: "/user-dashboard" },
    { label: "Opportunities", href: "/user-dashboard/adventure-oppurtunities" },
];

export const UserSideDrawerItems = [
    { label: "Dashboard", href: "/" },
    { label: "Open Opportunities", href: "/open-oppurtunities" },
    { label: "Wild Weekend", href: "/wild-weekend"},
    { label: "Wild Trip", href: "/wild-trip" },
    { label: "Erasmus+", href: "/erasmus-plus"},
    { label: "Internal Events", href: "/internal-events"},
    { label: "About Us", href: "/about"},
    { label: "Become a Member", href: "/member"},
    { label: "Coordinators", href: "/travel-coordinator"},
    { label: "Benefits", href: "/advantages"},
    { label: "Contact", href: "/contact"},
    { label: "FAQ", href: "/faq"},
];