import { db } from "@/lib/db";


export const getDirektoratBykode = async (kode: string) => {
    try {
        const direktorat = await db.direktorat.findUnique({
            where: {
                kode
            }
        })
        return direktorat;
    } catch {
        return null;
    }
}

export const getDirektoratById = async (id: string) => {
    try {
        const direktorat = await db.direktorat.findUnique({
            where: {
                id
            }
        })
        return direktorat;
    } catch {
        return null;
    }
}