import { useRouter } from "next/router"; // import the useRouter hook from Next.js
import { BsTwitter } from "react-icons/bs"; // import the Twitter icon from react-icons

const SidebarLogo = () => {
  const router = useRouter(); // initialize the useRouter hook

  return (
    <div
      onClick={() => router.push("/")} // navigate to the home page on click
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition"
    >
      <BsTwitter size={28} color="white" />
      {/* // render the Twitter icon */}
    </div>
  );
};

export default SidebarLogo; // export the SidebarLogo component
