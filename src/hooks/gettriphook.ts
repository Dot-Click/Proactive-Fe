import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const getTrips = async () => {
    const response = await api.get("/api/trips/");
    const data = response.data?.data || response.data;
    return {
        trips: data?.trips || [],
        counts: data?.counts || { all: 0, open: 0, comingSoon: 0, closed: 0 },
    };
};

export const UsegetTrips = () => {
    return useQuery({
        queryKey: ["trips"],
        queryFn: getTrips,
        staleTime: 60 * 3 * 1000,
    });
};