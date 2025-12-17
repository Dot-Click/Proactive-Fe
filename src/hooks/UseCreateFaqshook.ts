import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";


interface UserCreateFaqsData {
    question: string;
    answers: string;
}

const mutationFunction = async (data: UserCreateFaqsData): Promise<AxiosResponse<any, any, {}>> => {
    return await api.post("/api/faqs", data);
};

export const useCreateFaqs = () => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<any, any, {}>, Error, UserCreateFaqsData>({
        mutationFn: mutationFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
    });
};