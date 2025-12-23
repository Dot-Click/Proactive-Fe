import api from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface VerifyEmailToken {
    token: string;
}

const mutationFunction = async (data: VerifyEmailToken): Promise<AxiosResponse<any, any, {}>> => {
    const res = await api.post("/api/auth/verify-email", data);
    return res;
};

export const UseVerifytokenhook = () => {
const navigate = useNavigate()
    return useMutation<AxiosResponse<any, any, {}>, Error, VerifyEmailToken>({
        mutationFn: mutationFunction,
        onSuccess: (response) => {
            toast.success(response?.data?.message)
            navigate("/login")
        },
    });
};