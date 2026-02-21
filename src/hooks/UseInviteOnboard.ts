import api from "@/config/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const validateToken = async (token: string) => {
  const res = await api.get(`/api/invite/validate?token=${encodeURIComponent(token)}`);
  return res.data;
};

const completeInvite = async (payload: any) => {
  const res = await api.post(`/api/invite/complete`, payload);
  return res.data;
};

export const useValidateInvite = (token?: string) => {
  return useQuery({
    queryKey: ['invite', 'validate', token],
    queryFn: () => validateToken(token || ''),
    enabled: !!token,
    retry: false,
  });
};

export const useCompleteInvite = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: completeInvite,
    onSuccess: (data: any) => {
      qc.invalidateQueries({ queryKey: ['coordinators'] });
      toast.success(data?.message || 'Onboarding complete');
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || 'Failed to complete onboarding';
      toast.error(msg);
    }
  });
};

export default {};
