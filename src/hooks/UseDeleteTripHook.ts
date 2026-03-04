import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

const mutationFunction = async (id: string): Promise<AxiosResponse<any>> => {
  const res = await api.delete(`/api/trips/${id}`);
  return res.data;
};

export const UseDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};
