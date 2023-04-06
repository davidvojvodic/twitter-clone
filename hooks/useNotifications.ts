import useSWR from "swr"; // Importing the useSWR hook from the swr library
import fetcher from "@/libs/fetcher"; // Importing the fetcher function from the fetcher module

// Defining a custom hook called useNotifications that takes an optional userId parameter
const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null; // If userId is provided, set the url to the notifications endpoint for that user, otherwise set it to null
  const { data, error, isLoading, mutate } = useSWR(url, fetcher); // Using the useSWR hook to fetch data from the url using the fetcher function

  return {
    data, // The data returned from the API
    error, // Any error that occurred while fetching the data
    isLoading, // A boolean indicating whether the data is currently being fetched
    mutate, // A function to manually mutate the data
  };
};

export default useNotifications; // Exporting the useNotifications hook as the default export of this module
