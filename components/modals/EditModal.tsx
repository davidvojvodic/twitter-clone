import useCurrentUser from "@/hooks/useCurrentUser"; // import custom hook to fetch current user data
import useEditModal from "@/hooks/useEditModal"; // import custom hook to handle edit modal state
import useUser from "@/hooks/useUser"; // import custom hook to fetch user data
import React, { useState, useEffect, useCallback } from "react"; // import necessary React components
import { toast } from "react-hot-toast"; // import toast notification library
import axios from "axios"; // import axios library for HTTP requests
import Modal from "../Modal"; // import custom modal component
import Input from "../Input"; // import custom input component
import ImageUpload from "../ImageUpload"; // import custom image upload component

const EditModal = () => {
  const { data: currentUser } = useCurrentUser(); // fetch current user data using custom hook
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id); // fetch user data using custom hook and pass current user ID
  const editModal = useEditModal(); // initialize edit modal state using custom hook

  const [profileImage, setProfileImage] = useState(""); // initialize state for profile image
  const [coverImage, setCoverImage] = useState(""); // initialize state for cover image
  const [name, setName] = useState(""); // initialize state for name
  const [username, setUsername] = useState(""); // initialize state for username
  const [bio, setBio] = useState(""); // initialize state for bio

  useEffect(() => {
    // set initial state values based on current user data
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ]);

  const [isLoading, setIsLoading] = useState(false); // initialize loading state

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true); // set loading state to true
      await axios.patch("/api/edit", {
        // make PATCH request to edit user data
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateFetchedUser(); // refetch user data using custom hook

      toast.success("Updated"); // show success toast notification
      editModal.onClose(); // close edit modal
    } catch (error) {
      console.log(error); // log error to console
      toast.error("Something went wrong"); // show error toast notification
    } finally {
      setIsLoading(false); // set loading state to false
    }
  }, [
    bio,
    name,
    username,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
