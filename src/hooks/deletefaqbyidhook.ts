import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeletefaqbyId = async (data: any) => {
    const response = await api.delete(`/api/faqs/${data.faqId}`, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.data.data;
};

export const UseDeletefaqbyId = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["DeletefaqbyId"],
        mutationFn: DeletefaqbyId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["All-faqs"] });
        },
    });
}