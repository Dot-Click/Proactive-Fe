import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface InstagramUser {
  username: string;
  full_name: string;
  profile_pic_url: string;
  profile_link: string;
}

export interface InstagramPost {
  id: string;
  code: string;
  caption: string;
  taken_at: number;
  thumbnail_url: string | null;
  link: string;
  like_count: number;
  comment_count: number;
}

export interface InstagramInfoResponse {
  user: InstagramUser | null;
  posts: InstagramPost[];
}

const getInstaInfo = async (): Promise<InstagramInfoResponse> => {
  const response = await api.get<{ data: InstagramInfoResponse }>(
    "/api/user/insta-info"
  );
  return response.data.data ?? { user: null, posts: [] };
};

export const useInstagramInfo = () => {
  return useQuery({
    queryKey: ["instagram-info"],
    queryFn: getInstaInfo,
    staleTime: 60 * 15 * 1000, // 15 min - insta data doesn't change often
  });
};
