 
// import api from "@/config/axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// interface UpdateCoordinatorData {
//   fullName?: string;
//   phoneNumber?: string;
//   bio?: string;
//   specialities?: string[];
//   languages?: string[];
//   certificateLvl?: string;
//   yearsOfExperience?: number;
//   type?: string;
//   accessLvl?: string;
//   location?: string;
//   password?: string;
// }

// const updateCoordinator = async (id: string, data: UpdateCoordinatorData | FormData) => {
//   const isFormData = data instanceof FormData;
//   const config = {
//     headers: isFormData ? { "Content-Type": "multipart/form-data" } : {}
//   };
  
//   const response = await api.patch(`/api/coordinator/updateSettings/${id}`, data, config);
//   return response.data;
// };

// export const useUpdateCoordinator = (id: string) => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationKey: ["update-coordinator", id],
//     mutationFn: (data: UpdateCoordinatorData | FormData) => updateCoordinator(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["coordinator", id] });
//       queryClient.invalidateQueries({ queryKey: ["coordinators"] });
//       toast.success("Coordinator updated successfully");
//     },
//     onError: (error: any) => {
//       const errorMessage = error?.response?.data?.message || "Failed to update coordinator";
//       toast.error(errorMessage);
//     },
//   });
// };


 
// import api from "@/config/axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// interface UpdateCoordinatorData {
//   fullName?: string;
//   phoneNumber?: string;
//   bio?: string;
//   specialities?: string[];
//   languages?: string[];
//   certificateLvl?: string;
//   yearsOfExperience?: number;
//   type?: string;
//   accessLvl?: string;
//   location?: string;
//   password?: string;
// }

// const updateCoordinator = async (id: string, data: UpdateCoordinatorData | FormData) => {
//   const isFormData = data instanceof FormData;
//   const config = {
//     headers: isFormData ? { "Content-Type": "multipart/form-data" } : {}
//   };
  
//   const response = await api.patch(`/api/coordinator/updateSettings/${id}`, data, config);
//   return response.data;
// };

// export const useUpdateCoordinator = (id: string) => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationKey: ["update-coordinator", id],
//     mutationFn: (data: UpdateCoordinatorData | FormData) => updateCoordinator(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["coordinator", id] });
//       queryClient.invalidateQueries({ queryKey: ["coordinators"] });
//       toast.success("Coordinator updated successfully");
//     },
//     onError: (error: any) => {
//       const errorMessage = error?.response?.data?.message || "Failed to update coordinator";
//       toast.error(errorMessage);
//     },
//   });
// };

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
      // Use fetch to send multipart/form-data so boundary is handled automatically
      const url = `${api.defaults.baseURL}/api/coordinator/updateSettings/${id}`;
      const token = localStorage.getItem("token");

      const res = await fetch(url, {
        method: "PATCH",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        credentials: "include",
      });

      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        const err: any = new Error("Update coordinator failed");
        err.response = { status: res.status, data: payload };
        // eslint-disable-next-line no-console
        console.error("Update coordinator API error:", err.response || err);
        throw err;
      }

      return payload;
    },
    onSuccess: () => {
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
        || "Failed to update coordinator";
      toast.error(errorMessage);
    },
  });
};