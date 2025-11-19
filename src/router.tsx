import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import WildweekendPage from "./pages/userSide/Wildweekend.page";
import WildtripPage from "./pages/userSide/Wildtrip.page";
import ErasmusPage from "./pages/userSide/Erasmus.page";
import InternaleventsPage from "./pages/userSide/Internalevents.page";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgetPassword" element={<ForgetPassPage />} />

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard/user-management" element={<UserManagementPage />} />
          <Route path="/dashboard/coordinator-management" element={<CoordinatorPage />} />
          <Route path="/dashboard/add-new-coordinator" element={<AddnewcoordinatorPage />} />
          <Route path="/dashboard/edit-coordinator/:id" element={<EditCoordinatorPage />} />
          <Route path="/dashboard/trip-management" element={<TripOppurtunitiesPage />} />
          <Route path="/dashboard/add-new-trip" element={<AddtripPage />} />
          <Route path="/dashboard/chat-management" element={<ChatManagementPage />} />
          <Route path="/dashboard/payment-membership" element={<PaymentmembershipPage />} />
          <Route path="/dashboard/settings" element={<SettingPage />} />
        </Route>

        <Route path="/coordinator-dashboard" element={<CoordinatorLayout />}>
          <Route index element={<CoordinatorDashboard />} />
          <Route path="/coordinator-dashboard/add-new-trip" element={<AddCoordinatortripPage />} />
          <Route path="/coordinator-dashboard/oppurtunities-management" element={<OppurtunitiesManagementPage />} />
          <Route path="/coordinator-dashboard/applicants-review" element={<ApplicantsReviewPage />} />
          <Route path="/coordinator-dashboard/achievements-control" element={<AchievementControlPage />} />
          <Route path="/coordinator-dashboard/chat-users" element={<ChatUserPage />} />
          <Route path="/coordinator-dashboard/settings" element={<CoordinatorSettingPage />} />
        </Route>

        <Route path="/user-dashboard" element={<Userlayout />}>
          <Route index element={<UserdashboardPage />} />
          <Route path="/user-dashboard/adventure-oppurtunities" element={<AdventureOppurtunitiesPage />} />
          <Route path="/user-dashboard/viewdetail/:id" element={<ViewDetailTripPage />} />
          <Route path="/user-dashboard/user-settings" element={<UserSettingPage />} />
        </Route>

        <Route path="/" element={<UserSidelayout />}>
          <Route index element={<HomePage />} />
          <Route path="/open-oppurtunities" element={<OpenOppurtunitiesPage />} />
          <Route path="/wild-weekend" element={<WildweekendPage />} />
          <Route path="/wild-trip" element={<WildtripPage />} />
          <Route path="/erasmus-plus" element={<ErasmusPage />} />
          <Route path="/internal-events" element={<InternaleventsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
