import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const searchUsers = async (query: string) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    console.log("Searching for:", query); // Debug log
    const response = await api.get("/api/user/search", {
      params: {
        q: query.trim(),
      },
    });
    console.log("Search response:", response.data); // Debug log
    
    // Extract users array from response.data.data.users
    const result = response.data?.data?.users || [];
    console.log("Parsed result:", result); // Debug log
    return result;
  } catch (error) {
    console.error("Search users error:", error);
    return [];
  }
};

export const UseSearchUsers = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search-users", debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
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
