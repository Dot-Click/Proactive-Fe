import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface ReviewItem {
  link: string;
  userImage: string;
  userName: string;
  review: string;
}

export interface ReviewsResponse {
  reviews: ReviewItem[];
}

const getReviews = async (): Promise<ReviewItem[]> => {
  const response = await api.get<{ data: ReviewsResponse }>(
    "/api/user/reviews"
  );
  console.log('response review', response);
  const data = response.data.data;
  return data?.reviews ?? [];
};

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
    staleTime: 60 * 15 * 1000, // 15 min
  });
};
