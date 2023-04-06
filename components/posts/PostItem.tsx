import useCurrentUser from "@/hooks/useCurrentUser"; // Import custom hook for getting the current user
import useLoginModal from "@/hooks/useLoginModal"; // Import custom hook for handling the login modal
import { formatDistanceToNowStrict } from "date-fns"; // Import date-fns function for formatting date
import { useRouter } from "next/router"; // Import Next.js router
import React, { useCallback, useMemo } from "react"; // Import React and necessary hooks
import Avatar from "../Avatar"; // Import Avatar component
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from "react-icons/ai"; // Import necessary icons
import useLike from "@/hooks/useLike"; // Import custom hook for handling post likes

interface PostItemProps {
  data: Record<string, any>; // Define data prop as an object with string keys and any values
  userId?: string; // Define optional userId prop as a string
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  // Define PostItem component with data and userId props
  const router = useRouter(); // Initialize Next.js router
  const loginModal = useLoginModal(); // Initialize login modal custom hook

  const { data: currentUser } = useCurrentUser(); // Initialize custom hook for getting the current user

  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId }); // Initialize custom hook for handling post likes

  const goToUser = useCallback(
    // Define function for navigating to user profile
    (event: any) => {
      event.stopPropagation(); // Prevent event from bubbling up to parent elements

      router.push(`/users/${data.user.id}`); // Navigate to user profile page
    },
    [router, data.user.id] // Specify dependencies for useCallback hook
  );

  const goToPost = useCallback(() => {
    // Define function for navigating to post page
    router.push(`/posts/${data.id}`); // Navigate to post page
  }, [router, data.id]); // Specify dependencies for useCallback hook

  const onLike = useCallback(
    // Define function for handling post likes
    (event: any) => {
      event.stopPropagation(); // Prevent event from bubbling up to parent elements

      if (!currentUser) {
        // If user is not logged in
        return loginModal.onOpen(); // Open login modal
      }

      toggleLike(); // Toggle post like
    },
    [loginModal, currentUser, toggleLike] // Specify dependencies for useCallback hook
  );

  const createdAt = useMemo(() => {
    // Define memoized function for formatting post creation date
    if (!data?.createdAt) {
      // If createdAt property does not exist in data object
      return null; // Return null
    }

    return formatDistanceToNowStrict(new Date(data.createdAt)); // Format createdAt date using date-fns function
  }, [data?.createdAt]); // Specify dependencies for useMemo hook

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart; // Set LikeIcon based on whether user has liked post

  return (
    // Render PostItem component
    <div
      onClick={goToPost} // Navigate to post page on click
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        {/* // Render Avatar component with user id */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser} // Navigate to user profile on click
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
              {/* // Render user name */}
            </p>
            <span
              onClick={goToUser} // Navigate to user profile on click
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.username}
              {/* // Render user username */}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
            {/* // Render formatted creation date */}
          </div>
          <div className="text-white mt-1">{data.body}</div>
          {/* // Render post body */}
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              {/* // Render comment icon */}
              <p>{data.comments?.length || 0}</p>
              {/* // Render number of comments */}
            </div>
            <div
              onClick={onLike} // Handle post like on click
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <LikeIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
