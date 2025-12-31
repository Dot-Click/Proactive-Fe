import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export interface ApplicationData {
    Name: string;
    Email: string;
    dietaryRestrictions: string;
    shortIntro: string;
    introVideo: string;
}

const mutationFunction = async (data: ApplicationData) => {
    const res = await api.post("/api/user/applications", data);
    return res.data
};

export const UseApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mutationFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Application"] });
        },
    });
};