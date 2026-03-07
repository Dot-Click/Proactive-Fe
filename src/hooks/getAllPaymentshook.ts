import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const getAllPayments = async () => {
    const response = await api.get("/api/payment");
    return response.data.data;
};

export const UsegetAllPayments = () => {
    return useQuery({
        queryKey: ["all-payments"],
        queryFn: getAllPayments,
        staleTime: 60 * 3 * 1000,
    });
};
