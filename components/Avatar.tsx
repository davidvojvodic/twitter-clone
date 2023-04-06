import useUser from "@/hooks/useUser"; // Importing custom hook for fetching user data
import { useRouter } from "next/router"; // Importing Next.js router
import React, { useCallback } from "react"; // Importing React and useCallback hook
import Image from "next/image"; // Importing Next.js Image component

interface AvatarProps {
  // Defining interface for Avatar component props
  userId: string; // User ID for fetching user data
  isLarge?: boolean; // Optional boolean for large size
  hasBorder?: boolean; // Optional boolean for border
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  // Defining Avatar component with props
  const { data: fetchedUser } = useUser(userId); // Fetching user data using custom hook
  const router = useRouter(); // Initializing Next.js router

  const onClick = useCallback(
    // Defining onClick function using useCallback hook
    (event: any) => {
      event.stopPropagation(); // Preventing event from bubbling up

      const url = `/users/${userId}`; // Defining URL for user page

      router.push(url); // Navigating to user page
    },
    [router, userId] // Dependencies for useCallback hook
  );

  return (
    <div
      className={`
      ${hasBorder ? "border-4 border-black" : ""}
      ${isLarge ? "h-32" : "h-12"} 
      ${isLarge ? "w-32" : "w-12"} 
      rounded-full 
      hover:opacity-90 
      transition
      cursor-pointer 
      relative 
      `}
    >
      <Image
        fill // Setting fill to true
        style={{ objectFit: "cover", borderRadius: "100%" }} // Styling Image component
        alt="Avatar" // Adding alt text
        onClick={onClick} // Adding onClick function
        src={fetchedUser?.profileImage || "/images/prenos.jpg"} // Setting source for Image component
      />
    </div>
  );
};

export default Avatar; // Exporting Avatar component
