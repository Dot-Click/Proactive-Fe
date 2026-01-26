import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateApplicationStatusPayload = {
  id: string;
  status: string;
};

const updateApplicationStatus = async ({
  id,
  status,
}: UpdateApplicationStatusPayload) => {
  const response = await api.patch(`/api/coordinator/applications/${id}`, {
    status,
  });
  return response.data?.data;
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["All-applications"] });
    },
  });
};
