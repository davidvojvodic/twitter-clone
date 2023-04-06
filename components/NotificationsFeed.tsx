import useCurrentUser from "@/hooks/useCurrentUser"; // import custom hook for getting current user
import useNotifications from "@/hooks/useNotifications"; // import custom hook for getting notifications
import React, { useEffect } from "react"; // import React and useEffect
import { BsTwitter } from "react-icons/bs"; // import Twitter icon from react-icons

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser(); // use custom hook to get current user and mutate function
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id); // use custom hook to get notifications for current user

  useEffect(() => {
    mutateCurrentUser(); // call mutate function to update current user data
  }, [mutateCurrentUser]); // run effect only when mutate function changes

  if (fetchedNotifications.length === 0) {
    // if there are no notifications
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map(
        (
          notification: Record<string, any> // map through notifications and display them
        ) => (
          <div
            key={notification.id}
            className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
          >
            <BsTwitter color="white" size={32} />
            {/* // display Twitter icon */}
            <p className="text-white">{notification.body}</p>
            {/* // display notification body */}
          </div>
        )
      )}
    </div>
  );
};

export default NotificationsFeed;
