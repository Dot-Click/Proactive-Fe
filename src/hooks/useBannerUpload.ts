// hooks/useBannerUpload.ts
import { useState } from 'react';
import axios from '../config/axios'; // Import your existing axios config

interface UseBannerUploadProps {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

interface UseBannerUploadReturn {
  uploadBanner: (file: File) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

const useBannerUpload = ({
  onSuccess,
  onError
}: UseBannerUploadProps = {}): UseBannerUploadReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetError = () => setError(null);

  const uploadBanner = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('banner', file);

      // Use your configured axios instance
      const response = await axios.patch(
        '/api/admin/banner', // Relative URL since baseURL is configured in axios.ts
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      if (response.status === 200) {
        // Assuming your API returns the image URL in response.data
        const imageUrl = response.data?.url || response.data?.imageUrl || URL.createObjectURL(file);
        onSuccess?.(imageUrl);
      } else {
        throw new Error('Failed to upload banner');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Upload failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadBanner, isLoading, error, resetError };
};

export default useBannerUpload;