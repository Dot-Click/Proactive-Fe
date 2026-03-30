import { supabase } from "@/config/supabase";
import { useMutation } from "@tanstack/react-query";

const googleSignup = async () => {
    const redirectTo =
        import.meta.env.VITE_GOOGLE_REDIRECT_URL ||
        `${window.location.origin}/user-dashboard`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
            redirectTo,
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
