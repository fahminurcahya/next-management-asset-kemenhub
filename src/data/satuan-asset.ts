import { db } from "@/lib/db";



export const getSatuanAssetById = async (id: number) => {
    try {
        const satuanAsset = await db.satuanAsset.findUnique({
            where: {
                id
            }
        })
        return satuanAsset;
    } catch {
        return null;
    }
}