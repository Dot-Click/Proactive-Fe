import api from "@/config/axios";
import { useMutation  } from "@tanstack/react-query";

const updateSetting = async (data: any) => {
const isFormData = data instanceof FormData;
    const response = await api.patch("/api/admin/settings", data, {
        headers: {
            "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        }
    });
    return response.data.data;
};

export const UseupdateSetting = () => {
    return useMutation({
        mutationKey: ["updatesetting"],
        mutationFn: updateSetting,
    });
}