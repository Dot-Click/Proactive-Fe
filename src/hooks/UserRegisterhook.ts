import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserData {
    FirstName: string;
    LastName: string;
    NickName?: string;
    PhoneNumber: string;
    DOB: string;
    Gender: string;
    Address: string;
    EmergencyContact?: string;
    DNI?: string;
    DietRestrictions?: string;
    email: string;
    Password: string;
}

const mutationFunction = async (data: UserData) => {
    const res = await api.post("/api/auth/register", data);
    return res.data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<AxiosResponse<any>, Error, UserData>({
    mutationFn: mutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/verify-email"); // ✅ redirect after signup
    },
    onError: (error: any) => {
      // Handle validation errors with field-specific messages
      const responseData = error?.response?.data;
      
      if (responseData?.errors) {
        // Extract first validation error for display
        const firstErrorKey = Object.keys(responseData.errors)[0];
        const firstError = responseData.errors[firstErrorKey];
        const fieldName = firstErrorKey
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .trim();
        
        if (Array.isArray(firstError) && firstError.length > 0) {
          toast.error(`${fieldName}: ${firstError[0]}`);
        } else {
          toast.error(responseData?.message || "Please check your input and try again.");
        }
      } else {
        // Handle other errors
        const errorMessage = responseData?.message || 
          error?.message || 
          "Unable to create your account. Please try again.";
        toast.error(errorMessage);
      }
    },
  });
};