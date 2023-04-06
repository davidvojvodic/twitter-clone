import useCurrentUser from "@/hooks/useCurrentUser"; // import custom hook to get current user data
import useLoginModal from "@/hooks/useLoginModal"; // import custom hook to handle login modal
import usePosts from "@/hooks/usePosts"; // import custom hook to get posts data
import useRegisterModal from "@/hooks/useRegisterModal"; // import custom hook to handle register modal
import React, { useState, useCallback } from "react"; // import necessary dependencies
import toast from "react-hot-toast"; // import toast library for notifications
import axios from "axios"; // import axios library for making HTTP requests
import Button from "./Button"; // import custom Button component
import Avatar from "./Avatar"; // import custom Avatar component
import usePost from "@/hooks/usePost"; // import custom hook to get a single post data

interface FormProps {
  placeholder: string; // define placeholder prop for textarea
  isComment?: boolean; // define isComment prop to determine if form is for commenting on a post
  postId?: string; // define postId prop to get the ID of the post being commented on
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal(); // initialize register modal hook
  const loginModal = useLoginModal(); // initialize login modal hook

  const { data: currentUser } = useCurrentUser(); // get current user data using custom hook
  const { mutate: mutatePosts } = usePosts(); // get posts data using custom hook
  const { mutate: mutatePost } = usePost(postId as string); // get a single post data using custom hook

  const [body, setBody] = useState(""); // initialize state for form body
  const [isLoading, setIsLoading] = useState(false); // initialize state for loading status

  const onSubmit = useCallback(async () => {
    // define function to handle form submission
    try {
      setIsLoading(true); // set loading status to true

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts"; // determine URL based on whether form is for commenting or posting

      await axios.post(url, { body }); // make HTTP request to create post or comment
      toast.success("Tweet Created"); // show success notification

      setBody(""); // reset form body
      mutatePosts(); // update posts data using custom hook
      mutatePost(); // update single post data using custom hook
    } catch (error) {
      console.log(error); // log any errors
      toast.error("Something went wrong"); // show error notification
    } finally {
      setIsLoading(false); // set loading status to false
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? ( // if user is logged in, show form
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
            {/* // show user avatar */}
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading} // disable textarea while form is submitting
              onChange={(e) => setBody(e.target.value)} // update form body as user types
              value={body} // set form body value
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white "
              placeholder={placeholder} // set placeholder text
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading} onClick={onSubmit} label="Tweet" />
              {/* // show submit button */}
            </div>
          </div>
        </div>
      ) : (
        // if user is not logged in, show login/register options
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            {/* // show login button */}
            <Button label="Register" onClick={registerModal.onOpen} secondary />
            {/* // show register button */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
