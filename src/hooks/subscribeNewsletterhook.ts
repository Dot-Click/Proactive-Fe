import api from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const subscribeNewsletter = async (email: string) => {
  const response = await api.post<{ message: string }>("/api/user/subscribe", {
    email: email.trim().toLowerCase(),
  });
  return response.data;
};

export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: (email: string) => subscribeNewsletter(email),
    onSuccess: (data) => {
      toast.success(data?.message ?? "Thank you for subscribing!");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message =
        error?.response?.data?.message ?? "Failed to subscribe. Please try again.";
      toast.error(message);
    },
  });
};
