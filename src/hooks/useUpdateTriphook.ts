import api from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/** Matches backend trips table / updateTrip API (camelCase). included/notIncluded are arrays for jsonb. */
export interface UpdateTripPayload {
  title?: string;
  description?: string;
  shortDesc?: string;
  type?: string;
  location?: string;
  mapCoordinates?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  longDesc?: string;
  groupSize?: string;
  rhythm?: string;
  sportLvl?: string;
  included?: string[]; // jsonb
  notIncluded?: string[]; // jsonb
  bestPriceMsg?: string;
  perHeadPrice?: string;
  instaLink?: string;
  likedinLink?: string;
  coordinators?: string;
  coordinatorRole?: string;
  coordinatorBio?: string;
  coordinatorInstagram?: string;
  coordinatorLinkedin?: string;
}

interface UpdateTripParams {
  id: string;
  formData: FormData;
}

const updateTripMutation = async ({ id, formData }: UpdateTripParams) => {
  const response = await api.put(`/api/trips/${id}`, formData);
  return response.data;
};

export const UseUpdateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-trip"],
    mutationFn: updateTripMutation,
    onSuccess: (response) => {
      const msg =
        response?.message ??
        response?.data?.message ??
        "Trip updated successfully";
      toast.success(msg);
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
    onError: (error: any) => {
      console.error("Trip update error:", error);

      // Handle validation errors
      const respData = error?.response?.data;
      if (respData) {
        // Check if there are validation errors
        if (respData.errors && typeof respData.errors === "object") {
          const errorMessages = Object.values(respData.errors)
            .flat()
            .filter((msg) => typeof msg === "string")
            .join(", ");
          toast.error(errorMessages || "Validation failed");
        } else if (typeof respData === "string") {
          toast.error(respData);
        } else if (respData.message) {
          if (typeof respData.message === "string") {
            toast.error(respData.message);
          } else {
            toast.error(JSON.stringify(respData.message));
          }
        } else {
          toast.error(JSON.stringify(respData));
        }
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update trip");
      }
    },
  });
};
