import useSWR from "swr"; // Importing the useSWR hook from the swr library
import fetcher from "@/libs/fetcher"; // Importing the fetcher function from the fetcher module

// Custom hook to fetch current user data
const usePost = (postId: string) => {
  const url = postId ? `/api/posts/${postId}` : null; // Creating the URL for the API endpoint based on the postId parameter

  const { data, error, isLoading, mutate } = useSWR(url, fetcher); // Using the useSWR hook to fetch data from the API endpoint

  return { data, error, isLoading, mutate }; // Returning the fetched data, error, loading state, and mutate function
};

export default usePost; // Exporting the usePost hook as the default export of the module
