// Import necessary modules
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// Define the props for the ImageUpload component
interface ImageUploadProps {
  onChange: (base64: string) => void; // Function to handle changes to the uploaded image
  label: string; // Label for the upload area
  value?: string; // The current value of the uploaded image
  disabled?: boolean; // Whether or not the upload area is disabled
}

// Define the ImageUpload component
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  // Set the initial state of the base64 image to the current value
  const [base64, setBase64] = useState(value);

  // Define a function to handle changes to the uploaded image
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  // Define a function to handle the drop of a file onto the upload area
  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  // Use the useDropzone hook to get the necessary props for the upload area
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1, // Only allow one file to be uploaded at a time
    onDrop: handleDrop, // Call the handleDrop function when a file is dropped
    disabled, // Set the disabled state of the upload area
    accept: {
      "image/jpeg": [], // Only allow JPEG images
      "image/png": [], // Only allow PNG images
    },
  });

  // Render the upload area
  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? ( // If an image has been uploaded, display it
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        // Otherwise, display the label
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

// Export the ImageUpload component
export default ImageUpload;
