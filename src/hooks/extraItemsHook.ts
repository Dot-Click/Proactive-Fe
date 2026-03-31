import api from "@/config/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface ExtraItem {
  id: string;
  type: "included" | "not_included";
  title: string;
  description: string | null;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useGetExtraItems = () => {
  return useQuery({
    queryKey: ["extraItems"],
    queryFn: async () => {
      const { data } = await api.get("/api/extra-items");
      return data.data.items as ExtraItem[];
    },
  });
};

export const useCreateExtraItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newItem: Partial<ExtraItem>) => {
      const { data } = await api.post("/api/extra-items", newItem);
      return data.data.item as ExtraItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["extraItems"] });
    },
  });
};

export const useUpdateExtraItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Partial<ExtraItem> & { id: string }) => {
      const { data } = await api.put(`/api/extra-items/${item.id}`, item);
      return data.data.item as ExtraItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["extraItems"] });
    },
  });
};

export const useDeleteExtraItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/api/extra-items/${id}`);
      return data.data.id as string;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["extraItems"] });
    },
  });
};
