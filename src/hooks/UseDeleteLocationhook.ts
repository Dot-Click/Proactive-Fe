import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

const mutationFunction = async (id: string): Promise<AxiosResponse<any>> => {
  const res = await api.delete(`/api/admin/location/${id}`);
  return res.data;
};

export const UseDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFunction,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      if (id) queryClient.invalidateQueries({ queryKey: ["location", id] });
    },
  });
};
