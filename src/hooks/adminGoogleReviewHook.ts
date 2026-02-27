import api from "@/config/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface GoogleReview {
    id: string;
    reviewerName: string;
    reviewText: string;
    stars: number;
    profilePicture: string;
    language: "en" | "es";
    reviewLink?: string;
    isActive?: boolean;
}

export const useAdminGoogleReviews = () => {
    return useQuery({
        queryKey: ["admin-google-reviews"],
        queryFn: async () => {
            try {
                const response = await api.get("/api/admin/google-reviews");
                const payload = response.data;
                if (!payload) return [];

                // Try nested structure first: response.data.data.reviews
                if (payload?.data && Array.isArray(payload.data.reviews)) {
                    return payload.data.reviews as GoogleReview[];
                }

                // Try flat structure: response.data.reviews
                if (payload && Array.isArray(payload.reviews)) {
                    return payload.reviews as GoogleReview[];
                }

                // Try direct array
                if (Array.isArray(payload)) {
                    return payload as GoogleReview[];
                }

                return [] as GoogleReview[];
            } catch (err) {
                console.error("Error fetching google reviews:", err);
                return [] as GoogleReview[];
            }
        },
    });
};

const getErrorMessage = (error: any) => {
    const data = error?.response?.data;
    if (typeof data === "string") return data;
    if (data?.message) {
        if (typeof data.message === "string") return data.message;
        return JSON.stringify(data.message);
    }
    return error?.message || "An error occurred";
};

export const useCreateGoogleReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await api.post("/api/admin/google-reviews", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-google-reviews"] });
            toast.success("Review created successfully");
        },
        onError: (error: any) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useUpdateGoogleReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const response = await api.put(`/api/admin/google-reviews/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-google-reviews"] });
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            toast.success("Review updated successfully");
        },
        onError: (error: any) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useDeleteGoogleReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await api.delete(`/api/admin/google-reviews/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-google-reviews"] });
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            toast.success("Review deleted successfully");
        },
        onError: (error: any) => {
            toast.error(getErrorMessage(error));
        },
    });
};
