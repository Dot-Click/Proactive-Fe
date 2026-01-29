import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const markAsReadNotification = async (id: string | string[]) => {
  if (Array.isArray(id)) {
    const responses = await Promise.all(id.map((i) => api.patch(`/api/notification/${i}`)));
    return responses[responses.length - 1].data; // Return the last one or a generic success
  }
  const res = await api.patch(`/api/notification/${id}`);
  // console.log(res.data)
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
