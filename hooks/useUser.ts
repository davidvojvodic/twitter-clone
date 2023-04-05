import useSWR from "swr";

import fetcher from "@/libs/fetcher";

// Custom hook to fetch current user data
const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useUser;
