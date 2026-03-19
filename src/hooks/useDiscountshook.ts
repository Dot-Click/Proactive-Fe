import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";

export const useGetAllDiscounts = () => {
  return useQuery({
    queryKey: ["allDiscounts"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/discounts");
      return response.data.data;
    },
  });
};

export const useGetTripDiscounts = (tripId: string) => {
  return useQuery({
    queryKey: ["tripDiscounts", tripId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/discounts/trip/${tripId}`);
      return response.data.data;
    },
    enabled: !!tripId,
  });
};

export const useCreateDiscount = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/api/discounts", data);
      return response.data.data;
    },
  });
};

export const useValidateDiscount = () => {
  return useMutation({
    mutationFn: async (data: { tripId: string; discountCode: string }) => {
      const response = await axiosInstance.post("/api/discounts/validate", data);
      return response.data.data;
    },
  });
};

export const useDeleteDiscount = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/api/discounts/${id}`);
      return response.data.data;
    },
  });
};
