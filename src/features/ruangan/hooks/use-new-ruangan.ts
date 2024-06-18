import { create } from 'zustand';

type NewRuanganState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewRuangan = create<NewRuanganState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))