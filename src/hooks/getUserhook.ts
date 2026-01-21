import api  from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const getAllUser = async () =>
{
    const response = await api.get("/api/user/get-all-users");
    return response?.data?.data?.users
}


export const UseGetAllUser = () =>
{
    return useQuery({
        queryKey: ["all-users"],
        queryFn: getAllUser,
        staleTime: 60 * 3 * 1000, 
    });
}