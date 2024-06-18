import { db } from "@/lib/db";


export const getKategoriAssetBykode = async (kode: string) => {
    try {
        const kategoriAsset = await db.kategoriAsset.findUnique({
            where: {
                kode
            }
        })
        return kategoriAsset;
    } catch {
        return null;
    }
}

export const getKategoriAssetById = async (id: string) => {
    try {
        const kategoriAsset = await db.kategoriAsset.findUnique({
            where: {
                id
            }
        })
        return kategoriAsset;
    } catch {
        return null;
    }
}