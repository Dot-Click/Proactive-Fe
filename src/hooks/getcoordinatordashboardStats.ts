import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";



const getcoordinatordashboardStats = async () => {
    const response = await api.get("/api/coordinator/dashboard");
    return response.data.data;
};

export const UsegetcoordinatordashboardStats = () => {
    return useQuery({
        queryKey: ["coordinatordashboardStats"],
        queryFn: getcoordinatordashboardStats,
        staleTime: 60 * 3 * 1000, 
    });
};