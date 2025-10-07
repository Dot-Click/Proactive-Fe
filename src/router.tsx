import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./Layout/admin.layout";
import DashboardPage from "./pages/admin/Dashboard.page";
import UserManagementPage from "./pages/admin/UserManagement.page";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<AdminLayout/>}>
        <Route index element={<DashboardPage/>}/>
        <Route path="/dashboard/user-management" element={<UserManagementPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;