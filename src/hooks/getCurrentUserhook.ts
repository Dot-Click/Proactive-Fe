import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

type CurrentUserResponse = Awaited<ReturnType<typeof getCurrentUser>>;
type CurrentUserQueryKey = readonly ["currentUser"];

type CurrentUserQueryOptions = Omit<
  UseQueryOptions<
    CurrentUserResponse,
    Error,
    CurrentUserResponse,
    CurrentUserQueryKey
  >,
  "queryKey" | "queryFn"
>;

export const UsegetCurrentUser = (
  options?: CurrentUserQueryOptions
): UseQueryResult<CurrentUserResponse, Error> => {
  return useQuery<
    CurrentUserResponse,
    Error,
    CurrentUserResponse,
    CurrentUserQueryKey
  >({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    ...options,
  });
};
