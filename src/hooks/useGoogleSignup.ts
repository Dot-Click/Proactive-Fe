import api from "@/config/axios";
import { useMutation } from "@tanstack/react-query";



const getGoogleOAuthUrl = async (): Promise<{ url: string }> => {
    const res = await api.post("/api/auth/google-signup");
    return res.data.data;
};

export const useGoogleSignup = () => {
    return useMutation({
        mutationFn: getGoogleOAuthUrl,
        onSuccess: ({ url }) => {
            window.location.assign(url);
        }
    });
};
