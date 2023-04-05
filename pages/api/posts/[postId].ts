// Import the necessary types from Next.js
import { NextApiRequest, NextApiResponse } from "next";

// Import the Prisma client instance
import prisma from "@/libs/prismadb";

// Define the API route handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    // If not, return a 405 status code (Method Not Allowed)
    return res.status(405).end();
  }

  try {
    // Get the postId parameter from the query string
    const { postId } = req.query;

    // Check if the postId parameter is present and is a string
    if (!postId || typeof postId !== "string") {
      // If not, throw an error
      throw new Error("Invalid ID");
    }

    // Use Prisma to retrieve the post and its comments from the database
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // Return the retrieved post and its comments as a JSON object with a 200 status code
    return res.status(200).json(post);
  } catch (error) {
    // If there are any errors during the retrieval process, log the error to the console and return a 400 status code (Bad Request)
    console.log(error);
    return res.status(400).end();
  }
}
