import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const mutationFunction = async (formData: FormData) => {
    const res = await api.post("/api/trips", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log(res)
    return res.data;
};

export const UseCreateTrip = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: mutationFunction,
        onSuccess: (response) => {
            console.log(response)
            const msg = response?.message ?? response?.data?.message ?? "Trips";
            toast.success(msg);
            navigate("/dashboard/trip-management");
            queryClient.invalidateQueries({ queryKey: ["trips"] });
        },
    });
};
