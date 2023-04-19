import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// This function checks if the user is authenticated and returns the current user
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

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
