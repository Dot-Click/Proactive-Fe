import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const searchTrips = async (query: string) => {
  if (!query || query.trim().length === 0) {
    return { trips: [], count: 0 };
  }

  try {
    const response = await api.get("/api/trips/search", {
      params: { query: query.trim() },
    });
    return response.data.data || { trips: [], count: 0 };
  } catch (error) {
    console.error("Search error:", error);
    return { trips: [], count: 0 };
  }
};

export const UseSearchTrips = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ["search-trips", debouncedQuery],
    queryFn: () => searchTrips(debouncedQuery),
    enabled: !!debouncedQuery && debouncedQuery.trim().length > 0,
    staleTime: 30 * 1000,
    retry: 1,
    throwOnError: false,
  });
};
