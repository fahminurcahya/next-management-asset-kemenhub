import { create } from 'zustand';

type NewAssetState = {
    direktoratId?: string;
    isOpen: boolean;
    onOpen: (id?: string) => void;
    onClose: () => void;
    onAddAsset: (value: any) => void;
    resetData: () => void;
    data: {
        nama: string;
        keterangan: string;
        satuanAssetId: string | number;
        qty: number;
        jenisAssetId: string;
        merk: string;
        spek: string;
        kondisi: "BAIK" | "RUSAK";
        kategoriAssetId: string;
        ruanganId?: string | undefined;
    } | undefined

}




export const useNewAsset = create<NewAssetState>((set) => ({
    direktoratId: undefined,
    isOpen: false,
    onOpen: (direktoratId?: string) => set({ isOpen: true, direktoratId }),
    onClose: () => set({ isOpen: false }),
    onAddAsset: (value) => { set({ data: value }) },
    data: undefined,
    resetData: () => set({ data: undefined }),
}))