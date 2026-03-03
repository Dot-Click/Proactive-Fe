import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

/**
 * Coordinator Profile Page - Redirects to Settings
 * This page provides a convenient URL for the coordinator's profile
 */
const CoordinatorProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to settings page where profile can be edited
    navigate("/coordinator-dashboard/settings", { replace: true });
  }, [navigate]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center gap-4">
        <Loader className="w-8 h-8 animate-spin text-[#0DAC87]" />
        <p className="text-[#666373] font-medium">Loading profile...</p>
      </div>
    </div>
  );
};

export default CoordinatorProfilePage;
