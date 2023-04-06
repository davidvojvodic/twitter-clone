// Import necessary modules
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

// Define the handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is POST or DELETE, otherwise return 405 error
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    // Get the postId from the request body and the currentUser from serverAuth
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req);

    // Check if the postId is valid
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    // Find the post with the given postId
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // Check if the post exists
    if (!post) {
      throw new Error("Invalid ID");
    }

    // Create a copy of the likedIds array and update it based on the request method
    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      // If the request method is POST, add the currentUser's id to the likedIds array
      updatedLikedIds.push(currentUser.id);

      // Create a notification for the post owner if the post has a userId
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Someone liked your tweet!",
              userId: post.userId,
            },
          });

          // Update the post owner's hasNotification field to true
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
    }

    if (req.method === "DELETE") {
      // If the request method is DELETE, remove the currentUser's id from the likedIds array
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser.id
      );
    }

    // Update the post with the new likedIds array and return it
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
