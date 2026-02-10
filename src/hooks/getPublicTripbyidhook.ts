import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

/**
 * Public hook to get trip by ID without authentication.
 * Uses the public endpoint `/api/trip/detail/:id`.
 */
const getPublicTripbyid = async (id: string) => {
  const response = await api.get(`/api/trips/detail/${id}`);
  return response.data.data;
};

export const UsegetPublicTripbyid = (id: string) => {
  return useQuery({
    queryKey: ["publicTrip", id],
    queryFn: () => getPublicTripbyid(id),
    staleTime: 60 * 3 * 1000,
    enabled: !!id,
  });
};

