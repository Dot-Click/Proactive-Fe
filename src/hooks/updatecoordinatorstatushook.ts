import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updateCoordinatorStatus = async (data: any) => {
    const response = await api.patch(`/api/admin/coordinator/${data.id}`);
    return response.data;
};

export const UseupdateCoordinatorStatus = () => {
const queryclient = useQueryClient();
    return useMutation({
        mutationKey: ["updatecoordinatorstatus"],
        mutationFn: updateCoordinatorStatus,
        onSuccess: (response) => {
            queryclient.invalidateQueries({ queryKey: ["coordinator"] });
            toast.success(response?.message);
        },
    });
}