import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface CoordinatorData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  specialties: string[];
  languages: string[];
  certification: string;
  experience: number;
  coordinatorType: string;
  accessLevel: string;
  profilePicture: string | null;
}

const getCoordinator = async (id: string): Promise<CoordinatorData> => {
  // Matches your requested flow: response.data.data
  const response = await api.get(`/api/admin/coordinator/${id}`);
  return response.data.data;
};

export const useGetCoordinator = (id: string) => {
  return useQuery<CoordinatorData>({
    queryKey: ["coordinator", id],
    queryFn: () => getCoordinator(id),
    enabled: !!id, // Only run if ID exists
  });
};