import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Types for the search response
export interface AchievementUser {
  id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  avatar: string;
  fullName: string;
}

export interface AchievementTrip {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface SearchAchievement {
  id: string;
  points: number;
  progress: number;
  level: string;
  badges: string;
  unlocked: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  user: AchievementUser;
  trip: AchievementTrip;
}

export interface SearchAchievementsResponse {
  achievements: SearchAchievement[];
  count: number;
}

const searchAchievements = async (
  query: string
): Promise<SearchAchievementsResponse> => {
  if (!query || query.trim().length === 0) {
    return { achievements: [], count: 0 };
  }

  try {
    const response = await api.get("/api/coordinator/achievements/search", {
      params: { query: query.trim() },
    });
    return response.data.data || { achievements: [], count: 0 };
  } catch (error) {
    console.error("Search achievements error:", error);
    return { achievements: [], count: 0 };
  }
};

export const UseSearchAchievements = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ["search-achievements", debouncedQuery],
    queryFn: () => searchAchievements(debouncedQuery),
    enabled: !!debouncedQuery && debouncedQuery.trim().length > 0,
    staleTime: 30 * 1000,
    retry: 1,
    throwOnError: false,
  });
};
