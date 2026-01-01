import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";



const getAllAchievements = async () => {
    const response = await api.get("/api/coordinator/achievements");
    return response.data.data;
};

export const UsegetallAchievements = () => {
    return useQuery({
        queryKey: ["All-achievements"],
        queryFn: getAllAchievements,
        staleTime: 60 * 3 * 1000, 
    });
};