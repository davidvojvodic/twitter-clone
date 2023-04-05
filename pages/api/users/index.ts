// Importing necessary modules
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

// Defining the handler function for the API endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Checking if the request method is GET, if not returning 405 status code
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Retrieving all users from the database and ordering them by createdAt in descending order
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Returning the retrieved users as a JSON response with 200 status code
    return res.status(200).json(users);
  } catch (error) {
    // Logging the error and returning 400 status code in case of any error
    console.log(error);
    return res.status(400).end();
  }
}
