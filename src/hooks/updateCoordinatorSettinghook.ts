import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateCoordinatorSettingData {
    Name?: string;
    Email?: string;
    prof_pic?: File;
}

const updateCoordinatorSetting = async (data: UpdateCoordinatorSettingData | FormData) => {
    const isFormData = data instanceof FormData;
    const response = await api.patch("/api/coordinator/setting", data, {
        headers: {
            "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        }
    });
    return response.data.data;
};

export const UseupdateCoordinatorSetting = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["update-coordinator-setting"],
        mutationFn: updateCoordinatorSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["coordinator-setting"] });
            toast.success("Settings updated successfully");
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to update settings";
            toast.error(errorMessage);
        },
    });
};
