// Import necessary modules and packages
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import { AuthOptions } from "next-auth";

// Export NextAuth function with configuration options
export const authOptions: AuthOptions = {
  // Use PrismaAdapter for session management
  adapter: PrismaAdapter(prisma),
  // Use CredentialsProvider for authentication
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // Authorize function to check user credentials
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        // Find user with provided email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        // Check if user exists and has a hashed password
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        // Compare provided password with hashed password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        // If password is incorrect, throw error
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        // Return user if credentials are correct
        return user;
      },
    }),
  ],
  // Set debug mode for development environment
  debug: process.env.NODE_ENV === "development",
  // Set session strategy to JWT
  session: {
    strategy: "jwt",
  },
  // Set JWT secret
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  // Set secret for NextAuth
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
