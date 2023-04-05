import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/libs/prismadb";

// This function checks if the user is authenticated and returns the current user
const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  // If the user is not signed in, throw an error
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // Find the current user in the database using their email
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // If the current user is not found, throw an error
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  // Return the current user
  return { currentUser };
};

export default serverAuth;
