import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const markAsReadNotification = async (id: string) => {
  const res = await api.patch(`/api/notification/${id}`);
  // console.log(res.data)
  return res.data;
};
export const useMarkAsReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsReadNotification,
    onSuccess: (response) => {
      toast.success(`Notification marked as ${response.data.notification.read ? "read" : "unread"}`);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
