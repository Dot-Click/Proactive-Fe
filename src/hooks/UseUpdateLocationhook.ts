import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface UpdatePayload {
  id: string;
  data: {
    name: string;
  };
}

const mutationFunction = async ({ id, data }: UpdatePayload): Promise<AxiosResponse<any>> => {
  const res = await api.put(`/api/admin/location/${id}`, data);
  return res.data;
};

export const UseUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFunction,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      if (variables?.id) queryClient.invalidateQueries({ queryKey: ["location", variables.id] });
    },
  });
};
