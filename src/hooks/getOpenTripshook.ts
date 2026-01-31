import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface OpenTrip {
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
  groupSize?: string;
  perHeadPrice?: string;
  shortDesc?: string;
}

const getOpenTrips = async (type?: string) => {
  const params = type ? { type } : {};
  const response = await api.get("/api/trips/open", { params });
  const data = response.data?.data || response.data;
  return {
    trips: data?.trips || [],
    counts: data?.counts || { all: 0, open: 0, comingSoon: 0, closed: 0 },
  };
};

export const UsegetOpenTrips = (type?: string) => {
  return useQuery({
    queryKey: ["open-trips", type],
    queryFn: () => getOpenTrips(type),
    staleTime: 60 * 3 * 1000,
  });
};
