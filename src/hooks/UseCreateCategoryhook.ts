import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";


export interface CategoryData {
    name: string;
}

const mutationFunction = async (data: CategoryData): Promise<AxiosResponse<any>> => {
    const res = await api.post("/api/categories", data);
    return res.data
};

export const UseCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mutationFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category"] });
        },
    });
};