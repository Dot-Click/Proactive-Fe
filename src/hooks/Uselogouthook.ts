import api from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



const mutationFunction = async (): Promise<AxiosResponse<any, any, {}>> => {
    const res = await api.post("/api/auth/logout");
    return res;
};

export const useLogoutUser = () => {
const navigate = useNavigate()
    return useMutation<AxiosResponse<any, any, {}>, Error>({
        mutationFn: mutationFunction,
        onSuccess: (response) => {
            localStorage.removeItem("token")
            toast.success(response?.data?.message)
            navigate("/login")
        },
    });
};