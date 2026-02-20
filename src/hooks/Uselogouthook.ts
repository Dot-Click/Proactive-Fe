import api from "@/config/axios";
import { supabase } from "@/config/supabase";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const mutationFunction = async (_vars?: { role?: string }): Promise<AxiosResponse<any, any, {}>> => {
    const res = await api.post("/api/auth/logout");
    await supabase.auth.signOut();
    return res;
};

export const useLogoutUser = () => {
    const navigate = useNavigate();
    return useMutation<AxiosResponse<any, any, {}>, Error, { role?: string }>(
        {
            mutationFn: mutationFunction,
            onSettled: (data, error, variables) => {
                // Always clear local storage and redirect, even if the API call fails
                localStorage.clear();
                if (data) {
                    toast.success(data?.data?.message);
                } else if (error) {
                    // Optional: toast.error("Logged out locally");
                }

                // Redirect behavior: when a 'user' logs out, reload or navigate to the landing page to clear session UI;
                // otherwise navigate to /login.
                if (variables?.role === 'user') {
                    if (typeof window !== 'undefined') {
                        if (window.location.pathname === '/') {
                            window.location.reload();
                        } else {
                            window.location.href = '/';
                        }
                    } else {
                        navigate('/');
                    }
                } else {
                    navigate('/login');
                }
            },
        }
    );
};