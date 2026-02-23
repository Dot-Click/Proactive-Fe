import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const getMyApplications = async () => {
    const response = await api.get("/api/user/applications");
    return response.data.data.applications;
};

export const UsegetMyApplications = () => {
    return useQuery({
        queryKey: ["my-applications"],
        queryFn: getMyApplications,
        staleTime: 60 * 5 * 1000, // 5 minutes
    });
};
