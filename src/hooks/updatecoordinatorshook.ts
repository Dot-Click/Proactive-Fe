import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCoordinator = (id: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["update-coordinator", id],
    mutationFn: async (formData: FormData) => {
      console.log("=== SENDING FORM DATA ===");
      // Log all form data entries
      for (const [key, value] of formData.entries()) {
        if (key === 'prof_pic' && value instanceof File) {
          console.log(`${key}: [File] ${value.name} (${value.type})`);
        } else {
          console.log(`${key}:`, value);
        }
      }

      // Use axios instead of fetch for consistency with your api config
      // Axios automatically handles Content-Type for FormData with multipart/form-data
      const res = await api.patch(`/api/coordinator/updateSettings/${id}`, formData, {
        headers: {
          // Don't set Content-Type manually - let axios set it with boundary
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    },
    onSuccess: (data) => {
      console.log("=== UPDATE SUCCESS ===", data);
      queryClient.invalidateQueries({ queryKey: ["coordinator", id] });
      queryClient.invalidateQueries({ queryKey: ["coordinators"] });
      toast.success("Coordinator updated successfully");
    },
    onError: (error: any) => {
      console.error("=== UPDATE ERROR ===");
      console.error("Error details:", error?.response?.data);
      console.error("Error message:", error?.response?.data?.message);
      console.error("Error fields:", error?.response?.data?.errors);
      
      const errorMessage = error?.response?.data?.message 
        || error?.message
        || "Failed to update coordinator";
      toast.error(errorMessage);
    },
  });
};