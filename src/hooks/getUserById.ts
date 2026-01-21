import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export type CoordinatorDetails = {
  id: string;
  fullName: string;
  bio: string | null;
  profilePicture: string | null;
  specialities: string[] | null;
  languages: string[] | null;
  certificateLvl: string | null;
  yearsOfExperience: number | null;
  location: string | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type UserByIdResponse = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  nickName: string | null;
  email: string;
  avatar: string | null;
  phoneNumber: string | null;
  address: string | null;
  dob: string | null;
  gender: string | null;
  provider: string | null;
  emailVerified: boolean | null;
  userRoles: string | null;
  lastActive: string | null;
  createdAt: string;
  updatedAt: string;
  coordinatorDetailsId: string | null;
  coordinatorDetails: CoordinatorDetails | null;
};

const getUserByID = async (id: string) => {
  const response = await api.get<{ data: { user: UserByIdResponse } }>(
    `/api/user/${id}`,
  );
  return response.data.data.user;
};

export const UsegetUserByID = (id: string) => {
  return useQuery({
    queryKey: ["user-by-id", id],
    queryFn: () => getUserByID(id),
    staleTime: 60 * 3 * 1000,
    enabled: Boolean(id),
  });
};
