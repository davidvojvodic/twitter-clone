import { create } from "zustand";

// Define the interface for the store
interface EditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create the store using Zustand's create function
const useEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// Export the store
export default useEditModal;
