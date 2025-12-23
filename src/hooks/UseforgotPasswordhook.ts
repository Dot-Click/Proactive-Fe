import api from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

interface forgotPassData {
    email: string;
}

const mutationFunction = async (data: forgotPassData): Promise<AxiosResponse<any, any, {}>> => {
    const res = await api.post("/api/auth/forgot-password", data);
    return res;
};

export const UseforgotPassword = () => {
    return useMutation<AxiosResponse<any, any, {}>, Error, forgotPassData>({
        mutationFn: mutationFunction,
        onSuccess: (response) => {
            toast.success(response?.data?.message)
        },
    });
};