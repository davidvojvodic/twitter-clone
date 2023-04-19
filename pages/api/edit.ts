import serverAuth from "@/libs/serverAuth"; // import serverAuth function for authentication
import { NextApiRequest, NextApiResponse } from "next"; // import Next.js types for request and response
import prisma from "@/libs/prismadb"; // import Prisma client for database operations

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    // if request method is not PATCH, return 405 status code
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res); // authenticate user using serverAuth function

    const { name, username, bio, profileImage, coverImage } = req.body; // get user data from request body

    if (!name || !username) {
      // if name or username is missing, throw an error
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      // update user data in database using Prisma client
      where: {
        id: currentUser.id, // find user by ID
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser); // return updated user data as JSON
  } catch (error) {
    console.log(error); // log any errors
    return res.status(400).end(); // return 400 status code for bad request
  }
}
