import { create } from 'zustand';

type NewDirektoratState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewDirektorat = create<NewDirektoratState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))