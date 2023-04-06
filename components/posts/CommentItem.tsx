import { formatDistanceToNowStrict } from "date-fns"; // Importing a function from a date-fns library
import { useRouter } from "next/router"; // Importing a hook from Next.js
import React, { useCallback, useMemo } from "react"; // Importing React and some of its hooks
import Avatar from "../Avatar"; // Importing a custom Avatar component

interface CommentItemProps {
  data: Record<string, any>; // Defining a prop interface with a data object of any type
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  // Defining a functional component with a prop of CommentItemProps
  const router = useRouter(); // Initializing the useRouter hook to access the router object

  const goToUser = useCallback(
    // Defining a callback function to handle clicking on a user's name
    (event: any) => {
      event.stopPropagation(); // Preventing the event from bubbling up the DOM tree

      router.push(`/users/${data.user.id}`); // Navigating to the user's profile page
    },
    [router, data.user.id] // Adding dependencies to the useCallback hook
  );

  const createdAt = useMemo(() => {
    // Defining a memoized function to format the comment's creation date
    if (!data?.createdAt) {
      // Checking if the createdAt property exists in the data object
      return null; // Returning null if it doesn't exist
    }

    return formatDistanceToNowStrict(new Date(data.createdAt)); // Formatting the date using the date-fns library
  }, [data?.createdAt]); // Adding dependencies to the useMemo hook

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      {/* // Rendering a div with some styles */}
      <div className="flex flex-row items-start gap-3">
        {/* // Rendering a div with flexbox styles */}
        <Avatar userId={data.user.id} />
        {/* // Rendering the Avatar component with a userId prop */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser} // Adding a click event listener to the user's name
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
              {/* // Rendering the user's name */}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
              {/* // Rendering the user's username */}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
            {/* // Rendering the formatted creation date */}
          </div>
          <div className="text-white mt-1">{data.body}</div>
          {/* // Rendering the comment's body */}
        </div>
      </div>
    </div>
  );
};

export default CommentItem; // Exporting the CommentItem component as the default export
