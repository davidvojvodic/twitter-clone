// Import necessary modules and libraries
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

// Define the handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is POST
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    // Authenticate the user making the request
    const { currentUser } = await serverAuth(req, res);
    // Get the comment body and post ID from the request body and query parameters respectively
    const { body } = req.body;
    const { postId } = req.query;

    // Check if the post ID is valid
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    // Create a new comment in the database
    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    // If the comment was successfully created, check if the post's author should be notified
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      // If the post has an author, create a new notification for them and update their notification status
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replied to your tweet!",
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    // Return the newly created comment
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    // If there was an error, return a 400 status code
    return res.status(400).end();
  }
}
