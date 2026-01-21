import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateUserStatusPayload {
  userId: string;
  status: string;
}

const updateUserStatus = async ({ userId, status }: UpdateUserStatusPayload) => {
  // Using PATCH as it's a partial update of status
  const response = await api.patch(`/api/user/${userId}/status`, { status });
  return response.data;
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      // Invalidate the "all-users" query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      queryClient.invalidateQueries({ queryKey: ["user-counts"] });
      toast.success("User status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update user status");
    }
  });
};
