import api from "@/config/axios";
import { supabase } from "@/config/supabase";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const mutationFunction = async (): Promise<AxiosResponse<any, any, {}>> => {
    const res = await api.post("/api/auth/logout");
    await supabase.auth.signOut();
    return res;
};

export const useLogoutUser = () => {
    const navigate = useNavigate();
    return useMutation<AxiosResponse<any, any, {}>, Error>({
        mutationFn: mutationFunction,
        onSettled: (data, error) => {
             // Always clear local storage and redirect, even if the API call fails
            localStorage.clear();
            if (data) {
                toast.success(data?.data?.message);
            } else if (error) {
                 // Optional: toast.error("Logged out locally");
            }
            navigate("/login");
        },
    });
};