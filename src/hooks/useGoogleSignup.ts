import { supabase } from "@/config/supabase";
import { useMutation } from "@tanstack/react-query";

const googleSignup = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        
        options: {
            redirectTo: `${window.location.origin}/`,
            queryParams: {
                prompt: "select_account",
                access_type: "offline",
            },
        },
    });

    if (error) throw error;
    return data;
};

export const useGoogleSignup = () => {
    return useMutation({
        mutationFn: googleSignup,
    });
};
