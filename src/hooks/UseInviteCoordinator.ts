import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type InvitePayload = { email: string; password?: string };

const inviteCoordinator = async (payload: InvitePayload) => {
  const res = await api.post("/api/admin/coordinator/invite", payload);
  return res.data;
};

export const useInviteCoordinator = () => {
  const qc = useQueryClient();
  return useMutation<any, any, InvitePayload, unknown>({
    mutationFn: inviteCoordinator,
    onSuccess: (data: any) => {
      qc.invalidateQueries({ queryKey: ["coordinators"] });
      toast.success(data?.message || "Invite sent");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Failed to send invite";
      toast.error(msg);
    },
  });
};
