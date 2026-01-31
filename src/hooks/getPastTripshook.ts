import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface PastTrip {
  id: string;
  title: string;
  name: string;
  location: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  type: string;
  category: string;
  status: string;
  duration: string;
}

const getPastTrips = async (type?: string) => {
  const params = type ? { type } : {};
  const response = await api.get("/api/trips/past", { params });
  const data = response.data?.data || response.data;
  return { trips: data?.trips || [] };
};

export const UsegetPastTrips = (type?: string) => {
  return useQuery({
    queryKey: ["past-trips", type],
    queryFn: () => getPastTrips(type),
    staleTime: 60 * 3 * 1000,
  });
};
