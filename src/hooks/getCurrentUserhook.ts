import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";



const getCurrentUser = async () => {
    const response = await api.get("/api/auth/me");
    return response.data;
};

export const UsegetCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });
};