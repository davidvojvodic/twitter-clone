import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    // Check if userId is provided and is a string
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    // Find the user with the provided userId
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Count the number of users who are following the user with the provided userId
    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    // Return the user object with the followersCount added to it
    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    // Return a 400 error if there is an error
    return res.status(400).end();
  }
}
