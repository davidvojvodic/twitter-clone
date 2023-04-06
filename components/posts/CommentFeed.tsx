import React from "react";
import CommentItem from "./CommentItem";

// Define the props for the CommentFeed component
interface CommentFeedProps {
  comments?: Record<string, any>[]; //An optional array of comments
}

// Define the CommentFeed component
const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  // Render the CommentItem component for each comment in the comments array
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

// Export the CommentFeed component
export default CommentFeed;
