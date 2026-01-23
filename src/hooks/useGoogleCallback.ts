import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const verifyGoogleCallback = async (code: string) => {
  const res = await api.get(`/api/auth/google-callback?code=${code}`);
  return res.data.data;
};

export const useGoogleCallback = (code: string | null) => {
  return useQuery({
    queryKey: ["google-callback", code],
    queryFn: () => verifyGoogleCallback(code!),
    enabled: !!code,
  });
};
