// Import the create function from the zustand library
import { create } from "zustand";

// Define the interface for the RegisterModalStore
interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create a custom hook called useRegisterModal using the create function from zustand
const useRegisterModal = create<RegisterModalStore>((set) => ({
  // Set the initial state of isOpen to false
  isOpen: false,
  // Define the onOpen function to set isOpen to true
  onOpen: () => set({ isOpen: true }),
  // Define the onClose function to set isOpen to false
  onClose: () => set({ isOpen: false }),
}));

// Export the useRegisterModal hook
export default useRegisterModal;
