import "@/styles/globals.css"; // Import global styles
import type { AppProps } from "next/app"; // Import AppProps type from Next.js
import Layout from "../components/Layout"; // Import custom Layout component
import LoginModal from "@/components/modals/LoginModal"; // Import custom LoginModal component
import RegisterModal from "@/components/modals/RegisterModal"; // Import custom RegisterModal component
import { Toaster } from "react-hot-toast"; // Import Toaster component from react-hot-toast
import { SessionProvider } from "next-auth/react"; // Import SessionProvider from next-auth/react
import EditModal from "@/components/modals/EditModal"; // Import custom EditModal component

export default function App({ Component, pageProps }: AppProps) {
  // Define App component with Component and pageProps as props
  return (
    <SessionProvider session={pageProps.session}>
      {/* Wrap components with SessionProvider and pass session prop from pageProps */}
      {/* Render Toaster component from react-hot-toast */}
      <Toaster />
      {/* Render custom EditModal component */}
      <EditModal />
      {/* Render custom RegisterModal component */}
      <RegisterModal />
      {/* Render custom LoginModal component */}
      <LoginModal />
      {/* Render custom Layout component */}
      <Layout>
        {/* Render Component with pageProps as props */}
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
