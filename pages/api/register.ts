import { NextApiRequest, NextApiResponse } from "next"; // Importing Next.js API types
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import prisma from "@/libs/prismadb"; // Importing Prisma client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // Checking if the request method is POST
    return res.status(405).end(); // If not, return a 405 error
  }

  try {
    const { email, username, name, password } = req.body; // Destructuring the request body

    const hashedPassword = await bcrypt.hash(password, 12); // Hashing the password with bcrypt

    const user = await prisma.user.create({
      // Creating a new user with Prisma
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return res.status(200).json(user); // Returning the created user as JSON
  } catch (error) {
    console.log(error); // Logging any errors
    return res.status(400).end(); // Returning a 400 error
  }
}
