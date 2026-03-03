import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/config/axios";

type UpdateUserRoleRequest = {
  role: "user" | "coordinator" | "admin";
};

type UpdateUserRoleResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      userRoles: string;
      [key: string]: any;
    };
  };
};

/**
 * Hook to update user role
 * Allows admin to upgrade/downgrade user roles
 */
export const useUpdateUserRole = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserRoleRequest) => {
      const response = await axios.patch<UpdateUserRoleResponse>(
        `/api/user/${userId}/role`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate user queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-by-id", userId] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] }); // Main users list
      // Invalidate all coordinator queries (both list and individual)
      queryClient.invalidateQueries({ queryKey: ["coordinator"] }); // Main coordinators list
      // Invalidate search queries so they update immediately
      queryClient.invalidateQueries({ queryKey: ["search-coordinators"] });
      queryClient.invalidateQueries({ queryKey: ["search-users"] });
    },
  });
};
