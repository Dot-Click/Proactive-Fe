import api from "@/config/axios";
import { useQuery  } from "@tanstack/react-query";

// export interface Coordinator {
//     accessLvl: string;
//     bio: string;
//     certificateLvl: string;
//     email: string;
//     fullName: string;
//     languages: string[];
//     phoneNumber: string;
//     profilePicture: string;
//     specialities: string[];
//     type: string;
//     yearsOfExperience: number;
// }

// interface CoordinatorProps {
//   coordinators: Coordinator[];
// }


const getchat = async () => {
    const response = await api.get("/api/chat/");
    return response.data.data;
};

export const Usegetchat = () => {
    return useQuery({
        queryKey: ["chat"],
        queryFn: getchat,
    });
};