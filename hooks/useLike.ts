import { toast } from "react-hot-toast"; // Importing toast notification library
import useCurrentUser from "./useCurrentUser"; // Custom hook to get current user data
import useLoginModal from "./useLoginModal"; // Custom hook to handle login modal
import usePost from "./usePost"; // Custom hook to get post data
import usePosts from "./usePosts"; // Custom hook to get list of posts
import { useMemo, useCallback } from "react"; // Importing useMemo and useCallback hooks from React
import axios from "axios"; // Importing axios library for making HTTP requests

// Defining a custom hook to handle liking/unliking a post
const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser(); // Getting current user data using custom hook
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId); // Getting post data using custom hook

  const { mutate: mutateFetchedPosts } = usePosts(userId); // Getting list of posts using custom hook
  const loginModal = useLoginModal(); // Getting login modal using custom hook
  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id); // Checking if current user has already liked the post
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      // If user is not logged in, show login modal
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        // If user has already liked the post, unlike it
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        // If user has not liked the post, like it
        request = () => axios.post("/api/like", { postId });
      }

      await request(); // Make HTTP request to like/unlike the post
      mutateFetchedPost(); // Update post data
      mutateFetchedPosts(); // Update list of posts

      toast.success("Success"); // Show success toast notification
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong"); // Show error toast notification
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
  ]);

  return { hasLiked, toggleLike }; // Return hasLiked and toggleLike functions
};

export default useLike; // Export the custom hook
