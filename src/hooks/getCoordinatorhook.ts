import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";

export interface Coordinator {
    id: string;
    accessLvl: string;
    bio: string;
    certificateLvl: string;
    email: string;
    fullName: string;
    languages: string[];
    phoneNumber: string;
    profilePicture: string;
    specialities: string[];
    type: string;
    yearsOfExperience: number;
    location: string;
}

interface CoordinatorProps {
  coordinators: Coordinator[];
}


const getCoordinator = async (): Promise<CoordinatorProps> => {
    const response = await api.get("/api/admin/coordinator");
    return response.data.data;
};

export const UsegetCoordinator = () => {
    return useQuery<CoordinatorProps>({
        queryKey: ["coordinator"],
        queryFn: getCoordinator,
        staleTime: 60 * 3 * 1000, 
    });
};