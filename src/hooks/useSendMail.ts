// hooks/useSendMail.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../config/axios"; // Adjust the import path based on where your axios instance is

interface SendMailRequest {
  userEmail: string;
  emailText: string;
}

interface SendMailResponse {
  success: boolean;
  message: string;
}

const sendMail = async ({ userEmail, emailText }: SendMailRequest): Promise<SendMailResponse> => {
  try {
    const response = await api.post('/api/admin/sendMail', {
      userEmail,
      emailText,
    });

    const result = response.data;
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to send email');
    }

    return result;
  } catch (error: any) {
    // Handle axios errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to send email';
      throw new Error(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'Failed to send email');
    }
  }
};

export const useSendMail = () => {
  return useMutation<SendMailResponse, Error, SendMailRequest>({
    mutationFn: sendMail,
    onSuccess: (data) => {
      toast.success(data.message || "Email sent successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to send email: ${error.message}`);
    },
  });
};