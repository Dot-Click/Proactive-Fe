import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AdminLayout from "./Layout/admin.layout";
import DashboardPage from "./pages/admin/Dashboard.page";
import UserManagementPage from "./pages/admin/UserManagement.page";
import CoordinatorPage from "./pages/admin/Coordinator.page";
import AddnewcoordinatorPage from "./pages/admin/Addnewcoordinator.page";
import EditCoordinatorPage from "./pages/admin/Editcoordinator.page";
import TripOppurtunitiesPage from "./pages/admin/Tripoppurtunities.page";
import AddtripPage from "./pages/admin/Addtrip.page";
import ChatManagementPage from "./pages/admin/ChatManagement.page";
import PaymentmembershipPage from "./pages/admin/Paymentmembership.page";
import SettingPage from "./pages/admin/Setting.page";
import CoordinatorLayout from "./Layout/coordinator.layout";
import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import AddCoordinatortripPage from "./pages/coordinator/AddCoordinatortrip.page";
import OppurtunitiesManagementPage from "./pages/coordinator/OppurtunitiesManagement.page";
import EditTripPage from "./pages/coordinator/EditTrip.page";
import ViewTripPage from "./pages/coordinator/ViewTrip.page";
import ApplicantsReviewPage from "./pages/coordinator/ApplicantsReview.page";
import AchievementControlPage from "./pages/coordinator/AchievementControl.page";
import ChatUserPage from "./pages/coordinator/ChatUser.page";
import CoordinatorSettingPage from "./pages/coordinator/Setting.page";
import LoginPage from "./pages/loginpage/login.page";
import SignupPage from "./pages/loginpage/Signup.page";
import ForgetPassPage from "./pages/loginpage/ForgetPass.page";
import Userlayout from "./Layout/user.layout";
import UserdashboardPage from "./pages/userdashboard/Userdashboard.page";
import AdventureOppurtunitiesPage from "./pages/userdashboard/Adventureoppurtunities.page";
import ViewDetailTripPage from "./pages/userdashboard/ViewDetailtrip.page";
import UserSettingPage from "./pages/settings/Setting.page";
import UserSidelayout from "./Layout/userSide.layout";
import HomePage from "./pages/userSide/home.page";
import OpenOppurtunitiesPage from "./pages/userSide/openoppurtunities.page";
import WhatWeDoPage from "./pages/userSide/WhatWeDo.page";
import WildweekendPage from "./pages/userSide/Wildweekend.page";
import WildtripPage from "./pages/userSide/Wildtrip.page";
import ErasmusPage from "./pages/userSide/Erasmus.page";
import InternaleventsPage from "./pages/userSide/Internalevents.page";
import AboutPage from "./pages/userSide/About.page";
import BecomeMemberPage from "./pages/userSide/BecomeMember.page";
import TravelCoordinatorPage from "./pages/userSide/TravelCoordinator.page";
import BenefitPage from "./pages/userSide/Benefit.page";
import ContactPage from "./pages/userSide/Contact.page";
import FaqPage from "./pages/userSide/Faq.page";
import PrivacyPolicyPage from "./pages/userSide/PrivacyPolicy.page";
import TermsPage from "./pages/userSide/Terms.page";
import CookiePolicyPage from "./pages/userSide/CookiePolicy.page";
import VerifyEmail from "./components/login/VerifyEmail";
import ResetPassword from "./components/login/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgetPassword" element={<ForgetPassPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route
          path="/dashboard/user-management"
          element={<UserManagementPage />}
        />
        <Route
          path="/dashboard/coordinator-management"
          element={<CoordinatorPage />}
        />
        <Route
          path="/dashboard/add-new-coordinator"
          element={<AddnewcoordinatorPage />}
        />
        <Route
          path="/dashboard/edit-coordinator/:id"
          element={<EditCoordinatorPage />}
        />
        <Route
          path="/dashboard/trip-management"
          element={<TripOppurtunitiesPage />}
        />
        <Route path="/dashboard/add-new-trip" element={<AddtripPage />} />
        <Route
          path="/dashboard/chat-management"
          element={<ChatManagementPage />}
        />
        <Route
          path="/dashboard/payment-membership"
          element={<PaymentmembershipPage />}
        />
        <Route path="/dashboard/settings" element={<SettingPage />} />
      </Route>

      {/* Coordinator Dashboard */}
      <Route
        path="/coordinator-dashboard"
        element={
          <ProtectedRoute allowedRoles={["coordinator"]}>
            <CoordinatorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CoordinatorDashboard />} />
        <Route
          path="/coordinator-dashboard/add-new-trip"
          element={<AddCoordinatortripPage />}
        />
        <Route
          path="/coordinator-dashboard/oppurtunities-management"
          element={<OppurtunitiesManagementPage />}
        />
        <Route
          path="/coordinator-dashboard/edit-trip/:id"
          element={<EditTripPage />}
        />
        <Route
          path="/coordinator-dashboard/view-trip/:id"
          element={<ViewTripPage />}
        />
        <Route
          path="/coordinator-dashboard/applicants-review"
          element={<ApplicantsReviewPage />}
        />
        <Route
          path="/coordinator-dashboard/achievements-control"
          element={<AchievementControlPage />}
        />
        <Route
          path="/coordinator-dashboard/chat-users"
          element={<ChatUserPage />}
        />
        <Route
          path="/coordinator-dashboard/settings"
          element={<CoordinatorSettingPage />}
        />
      </Route>

      {/* User Dashboard */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Userlayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserdashboardPage />} />
        <Route
          path="/user-dashboard/adventure-oppurtunities"
          element={<AdventureOppurtunitiesPage />}
        />
        <Route
          path="/user-dashboard/viewdetail/:id"
          element={<ViewDetailTripPage />}
        />
        <Route
          path="/user-dashboard/user-settings"
          element={<UserSettingPage />}
        />
      </Route>

      {/* Landing Page */}
      <Route path="/" element={<UserSidelayout />}>
        <Route index element={<HomePage />} />
        <Route path="/open-oppurtunities" element={<OpenOppurtunitiesPage />} />
        <Route path="/what-we-do" element={<WhatWeDoPage />} />
        <Route path="/wild-weekend" element={<WildweekendPage />} />
        <Route path="/wild-trip" element={<WildtripPage />} />
        <Route path="/erasmus-plus" element={<ErasmusPage />} />
        <Route path="/internal-events" element={<InternaleventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/member" element={<BecomeMemberPage />} />
        <Route path="/travel-coordinator" element={<TravelCoordinatorPage />} />
        <Route path="/advantages" element={<BenefitPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
