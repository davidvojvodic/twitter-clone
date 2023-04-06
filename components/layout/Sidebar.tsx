import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetBtn from "./SidebarTweetBtn";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

// Define the Sidebar component
const Sidebar = () => {
  // Get the current user data using the useCurrentUser hook
  const { data: currentUser } = useCurrentUser();

  // Define the sidebar items as an array of objects
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  // Render the Sidebar component
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {/* Render each sidebar item using the SidebarItem component */}
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {/* Render the logout button if a user is logged in */}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetBtn />
        </div>
      </div>
    </div>
  );
};

// Export the Sidebar component
export default Sidebar;
