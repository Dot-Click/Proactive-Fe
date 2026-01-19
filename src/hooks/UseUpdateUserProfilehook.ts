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
            const errorMessage = error?.response?.data?.message || "Failed to update profile";
            toast.error(errorMessage);
        },
    });
};
