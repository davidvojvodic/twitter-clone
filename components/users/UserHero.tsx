import React from "react";
import Image from "next/image";
import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

// UserHero component takes in a userId prop and renders a cover image and avatar for the user
const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  // Fetch user data using the useUser hook
  const { data: fetchedUser } = useUser(userId);
  return (
    <div>
      {/* Render the cover image if it exists */}
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        {/* Render the user avatar */}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
