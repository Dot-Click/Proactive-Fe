import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const mutationFunction = async (formData: FormData) => {
  const res = await api.post("/api/trips/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const UseCreateTrip = (redirectPath = "/dashboard/trip-management") => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: mutationFunction,
    onSuccess: (response) => {
      const msg =
        response?.message ??
        response?.data?.message ??
        "Trip created successfully";
      toast.success(msg);
      navigate(redirectPath);
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create trip";
      console.error("Trip creation error:", error);
      toast.error(errorMsg);
    },
  });
};
