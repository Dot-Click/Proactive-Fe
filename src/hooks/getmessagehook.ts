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


const getmessagebyid = async (id: string) => {
    const response = await api.get(`/api/chat/${id}/messages`);
    return response.data.data;
};

export const Usegetmessagebyid = (id: string) => {
    return useQuery({
        queryKey: ["chat", id, "messages"],
        queryFn: () => getmessagebyid(id),
        enabled: !!id && id.trim() !== "", // Only fetch when chatId is available
        staleTime: 30 * 1000, // 30 seconds
    });
};