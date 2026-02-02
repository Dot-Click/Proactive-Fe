// hooks/useGetBanner.ts
import { useState, useEffect, useCallback } from 'react';
import axios from '../config/axios';

interface BannerData {
  url: string;
  alt?: string;
}

interface UseBannerReturn {
  banner: BannerData | null;
  isLoading: boolean;
  uploadBanner: (file: File) => Promise<void>;
  isUploading: boolean;
  error: string | null;
}

const useGetBanner = (): UseBannerReturn => {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBanner = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/admin/banner');
      
      // Handle your API response: { success: true, message: "...", data: { banner: "url" } }
      const responseData = response.data;
      
      if (responseData?.success && responseData?.data?.banner) {
        setBanner({ 
          url: responseData.data.banner, 
          alt: 'Banner' 
        });
      } else {
        setBanner(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load banner');
      setBanner(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadBanner = async (file: File) => {
    setIsUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('banner', file);

    try {
      const response = await axios.patch('/api/admin/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Handle PATCH response with same structure
      const responseData = response.data;
      
      if (responseData?.success && responseData?.data?.banner) {
        setBanner({ 
          url: responseData.data.banner, 
          alt: 'Banner' 
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  return { banner, isLoading, uploadBanner, isUploading, error };
};

export default useGetBanner;