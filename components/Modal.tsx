import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean; // boolean flag to determine if the modal is open or not
  onClose: () => void; // function to close the modal
  onSubmit: () => void; // function to submit the modal form
  title?: string; // title of the modal
  body?: React.ReactElement; // body of the modal
  footer?: React.ReactElement; // footer of the modal
  actionLabel: string; // label for the action button
  disabled?: boolean; // boolean flag to determine if the action button is disabled or not
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      // if the action button is disabled, do not close the modal
      return;
    }

    onClose(); // close the modal
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      // if the action button is disabled, do not submit the modal form
      return;
    }

    onSubmit(); // submit the modal form
  }, [disabled, onSubmit]);

  if (!isOpen) {
    // if the modal is not open, do not render anything
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
            <div className="flex items-center justify-between p-10 rounded-t">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              {/* // render the modal title */}
              <button
                className="p-1 ml-auto border-0 text-white hover:opacity-70 transition"
                onClick={handleClose} // call the handleClose function when the close button is clicked
              >
                <AiOutlineClose color="white" size={20} />
              </button>
            </div>
            <div className="relative p-10 flex-auto">{body}</div>
            {/* // render the modal body */}
            <div className="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled} // set the disabled prop of the action button
                label={actionLabel} // set the label of the action button
                secondary
                fullWidth
                large
                onClick={handleSubmit} // call the handleSubmit function when the action button is clicked
              />
              {footer}
              {/* // render the modal footer */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
