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


const getSetting = async () => {
    const response = await api.get("/api/admin/settings");
    return response.data.data;
};

export const UsegetSettinghook = () => {
    return useQuery({
        queryKey: ["setting"],
        queryFn: getSetting,
    });
};