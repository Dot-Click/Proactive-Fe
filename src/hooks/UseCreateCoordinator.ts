// import api from "@/config/axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";


// export interface CoordinatorData {
//     fullName: string;
//     phoneNumber: string;
//     bio: string;
//     profilePicture: File | null;
//     specialities: string[];
//     languages: string[];
//     certificateLvl: string;
//     yearsOfExperience: number;
//     type: string;
//     accessLvl: string;
//     email: string;
//     password: string;
// }

// const mutationFunction = async (data: FormData) => {
//     try {
//         // Use fetch for multipart/form-data to avoid axios default JSON header
//         const url = `${api.defaults.baseURL}/api/admin/coordinator`;
//         const token = localStorage.getItem("token");

//         const res = await fetch(url, {
//             method: "POST",
//             body: data,
//             headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//             credentials: "include",
//         });

//         const payload = await res.json().catch(() => null);
//         if (!res.ok) {
//             // attach status and payload for caller
//             const err: any = new Error("Create coordinator failed");
//             err.response = { status: res.status, data: payload };
//             // eslint-disable-next-line no-console
//             console.error("Create coordinator API error:", err.response || err);
//             throw err;
//         }

//         return payload;
//     } catch (err: any) {
//         // eslint-disable-next-line no-console
//         console.error("Create coordinator API unexpected error:", err);
//         throw err;
//     }
// };

// export const useCreateCoordinator = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: mutationFunction,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["coordinator"] });
//         },
//     });
// };


import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CoordinatorData {
    fullName: string;
    phoneNumber: string;
    bio: string;
    profilePicture: File | null;
    specialities: string[];
    languages: string[];
    certificateLvl: string;
    yearsOfExperience: number;
    type: string;
    accessLvl: string;
    email: string;
    password: string;
}

export const useCreateCoordinator = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            console.log("=== CREATING COORDINATOR ===");
            // Log all form data entries
            for (const [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: [File] ${value.name} (${value.type})`);
                } else {
                    console.log(`${key}:`, value);
                }
            }

            // Use axios with multipart/form-data
            const res = await api.post("/api/admin/coordinator", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["coordinators"] });
            queryClient.invalidateQueries({ queryKey: ["coordinator"] });
            toast.success("Coordinator created successfully");
        },
        onError: (error: any) => {
            console.error("=== CREATE ERROR ===");
            console.error("Error details:", error?.response?.data);
            console.error("Error message:", error?.response?.data?.message);
            console.error("Error fields:", error?.response?.data?.errors);
            
            const errorMessage = error?.response?.data?.message 
                || error?.message 
                || "Failed to create coordinator";
            toast.error(errorMessage);
        },
    });
};