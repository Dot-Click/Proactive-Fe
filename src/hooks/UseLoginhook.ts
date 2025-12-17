import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";


interface UserLoginData {
    email: string;
    Password: string;
}

const mutationFunction = async (data: UserLoginData): Promise<AxiosResponse<any, any, {}>> => {
    return await api.post("/api/auth/login", data);
};

export const useLoginUser = () => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<any, any, {}>, Error, UserLoginData>({
        mutationFn: mutationFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};