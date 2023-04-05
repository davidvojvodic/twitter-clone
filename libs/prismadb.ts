import { PrismaClient } from "@prisma/client";

// Declare a global variable `prisma` of type `PrismaClient` or `undefined`
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a new instance of `PrismaClient` if `prisma` is not already defined globally
const client = globalThis.prisma || new PrismaClient();

// If not in production environment, set the global `prisma` variable to the `client` instance
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// Export the `PrismaClient` instance as the default export of the module
export default client;
