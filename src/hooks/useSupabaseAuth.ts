import { useEffect } from "react";
import { supabase } from "@/config/supabase";
import api from "@/config/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const useSupabaseAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_IN" && session) {
                // Ensure we store the Supabase token for Axios
                localStorage.setItem("token", session.access_token);
                
                try {
                    // Call the backend API to sync/register the user
                    // Using the access token from Supabase session
                     const response = await api.post("/api/auth/google-callback", {
                        token: session.access_token,
                        user: session.user
                    });
                    
                    const role = response?.data?.data?.user?.role
                    // We rely on the Supabase token, so we don't overwrite it with the backend response token
                    // const token = response?.data?.data?.accessToken 
                    
                    // We might still want the internal user ID if the backend provides one mapping to the Supabase ID
                     if (response?.data?.data?.user?.id) {
                        localStorage.setItem("userId", response?.data?.data?.user.id)
                    }

                    // Invalidate currentUser query to refresh user data (including avatar)
                    queryClient.invalidateQueries({ queryKey: ["currentUser"] });

                    toast.success("Logged in successfully!");
                     
                     if (!role) {
                         // Default fallback if role is missing in response, though backend should provide it
                         navigate("/user-dashboard"); 
                         return
                    }

                    switch (role) {
                        case 'admin':
                            navigate("/dashboard");
                            break;
                        case "coordinator":
                            navigate("/coordinator-dashboard");
                            break;
                        case "user":
                            navigate('/user-dashboard');
                            break;
                        default:
                            navigate('/login');
                            break;
                    }

                } catch (error: any) {
                    console.error("Error syncing user with backend:", error);
                    toast.warning(error?.response?.data?.message || "Failed to sync user with backend.");
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);
};
