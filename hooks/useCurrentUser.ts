import useSWR from "swr";

import fetcher from "@/libs/fetcher";

// Custom hook to fetch current user data
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
