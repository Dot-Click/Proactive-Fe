import api from "@/config/axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const mutationFunction = async (data: any) => {
    const res = await api.post("/api/payment", data);
    return res.data
};

export const UsePayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: mutationFunction,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["payment"] });
            const message = response?.message
            toast.success(message)
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to pay amount";
            toast.error(errorMessage);
        }
    });
};