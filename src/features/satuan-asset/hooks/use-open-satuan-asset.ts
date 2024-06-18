import { create } from 'zustand';

type OpenSatuanAssetState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useOpenSatuanAsset = create<OpenSatuanAssetState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false }),
}))