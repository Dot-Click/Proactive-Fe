import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export interface LocationData {
    name: string;
}

const mutationFunction = async (
    data: LocationData
): Promise<AxiosResponse<any>> => {
    const res = await api.post("/api/admin/location", data);
    return res.data;
};

export const UseCreateLocation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mutationFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locations"] });
        },
    });
};
