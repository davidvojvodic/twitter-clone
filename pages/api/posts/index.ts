import serverAuth from "@/libs/serverAuth"; // Importing serverAuth middleware
import { NextApiRequest, NextApiResponse } from "next"; // Importing Next.js types
import prisma from "@/libs/prismadb"; // Importing Prisma client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    // Checking if the request method is POST or GET
    return res.status(405).end(); // If not, return a 405 status code
  }

  try {
    if (req.method === "POST") {
      // If the request method is POST
      const { currentUser } = await serverAuth(req, res); // Authenticate the user using serverAuth middleware
      const { body } = req.body; // Get the post body from the request body

      const post = await prisma.post.create({
        // Create a new post using Prisma client
        data: {
          body,
          userId: currentUser.id, // Set the user ID as the current user's ID
        },
      });

      return res.status(200).json(post); // Return the created post
    }

    if (req.method === "GET") {
      // If the request method is GET
      const { userId } = req.query; // Get the user ID from the query parameters

      let posts;

      if (userId && typeof userId === "string") {
        // If the user ID is provided and is a string
        posts = await prisma.post.findMany({
          // Find all posts by the user using Prisma client
          where: {
            userId,
          },
          include: {
            user: true, // Include the user who created the post
            comments: true, // Include all comments on the post
          },
          orderBy: {
            createdAt: "desc", // Order the posts by creation date in descending order
          },
        });
      } else {
        // If the user ID is not provided or is not a string
        posts = await prisma.post.findMany({
          // Find all posts using Prisma client
          include: {
            user: true, // Include the user who created the post
            comments: true, // Include all comments on the post
          },
          orderBy: {
            createdAt: "desc", // Order the posts by creation date in descending order
          },
        });
      }

      return res.status(200).json(posts); // Return the found posts
    }
  } catch (error) {
    // If there is an error
    console.log(error); // Log the error to the console
    return res.status(400).end(); // Return a 400 status code
  }
}
