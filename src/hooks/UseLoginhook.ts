import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


interface UserLoginData {
    email: string;
    Password: string;
}

const mutationFunction = async (data: UserLoginData) => {
    // normalize email to avoid case-sensitivity mismatches
    const payload = { ...data, email: data.email.trim().toLowerCase() };
    const res = await api.post("/api/auth/login", payload);
    return res.data;
};

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: mutationFunction,

        onSuccess: (response) => {
            // Prime the cache immediately with the user data from the login response
            // This prevents stale data from causing role-based redirect flickers.
            queryClient.setQueryData(["currentUser"], { data: { user: response?.data?.user } });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            
            const role = response?.data?.user?.role
            const token = response?.data?.accessToken
            const userId = response?.data?.user.id
            toast.success(response.message)
            if (token) {
                localStorage.setItem("token", token)
                localStorage.setItem("userId", userId)
            }else{
                console.log('No Access Token In Response')
            }

            if (!role) {
                toast.error('Role Not Found')
                return
            }

            switch (role) {
                case 'admin':
                    navigate("/dashboard");
                    break;
                case "coordinator":
                    navigate("/coordinator-dashboard");
                    break;
                case "user":
                    navigate("/user-dashboard");
                    break;
                default:
                    navigate('/user-dashboard');
            }
        },
    });
};