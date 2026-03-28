import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../config/axios';

interface BannerData {
  url: string;
  alt?: string;
}

interface UseBannerReturn {
  banner: BannerData | null;
  isLoading: boolean;
  uploadBanner: (file: File) => Promise<any>;
  isUploading: boolean;
  error: string | null;
}

const fetchBannerData = async (): Promise<BannerData | null> => {
    const response = await axios.get('/api/admin/banner');
    const responseData = response.data;
    if (responseData?.success && responseData?.data?.banner) {
        return { 
            url: responseData.data.banner, 
            alt: 'Banner' 
        };
    }
    return null;
};

const useGetBanner = (): UseBannerReturn => {
    const queryClient = useQueryClient();

    const { data: banner, isLoading, error: queryError } = useQuery({
        queryKey: ['adminBanner'],
        queryFn: fetchBannerData,
        staleTime: 1000 * 60 * 10, // 10 minutes
        gcTime: 1000 * 60 * 15,    // 15 minutes
    });

    const mutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('banner', file);
            const response = await axios.patch('/api/admin/banner', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminBanner'] });
        }
    });

    const error = queryError ? (queryError as any).response?.data?.message || 'Failed to load banner' : null;
    const uploadError = mutation.error ? (mutation.error as any).response?.data?.message || 'Upload failed' : null;

    return { 
        banner: banner || null, 
        isLoading, 
        uploadBanner: mutation.mutateAsync, 
        isUploading: mutation.isPending, 
        error: error || uploadError 
    };
};

export default useGetBanner;