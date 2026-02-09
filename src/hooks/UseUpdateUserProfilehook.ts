import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateUserProfileData {
    firstName?: string;
    lastName?: string;
    nickName?: string;
    address?: string;
    phoneNumber?: string;
    dob?: string;
    gender?: string;
    emergencyContact?: string;
    dni?: string;
    dietaryRestrictions?: string;
}

const updateUserProfile = async (data: UpdateUserProfileData) => {
    const response = await api.patch("/api/auth/update-profile", data);
    return response.data;
};

export const UseUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            const message = response?.message || "Profile updated successfully";
            toast.success(message);
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
                    "Unable to update your profile. Please try again.";
                toast.error(errorMessage);
            }
        },
    });
};
