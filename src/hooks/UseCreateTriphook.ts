// import api from "@/config/axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const mutationFunction = async (formData: FormData) => {
//   const res = await api.post("/api/trips/", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };

// export const UseCreateTrip = (redirectPath = "/dashboard/trip-management") => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: mutationFunction,
//     onSuccess: (response) => {
//       const msg =
//         response?.message ??
//         response?.data?.message ??
//         "Trip created successfully";
//       toast.success(msg);
//       navigate(redirectPath);
//       queryClient.invalidateQueries({ queryKey: ["trips"] });
//     },
//     onError: (error: any) => {
//       const errorMsg =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Failed to create trip";
//       console.error("Trip creation error:", error);
//       toast.error(errorMsg);
//     },
//   });
// };

import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const mutationFunction = async (formData: FormData) => {
  // Axios interceptor will auto-remove Content-Type for FormData so boundary is set correctly
  const res = await api.post("/api/trips/", formData);
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
      console.error("Trip creation error:", error);

      // Normalize server validation messages so we only pass strings to the UI.
      let errorMsg = "Failed to create trip";
      const respData = error?.response?.data;
      if (respData) {
        if (typeof respData === "string") {
          errorMsg = respData;
        } else if (respData.message) {
          if (typeof respData.message === "string") errorMsg = respData.message;
          else errorMsg = JSON.stringify(respData.message);
        } else {
          errorMsg = JSON.stringify(respData);
        }
      } else if (error?.message) {
        errorMsg = error.message;
      }

      toast.error(errorMsg);
    },
  });
};
