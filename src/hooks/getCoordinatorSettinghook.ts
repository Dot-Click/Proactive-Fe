import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface CoordinatorSetting {
    id: string;
    fullName: string;
    email: string;
    avatar: string | null;
    phoneNumber?: string;
    bio?: string;
    notificationPref?: {
        emailNotf: boolean;
        appAlert: boolean;
        reviewNotf: boolean;
    };
}

const getCoordinatorSetting = async (): Promise<CoordinatorSetting> => {
    const response = await api.get("/api/coordinator/setting");
    return response.data.data;
};

export const UsegetCoordinatorSetting = () => {
    return useQuery<CoordinatorSetting>({
        queryKey: ["coordinator-setting"],
        queryFn: getCoordinatorSetting,
    });
};
