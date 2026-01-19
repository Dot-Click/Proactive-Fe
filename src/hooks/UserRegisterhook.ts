import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom"



interface UserData {
    FirstName: string;
    LastName: string;
    NickName?: string;
    PhoneNumber: string;
    DOB: string;
    Gender: string;
    Address: string;
    email: string;
    Password: string;
}

const mutationFunction = async (data: UserData) =>
    {
     const res = await api.post("/api/auth/register", data);
 
  return res.data; 
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<AxiosResponse<any>, Error, UserData>({
    mutationFn: mutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/verify-email"); // ✅ redirect after signup
    },
  });
};