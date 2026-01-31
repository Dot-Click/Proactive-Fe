import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

/** Global settings contact info (from GET /api/user/contact-info) - used in Footer, Contact page */
export interface ContactInfo {
  contactAddress: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  mapLat: string | null;
  mapLng: string | null;
}

const fallbackContact: ContactInfo = {
  contactAddress: null,
  contactPhone: null,
  contactEmail: null,
  mapLat: null,
  mapLng: null,
};

interface ContactInfoResponse {
  data: ContactInfo;
}

const getContactInfo = async (): Promise<ContactInfo> => {
  const response = await api.get<ContactInfoResponse>("/api/user/contact-info");
  const data = response.data?.data;
  if (!data || typeof data !== "object") return fallbackContact;
  return {
    contactAddress: data.contactAddress ?? null,
    contactPhone: data.contactPhone ?? null,
    contactEmail: data.contactEmail ?? null,
    mapLat: data.mapLat ?? null,
    mapLng: data.mapLng ?? null,
  };
};

export const useContactInfo = () => {
  return useQuery({
    queryKey: ["contact-info", "global-settings-contact"],
    queryFn: getContactInfo,
    staleTime: 60 * 15 * 1000, // 15 min
  });
};
