import { create } from "zustand";

// Define the interface for the store
interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create the store using Zustand's create function
const useLoginModal = create<LoginModalStore>((set) => ({
  // Set the initial state of the store
  isOpen: false,
  // Define the onOpen function to update the isOpen state to true
  onOpen: () => set({ isOpen: true }),
  // Define the onClose function to update the isOpen state to false
  onClose: () => set({ isOpen: false }),
}));

// Export the useLoginModal hook
export default useLoginModal;
