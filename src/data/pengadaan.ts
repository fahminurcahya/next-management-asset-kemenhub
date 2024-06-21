import { db } from "@/lib/db";
import { generateFormattedNumbers } from "@/lib/utils";

async function getLastInsertedId(): Promise<number> {
    const lastRecord = await db.pengadaan.findFirst({
        orderBy: {
            id: 'desc',
        },
    });

    return lastRecord ? lastRecord.id : 1;
}

async function getNextId(): Promise<number> {
    const lastId = await getLastInsertedId();
    return lastId ? lastId + 1 : 1;
}

export async function generateNextCode(): Promise<string> {
    const nextId = await getNextId();
    const code = "PG" + generateFormattedNumbers(5, nextId)
    return code;
}

export const getPengadaanById = async (id: number) => {
    try {
        const pengadaan = await db.pengadaan.findUnique({
            where: {
                id
            }
        })
        return pengadaan;
    } catch {
        return null;
    }
}

export const getJenisPengadaan = async () => {
    try {
        const jenisPengadaan = await db.jenisPengadaan.findMany()
        return jenisPengadaan;
    } catch {
        return null;
    }
}


export const getSatuanAsset = async () => {
    try {
        const satuanAsset = await db.satuanAsset.findMany()
        return satuanAsset;
    } catch {
        return null;
    }
}