// Importing the useUsers hook and the Avatar component from their respective files
import useUsers from "@/hooks/useUsers";
import React from "react";
import Avatar from "../Avatar";

// Defining the FollowBar component
const FollowBar = () => {
  // Using the useUsers hook to get a list of users
  const { data: users = [] } = useUsers();

  // If there are no users, return null
  if (users.length === 0) {
    return null;
  }

  // If there are users, render the FollowBar component
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow?</h2>
        <div className="flex flex-col gap-6 mt-4">
          {/* Map over the list of users and render an Avatar and user information for each */}
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Exporting the FollowBar component
export default FollowBar;
