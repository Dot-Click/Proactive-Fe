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
//     location: string;
// }

// interface CoordinatorProps {
//   coordinators: Coordinator[];
// }


// const getCoordinatorById = async (id: string): Promise<CoordinatorProps> => {
//     const response = await api.get(`/api/admin/coordinator/${id}`);
//     console.log(response)
//     return response.data.data;
// };

// export const UsegetCoordinator = (id: string) => {
//     return useQuery<CoordinatorProps>({
//         queryKey: ["coordinator", id],
//         queryFn: getCoordinatorById,
//         staleTime: 60 * 3 * 1000, 
//     });
// };