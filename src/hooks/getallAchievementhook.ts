import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";



const getAllAchievements = async () => {
    const response = await api.get("/api/coordinator/achievements");
    return response.data.data;
};
const getAllAchievementsForUser = async () => {
    const response = await api.get("/api/user/achievements");
    console.log("Achievements for user", response.data);
    return response.data;
};

export const UsegetallAchievements = () => {
    return useQuery({
        queryKey: ["All-achievements"],
        queryFn: getAllAchievements,
        staleTime: 60 * 3 * 1000, 
    });
};
export const UsegetallAchievementsForUser = () => {
    return useQuery({
        queryKey: ["Achievements-for-user"],
        queryFn: getAllAchievementsForUser,
        staleTime: 60 * 3 * 1000, 
    });
};