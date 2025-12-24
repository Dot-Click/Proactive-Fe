// import api from "@/config/axios";
// import { useQuery  } from "@tanstack/react-query";

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


// const getCategories = async () => {
//     const response = await api.get("/api/categories");
//     console.log(response)
//     return response.data;
// };

// export const UsegetCategory = () => {
//     return useQuery({
//         queryKey: ["category"],
//         queryFn: getCategories,
//         staleTime: 60 * 3 * 1000, 
//     });
// };