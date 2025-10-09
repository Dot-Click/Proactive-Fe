import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./Layout/admin.layout";
import DashboardPage from "./pages/admin/Dashboard.page";
import UserManagementPage from "./pages/admin/UserManagement.page";
import CoordinatorPage from "./pages/admin/Coordinator.page";
import AddnewcoordinatorPage from "./pages/admin/Addnewcoordinator.page";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<AdminLayout/>}>
        <Route index element={<DashboardPage/>}/>
        <Route path="/dashboard/user-management" element={<UserManagementPage/>}/>
        <Route path="/dashboard/coordinator-management" element={<CoordinatorPage/>}/>
        <Route path="/dashboard/addnew-coordinator" element={<AddnewcoordinatorPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
