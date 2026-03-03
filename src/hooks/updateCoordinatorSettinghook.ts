import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateCoordinatorSettingData {
    Name?: string;
    Email?: string;
    prof_pic?: File;
    PhoneNumber?: string;
    Bio?: string;
    notificationPref?: {
        emailNotf: boolean;
        appAlert: boolean;
        reviewNotf: boolean;
    };
}

const updateCoordinatorSetting = async (data: UpdateCoordinatorSettingData | FormData) => {
    let requestData = data;
    let headers: any = {};

    // If it's a plain object, convert to FormData
    if (!(data instanceof FormData)) {
        const formData = new FormData();
        if (data.Name) formData.append("Name", data.Name);
        if (data.Email) formData.append("Email", data.Email);
        if (data.PhoneNumber) formData.append("PhoneNumber", data.PhoneNumber);
        if (data.Bio) formData.append("Bio", data.Bio);
        if (data.notificationPref) {
            formData.append("notificationPref", JSON.stringify(data.notificationPref));
        }
        requestData = formData;
    }

    const response = await api.patch("/api/coordinator/setting", requestData, {
        headers,
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
