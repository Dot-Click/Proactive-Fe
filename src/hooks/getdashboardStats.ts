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


const getdashboardStats = async () => {
    const response = await api.get("/api/admin/dashboard");
    return response.data.data;
};

export const UsegetdashboardStats = () => {
    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: getdashboardStats,
        staleTime: 60 * 3 * 1000, 
    });
};