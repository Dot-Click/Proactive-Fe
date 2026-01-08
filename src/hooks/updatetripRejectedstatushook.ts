import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updatetripRejectedstatus = async (data: any) => {
    const response = await api.patch(`/api/trips/trips/${data.id}/reject`);
    return response.data;
};

export const UseupdateRejectedtripStatus = () => {
const queryclient = useQueryClient();
    return useMutation({
        mutationKey: ["updatetripRejectedstatus"],
        mutationFn: updatetripRejectedstatus,
        onSuccess: (response) => {
            queryclient.invalidateQueries({ queryKey: ["trips"] });
            toast.success(response?.message);
        },
    });
}