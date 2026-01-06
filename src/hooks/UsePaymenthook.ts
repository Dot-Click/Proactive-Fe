import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const mutationFunction = async (data: any) => {
    const res = await api.post("/api/payment", data);
    return res.data
};

export const UsePayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: mutationFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment"] });
        },
    });
};