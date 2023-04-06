import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

// Component for the tweet button in the sidebar
const SidebarTweetBtn = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  // Function to handle the click event of the tweet button
  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen(); // Open the login modal if the user is not logged in
    }

    router.push("/"); // Redirect to the home page if the user is logged in
  }, [loginModal, router, currentUser]);

  // Render the tweet button
  return (
    <div onClick={onClick}>
      {/* Mobile version of the tweet button */}
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      {/* Desktop version of the tweet button */}
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetBtn;
