import { create } from 'zustand';

type NewJenisAssetState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewJenisAsset = create<NewJenisAssetState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))