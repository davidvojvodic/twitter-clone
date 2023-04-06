import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

// Defining the handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Checking if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).end(); // If not, return a 405 error
  }

  try {
    const { userId } = req.query; // Extracting the userId from the request query

    // Checking if the userId is valid
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    // Finding all notifications for the given userId and ordering them by createdAt in descending order
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Updating the user's hasNotification field to false
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    // Returning the notifications as a JSON response
    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error); // Logging any errors
    return res.status(400).end(); // Returning a 400 error
  }
}
