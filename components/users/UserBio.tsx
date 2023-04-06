import useCurrentUser from "@/hooks/useCurrentUser"; // import custom hook to get current user data
import useUser from "@/hooks/useUser"; // import custom hook to get user data
import React, { useMemo } from "react"; // import React and useMemo hook
import { format } from "date-fns"; // import date-fns library for date formatting
import Button from "../Button"; // import Button component
import { BiCalendar } from "react-icons/bi"; // import BiCalendar icon from react-icons library
import useEditModal from "@/hooks/useEditModal"; // import custom hook to handle edit modal
import useFollow from "@/hooks/useFollow"; // import custom hook to handle follow/unfollow functionality

interface UserBioProps {
  userId: string; // define prop for user ID
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  // define UserBio component with props
  const { data: currentUser } = useCurrentUser(); // get current user data using custom hook
  const { data: fetchedUser } = useUser(userId); // get user data using custom hook

  const editModal = useEditModal(); // initialize edit modal using custom hook

  const { isFollowing, toggleFollow } = useFollow(userId); // get follow/unfollow functionality using custom hook

  const createdAt = useMemo(() => {
    // memoize createdAt variable to avoid unnecessary re-renders
    if (!fetchedUser?.createdAt) {
      // if user creation date is not available, return null
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy"); // format user creation date using date-fns library
  }, [fetchedUser?.createdAt]); // dependency array for useMemo hook

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      {/* // render user bio component */}
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? ( // if current user is viewing their own profile, show edit button
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          // if current user is viewing someone else's profile, show follow/unfollow button
          <Button
            onClick={toggleFollow}
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>

            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio; // export UserBio component
