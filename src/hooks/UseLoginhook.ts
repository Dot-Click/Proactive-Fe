import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


interface UserLoginData {
    email: string;
    Password: string;
}

const mutationFunction = async (data: UserLoginData) => {
    const res = await api.post("/api/auth/login", data);
    return res.data;
};

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: mutationFunction,

        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
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
                default:
                    navigate('/user-dashboard');
            }
        },
    });
};