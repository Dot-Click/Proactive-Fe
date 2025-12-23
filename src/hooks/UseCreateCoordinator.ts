import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";


// export interface CoordinatorData {
//     fullName: string;
//     phoneNumber: string;
//     bio: string;
//     profilePicture: File | undefined;
//     specialities: string[];
//     languages: string[];
//     certificateLvl: string;
//     yearsOfExperience: number;
//     type: string;
//     accessLvl: string;
//     email: string;
//     password: string;
// }

const mutationFunction = async (data: FormData): Promise<AxiosResponse<any>> => {
    const res = await api.post("/api/admin/coordinator", data, {
        headers: {"Content-Type": "multipart/form-data"}
    });
    return res.data
};

export const useCreateCoordinator = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mutationFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["coordinator"] });
        },
    });
};