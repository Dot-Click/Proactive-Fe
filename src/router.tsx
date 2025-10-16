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



function App() {
  return (
    <BrowserRouter>
      <Routes>

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
          <Route path="/coordinator-dashboard/user-management" element={<UserManagementPage />} />
          <Route path="/coordinator-dashboard/coordinator-management" element={<CoordinatorPage />} />
          <Route path="/coordinator-dashboard/add-new-coordinator" element={<AddnewcoordinatorPage />} />
          <Route path="/coordinator-dashboard/edit-coordinator/:id" element={<EditCoordinatorPage />} />
          <Route path="/coordinator-dashboard/trip-management" element={<TripOppurtunitiesPage />} />
          <Route path="/coordinator-dashboard/add-new-trip" element={<AddtripPage />} />
          <Route path="/coordinator-dashboard/chat-management" element={<ChatManagementPage />} />
          <Route path="/coordinator-dashboard/payment-membership" element={<PaymentmembershipPage />} />
          <Route path="/coordinator-dashboard/settings" element={<SettingPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
