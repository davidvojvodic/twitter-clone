import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";

// Custom hook for following/unfollowing a user
const useFollow = (userId: string) => {
  // Get current user data and mutate function from useCurrentUser hook
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  // Get mutate function from useUser hook for the user being followed/unfollowed
  const { mutate: mutateFetchedUser } = useUser(userId);

  // Get login modal state and function from useLoginModal hook
  const loginModal = useLoginModal();

  // Check if current user is already following the user being followed/unfollowed
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  // Function to toggle follow status
  const toggleFollow = useCallback(async () => {
    // If user is not logged in, open login modal
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      // If user is already following, send delete request to unfollow
      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      }
      // If user is not following, send post request to follow
      else {
        request = () => axios.post("/api/follow", { userId });
      }

      // Send request and update current user and fetched user data
      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      // Show success toast
      toast.success("Success");
    } catch (error) {
      console.log(error);
      // Show error toast
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);

  // Return follow status and toggle function
  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
