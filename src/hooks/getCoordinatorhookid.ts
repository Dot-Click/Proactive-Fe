import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";

export interface Coordinator {
    coordinator:{
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
}



const getCoordinatorById = async (id: string) => {
    const response = await api.get(`/api/admin/coordinator/${id}`);
    return response.data.data;
};

export const UsegetCoordinatorbyId = (id: string) => {
    return useQuery({
        queryKey: ["coordinator", id],
        queryFn: () => getCoordinatorById(id),
        staleTime: 60 * 3 * 1000, 
    });
};