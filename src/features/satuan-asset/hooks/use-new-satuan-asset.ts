import { create } from 'zustand';

type NewSatuanAssetState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewSatuanAsset = create<NewSatuanAssetState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))