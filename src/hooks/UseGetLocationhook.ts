import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export const UseGetLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await api.get("/api/admin/location");
      
      // LOGGING TO HELP YOU SEE
      console.log("Full Axios Response:", res.data);

      /**
       * CRITICAL FIX: 
       * If your API returns { success: true, data: [...] } 
       * we must return 'res.data.data'.
       */
      if (res.data && Array.isArray(res.data.data)) {
        return res.data.data;
      }

      // If the API returns the array directly [...]
      if (Array.isArray(res.data)) {
        return res.data;
      }

      // Fallback: Return empty array so the app doesn't crash
      return [];
    },
  });
};