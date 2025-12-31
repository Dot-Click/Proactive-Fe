import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";



const getallFaqs = async () => {
    const response = await api.get("/api/faqs");
    return response.data.data;
};

export const UsegetallFaqs = () => {
    return useQuery({
        queryKey: ["All-faqs"],
        queryFn: getallFaqs,
        staleTime: 60 * 3 * 1000, 
    });
};