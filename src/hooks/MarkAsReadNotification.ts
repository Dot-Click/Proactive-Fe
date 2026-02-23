import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const markAsReadNotification = async (id: string | string[]) => {
  if (Array.isArray(id)) {
    const res = await api.patch(`/api/notification/mark-all-read`);
    return res.data;
  }
  const res = await api.patch(`/api/notification/${id}`);
  return res.data;
};
export const useMarkAsReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsReadNotification,
    onSuccess: (response) => {
      const isRead = response?.data?.notification?.read ?? true;
      toast.success(`Notification marked as ${isRead ? "read" : "unread"}`);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
