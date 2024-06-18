import { create } from 'zustand';

type NewKategoriAssetState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewKategoriAsset = create<NewKategoriAssetState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))