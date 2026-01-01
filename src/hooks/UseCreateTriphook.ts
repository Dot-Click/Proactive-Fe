import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";



const mutationFunction = async (data: FormData) => {
    const res = await api.post("/api/trips", data);
    return res.data
};

export const UseCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mutationFunction,
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trips"] });
        },
    });
};