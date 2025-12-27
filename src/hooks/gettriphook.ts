import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";


const getTrips = async () => {
    const response = await api.get("/api/trips/");
    // console.log(response)
    return response.data.data;
};

export const UsegetTrips = () => {
    return useQuery({
        queryKey: ["trips"],
        queryFn: getTrips,
        staleTime: 60 * 3 * 1000, 
    });
};