// Import axios library for making HTTP requests
import axios from "axios";

// Define a function named fetcher that takes a URL as a parameter
const fetcher = (url: string) =>
  // Use axios to make a GET request to the specified URL and return the response data
  axios.get(url).then((res) => res.data);

// Export the fetcher function as the default export of this module
export default fetcher;
