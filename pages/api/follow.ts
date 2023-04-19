import serverAuth from "@/libs/serverAuth"; // Importing serverAuth function for authentication
import { NextApiRequest, NextApiResponse } from "next"; // Importing Next.js types for request and response
import prisma from "@/libs/prismadb"; // Importing Prisma client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    // Checking if HTTP method is POST or DELETE
    return res.status(405).end(); // Returning 405 error if it's not
  }

  try {
    const { userId } = req.body; // Extracting userId from request body

    const { currentUser } = await serverAuth(req, res); // Authenticating user with serverAuth function

    if (!userId || typeof userId !== "string") {
      // Checking if userId is a valid string
      throw new Error("Invalid ID"); // Throwing error if it's not
    }

    const user = await prisma.user.findUnique({
      // Finding user with given ID using Prisma
      where: {
        id: userId,
      },
    });

    if (!user) {
      // Checking if user exists
      throw new Error("Invalid ID"); // Throwing error if it doesn't
    }

    let updatedFollowingIds = [...(user.followingIds || [])]; // Creating a copy of user's followingIds array

    if (req.method === "POST") {
      // If HTTP method is POST
      updatedFollowingIds.push(userId); // Add userId to followingIds array

      try {
        await prisma.notification.create({
          data: {
            body: "Someone followed you!",
            userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === "DELETE") {
      // If HTTP method is DELETE
      updatedFollowingIds = updatedFollowingIds.filter(
        // Remove userId from followingIds array
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      // Update current user's followingIds array in database
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser); // Return updated user as JSON response
  } catch (error) {
    console.log(error); // Log any errors
    return res.status(400).end(); // Return 400 error response
  }
}
