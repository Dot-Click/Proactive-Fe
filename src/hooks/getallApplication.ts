import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";



const getAllApplication = async () => {
    const response = await api.get("/api/coordinator/applications");
    return response.data.data;
};

export const UsegetallApplication = () => {
    return useQuery({
        queryKey: ["All-applications"],
        queryFn: getAllApplication,
        staleTime: 60 * 3 * 1000, 
    });
};