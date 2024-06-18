import { db } from "@/lib/db";


export const getJenisAssetBykode = async (kode: string) => {
    try {
        const jenisAsset = await db.jenisAsset.findUnique({
            where: {
                kode
            }
        })
        return jenisAsset;
    } catch {
        return null;
    }
}

export const getJenisAssetById = async (id: string) => {
    try {
        const jenisAsset = await db.jenisAsset.findUnique({
            where: {
                id
            }
        })
        return jenisAsset;
    } catch {
        return null;
    }
}