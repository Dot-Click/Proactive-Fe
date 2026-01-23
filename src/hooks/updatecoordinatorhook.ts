import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCoordinatorRequest = async ({ id, data }: { id: string; data: FormData }) => {
  // Using PATCH for updates as is standard for partial edits
  const response = await api.patch(`api/coordinator/updateSettings/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useUpdateCoordinator = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => updateCoordinatorRequest({ id, data }),
    onSuccess: () => {
      // Refresh the coordinator data in the cache after update
      queryClient.invalidateQueries({ queryKey: ["coordinator", id] });
      queryClient.invalidateQueries({ queryKey: ["coordinators-list"] }); 
    },
  });
};