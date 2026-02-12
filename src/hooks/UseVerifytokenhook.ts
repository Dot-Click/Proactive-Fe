import api from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
// import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface VerifyEmailToken {
    token: string;
}

interface VerifyEmailResponse {
    success: boolean;
    message: string;
    data?: {
        user: {
            id: string;
            email: string;
            role: string;
            emailVerified: boolean;
        };
        accessToken: string;
    };
}

const mutationFunction = async (data: VerifyEmailToken): Promise<VerifyEmailResponse> => {
    // Try GET first (for link-based verification), fallback to POST
    try {
        const res = await api.get(`/api/auth/verify-email?token=${data.token}`);
        return res.data;
    } catch (error: any) {
        // If GET fails, try POST (for manual token entry)
        const res = await api.post("/api/auth/verify-email", data);
        return res.data;
    }
};

export const UseVerifytokenhook = () => {
    const navigate = useNavigate();
    
    return useMutation<VerifyEmailResponse, Error, VerifyEmailToken>({
        mutationFn: mutationFunction,
        onSuccess: (response) => {
            toast.success(response?.message || "Email verified successfully");
            
            // If tokens are returned, auto-login the user
            if (response.data?.accessToken && response.data?.user) {
                // Store access token (same way as login)
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("token", response.data.accessToken); // Also store as 'token' for compatibility
                
                // Store user info
                if (response.data.user.id) {
                    localStorage.setItem("userId", response.data.user.id);
                }
                
                // Redirect based on user role
                const role = response.data.user.role;
                if (role === "coordinator") {
                    navigate("/coordinator-dashboard");
                } else if (role === "admin") {
                    navigate("/dashboard");
                } else {
                    navigate("/user-dashboard");
                }
            } else {
                // No tokens returned, redirect to login
                navigate("/login");
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Failed to verify email";
            toast.error(message);
        },
    });
};