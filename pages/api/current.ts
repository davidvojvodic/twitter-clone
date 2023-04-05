// Importing the serverAuth function from the serverAuth module and the Next.js types for the request and response objects
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

// Defining an asynchronous function that handles incoming HTTP requests
export default async function handler(
  req: NextApiRequest, // The incoming request object
  res: NextApiResponse // The outgoing response object
) {
  // If the request method is not GET, return a 405 status code (Method Not Allowed)
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Call the serverAuth function passing the request object and get the currentUser object from the returned value
    const { currentUser } = await serverAuth(req);

    // Return a 200 status code and the currentUser object as a JSON response
    return res.status(200).json(currentUser);
  } catch (error) {
    // If an error occurs, log it to the console and return a 400 status code (Bad Request)
    console.log(error);
    return res.status(400).end();
  }
}
