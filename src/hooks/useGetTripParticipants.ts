import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";

export const useGetTripParticipants = (tripId: string) => {
  return useQuery({
    queryKey: ["tripParticipants", tripId],
    queryFn: async () => {
      if (!tripId) return null;
      const response = await axiosInstance.get(`/api/coordinator/applications/trip/${tripId}`);
      return response.data.data;
    },
    enabled: !!tripId,
  });
};
