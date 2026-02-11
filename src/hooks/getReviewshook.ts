import api from "@/config/axios";
import type { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

export interface ReviewItem {
  id: string;
  link?: string;
  userImage?: string;
  userName: string;
  review: string;
  rating?: number;
}

interface ApiReviewPayload {
  id?: string;
  _id?: string;
  link?: string;
  reviewLink?: string;
  userImage?: string;
  profileImage?: string;
  avatar?: string;
  userName?: string;
  name?: string;
  review?: string;
  comment?: string;
  rating?: number;
}

interface ReviewsEnvelope {
  reviews?: ApiReviewPayload[];
}

type ApiReviewsResponse =
  | { data?: ReviewsEnvelope }
  | { reviews?: ApiReviewPayload[] }
  | ReviewsEnvelope;

const extractReviewsArray = (payload: ApiReviewsResponse): ApiReviewPayload[] => {
  if (!payload) return [];

  if (Array.isArray((payload as ReviewsEnvelope).reviews)) {
    return (payload as ReviewsEnvelope).reviews ?? [];
  }

  if ("data" in payload && payload.data) {
    return payload.data?.reviews ?? [];
  }

  return [];
};

const normaliseReview = (review: ApiReviewPayload, index: number): ReviewItem | null => {
  const content = review.review ?? review.comment ?? "";
  const userName = review.userName ?? review.name ?? "";

  if (!content.trim() || !userName.trim()) {
    return null;
  }

  return {
    id: review.id ?? review._id ?? `review-${index}`,
    link: review.link ?? review.reviewLink,
    userImage: review.userImage ?? review.profileImage ?? review.avatar,
    userName: userName.trim(),
    review: content.trim(),
    rating: review.rating,
  };
};

const resolveErrorMessage = (error: unknown): string => {
  if ((error as AxiosError)?.isAxiosError) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return (
      axiosError.response?.data?.message ??
      axiosError.message ??
      "Unable to load reviews right now."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred while loading reviews.";
};

const getReviews = async (): Promise<ReviewItem[]> => {
  try {
    const response = await api.get<ApiReviewsResponse>("/api/user/reviews");
    const reviews = extractReviewsArray(response.data ?? {});

    return reviews
      .map(normaliseReview)
      .filter((item): item is ReviewItem => Boolean(item));
  } catch (error) {
    throw new Error(resolveErrorMessage(error));
  }
};

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
    staleTime: 15 * 60 * 1000,
    retry: 1,
  });
};
