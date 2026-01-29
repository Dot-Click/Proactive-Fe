import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";


const getTripbyid = async (id: string) => {
    const response = await api.get(`/api/trips/${id}`);
    return response.data.data;
};

export const UsegetTripbyid = (id: string) => {
    return useQuery({
        queryKey: ["trips", id],
        queryFn: () => getTripbyid(id),
        staleTime: 60 * 3 * 1000,
        enabled: !!id,
    });
};