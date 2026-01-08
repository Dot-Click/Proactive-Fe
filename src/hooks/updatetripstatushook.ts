import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updatetripstatushook = async (data: any) => {
    const response = await api.patch(`/api/trips/trips/${data.id}/approve`);
    return response.data;
};

export const Useupdatetripstatus = () => {
const queryclient = useQueryClient();
    return useMutation({
        mutationKey: ["updatetripstatus"],
        mutationFn: updatetripstatushook,
        onSuccess: (response) => {
            queryclient.invalidateQueries({ queryKey: ["trips"] });
            toast.success(response?.message);
        },
    });
}