import { db } from "@/lib/db";


export const getRuanganByKode = async (kode: string) => {
    try {
        const ruangan = await db.ruangan.findUnique({
            where: {
                kode
            }
        })
        return ruangan;
    } catch {
        return null;
    }
}

export const getRuanganById = async (id: string) => {
    try {
        const ruangan = await db.ruangan.findUnique({
            where: {
                id
            }
        })
        return ruangan;
    } catch {
        return null;
    }
}

export const getRuanganByDirektoratId = async (id: string) => {
    try {
        const ruangan = await db.ruangan.findMany({
            where: {
                direktoratId: id
            }
        })
        return ruangan;
    } catch {
        return null;
    }
}