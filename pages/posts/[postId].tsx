import usePost from "@/hooks/usePost"; // Importing custom hook to fetch post data
import { useRouter } from "next/router"; // Importing Next.js router
import React from "react"; // Importing React
import { ClipLoader } from "react-spinners"; // Importing loading spinner
import Header from "@/components/Header"; // Importing custom header component
import PostItem from "@/components/posts/PostItem"; // Importing custom post item component
import Form from "@/components/Form"; // Importing custom form component
import CommentFeed from "@/components/posts/CommentFeed"; // Importing custom comment feed component

const PostView = () => {
  const router = useRouter(); // Initializing router
  const { postId } = router.query; // Getting postId from router query

  const { data: fetchedPost, isLoading } = usePost(postId as string); // Fetching post data using custom hook

  if (isLoading || !fetchedPost) {
    // If data is still loading or post data is not available
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
        {/* // Show loading spinner */}
      </div>
    );
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      {/* // Show custom header component */}
      <PostItem data={fetchedPost} />
      {/* // Show custom post item component with fetched post data */}
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      {/* // Show custom form component to add comments */}
      <CommentFeed comments={fetchedPost?.comments} />
      {/* // Show custom comment feed component with fetched post comments */}
    </>
  );
};

export default PostView; // Exporting PostView component
