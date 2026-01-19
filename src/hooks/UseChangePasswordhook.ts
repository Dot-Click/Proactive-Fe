import api from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

const changePassword = async (data: ChangePasswordData) => {
    const response = await api.post("/api/auth/change-password", data);
    return response.data;
};

export const UseChangePassword = () => {
    return useMutation({
        mutationFn: changePassword,
        onSuccess: (response) => {
            const message = response?.message || "Password changed successfully";
            toast.success(message);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to change password";
            toast.error(errorMessage);
        },
    });
};
