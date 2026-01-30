import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface ContactInfo {
  contactAddress: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  mapLat: string | null;
  mapLng: string | null;
}

const getContactInfo = async (): Promise<ContactInfo> => {
  const response = await api.get<{ data: ContactInfo }>(
    "/api/user/contact-info"
  );
  return response.data.data ?? {
    contactAddress: null,
    contactPhone: null,
    contactEmail: null,
    mapLat: null,
    mapLng: null,
  };
};

export const useContactInfo = () => {
  return useQuery({
    queryKey: ["contact-info"],
    queryFn: getContactInfo,
    staleTime: 60 * 15 * 1000, // 15 min
  });
};
