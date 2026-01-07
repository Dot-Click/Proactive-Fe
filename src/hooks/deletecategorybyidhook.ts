import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteCategorybyId = async (data: any) => {
    const response = await api.delete(`/api/categories/${data.id}`);
    return response.data.data;
};

export const UseDeleteCategoryById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["DeleteCategorybyId"],
        mutationFn: DeleteCategorybyId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category"] });
        },
    });
}