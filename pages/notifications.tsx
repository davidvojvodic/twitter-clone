import Header from "@/components/Header"; // Importing Header component
import { NextPageContext } from "next"; // Importing NextPageContext type
import { getSession } from "next-auth/react"; // Importing getSession function from next-auth/react
import React from "react"; // Importing React library
import NotificationsFeed from "@/components/NotificationsFeed"; // Importing NotificationsFeed component

// Function to get server-side props
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context); // Getting session from context

  if (!session) {
    // If session doesn't exist
    return {
      redirect: {
        // Redirect to homepage
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    // Return session as props
    props: {
      session,
    },
  };
}

// Notifications component
const Notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      {/* // Render Header component with label and back arrow */}
      <NotificationsFeed />
      {/* // Render NotificationsFeed component */}
    </>
  );
};

export default Notifications; // Export Notifications component as default
