import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateMembershipPayload {
  userId: string;
  action: "activate" | "remove";
}

const updateMembership = async ({ userId, action }: UpdateMembershipPayload) => {
  const response = await api.put(`/api/user/membership/${userId}`, { action });
  return response.data;
};

export const useUpdateMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMembership,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      queryClient.invalidateQueries({ queryKey: ["search-users"] });
      toast.success(data?.message || "Membership updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update membership");
    }
  });
};
