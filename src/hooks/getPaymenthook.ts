import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";



const getPayment = async () => {
    const response = await api.get("/api/payment");
    return response.data.data;
};

export const UsegetPayment = () => {
    return useQuery({
        queryKey: ["payment"],
        queryFn: getPayment,
        staleTime: 60 * 3 * 1000, 
    });
};