import api from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ResetPassword {
    token: string;
    password: string;
}

const mutationFunction = async (data: ResetPassword): Promise<AxiosResponse<any, any, {}>> => {
    const res = await api.post("/api/auth/reset-password", data);
    return res;
};

export const UseResetPasswordhook = () => {
const navigate = useNavigate()
    return useMutation<AxiosResponse<any, any, {}>, Error, ResetPassword>({
        mutationFn: mutationFunction,
        onSuccess: (response) => {
            toast.success(response?.data?.message)
            navigate("/login")
        },
    });
};