import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";

export interface Notification {
    id: string;
    description: string;
    title: string;
    type: string;
    read: boolean;
}



const getNotifications = async (): Promise<Notification[]> => {
    const response = await api.get("/api/notification/");
    return response.data.data;
};

export const UsegetNotifications = () => {
    return useQuery<Notification[]>({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};