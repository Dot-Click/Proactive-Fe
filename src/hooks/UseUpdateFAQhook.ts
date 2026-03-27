import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface UserUpdateFaqsData {
    faqId: string;
    question: string;
    answers: string;
}

const mutationFunction = async (data: UserUpdateFaqsData): Promise<AxiosResponse<any, any, {}>> => {
    const { faqId, ...rest } = data;
    const res = await api.put(`/api/faqs/${faqId}`, rest);
    return res.data;
};

export const useUpdateFaq = () => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<any, any, {}>, Error, UserUpdateFaqsData>({
        mutationFn: mutationFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["All-faqs"] });
        },
    });
};
