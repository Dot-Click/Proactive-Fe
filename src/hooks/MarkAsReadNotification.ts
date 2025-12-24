import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const markAsReadNotification = async (id: string) => {
  const res = await api.patch(`/api/notification/${id}`);
  console.log(res.data)
  return res.data;
};
export const useMarkAsReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsReadNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });

    },
  });
};
