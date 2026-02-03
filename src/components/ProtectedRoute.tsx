import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook";

type UserRole = "admin" | "coordinator" | "user";

interface ProtectedRouteProps {
  children: ReactNode;
  /** Roles allowed to access this route. If omitted, any authenticated user can access. */
  allowedRoles?: UserRole[];
}

const ROLE_DASHBOARDS: Record<UserRole, string> = {
  admin: "/dashboard",
  coordinator: "/coordinator-dashboard",
  user: "/user-dashboard",
};

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { data, isLoading, isError } = UsegetCurrentUser({
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const user = data?.data?.user;
  const userRole = user?.role as UserRole | undefined;

  // Show loading state while verifying auth
if (isLoading) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

  // Not authenticated - redirect to login
  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based access: if allowedRoles specified, verify user has one of them
  if (allowedRoles && allowedRoles.length > 0 && userRole) {
    const hasAccess = allowedRoles.includes(userRole);

    if (!hasAccess) {
      // User is logged in but has wrong role - redirect to their dashboard
      const redirectTo = ROLE_DASHBOARDS[userRole] ?? "/user-dashboard";
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
};
