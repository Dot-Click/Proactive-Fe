import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface SearchCoordinator {
  id: string;
  name: string;
  email: string;
  rating?: number;
  profileImage?: string;
  specialities?: string[];
  location?: string;
  experience?: string;
  [key: string]: any;
}

const searchCoordinators = async (query: string) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    console.log("Searching coordinators for:", query); // Debug log
    const response = await api.get("/api/user/search-coordinators", {
      params: {
        q: query.trim(),
      },
    });
    console.log("Search coordinators response:", response.data); // Debug log
    
    // Extract coordinators array from response
    const result = response.data?.data?.coordinators || response.data?.data || [];
    console.log("Parsed result:", result); // Debug log
    return result;
  } catch (error) {
    console.error("Search coordinators error:", error);
    return [];
  }
};

export const UseSearchCoordinators = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search-coordinators", debouncedQuery],
    queryFn: () => searchCoordinators(debouncedQuery),
    enabled: !!debouncedQuery && debouncedQuery.trim().length >= 2,
    staleTime: 30 * 1000,
    retry: 1,
    throwOnError: false,
  });

  return {
    data: data || [],
    isLoading,
    isError,
  };
};

export type { SearchCoordinator };
