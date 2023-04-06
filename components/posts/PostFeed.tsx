import usePosts from "@/hooks/usePosts"; // Importing custom hook to fetch posts
import React from "react"; // Importing React library
import PostItem from "./PostItem"; // Importing PostItem component

interface PostFeedProps {
  userId?: string; // Optional userId prop
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  // Defining PostFeed component with optional userId prop
  const { data: posts = [] } = usePosts(userId); // Fetching posts using custom hook and setting default value to empty array

  return (
    <>
      {posts.map(
        (
          post: Record<string, any> // Mapping through posts array and rendering PostItem component for each post
        ) => (
          <PostItem userId={userId} key={post.id} data={post} />
        )
      )}
    </>
  );
};

export default PostFeed; // Exporting PostFeed component
