import { db } from "@/lib/db";


export const getSumAssetByRuanganId = async (id: string, kondisi: string) => {
    try {
        const groupedAssets = await db.assets.groupBy({
            by: ['jenisAssetId'],
            where: {
                ruanganId: id,
            },
            _count: {
                _all: true,
            },
        });
        const results = await Promise.all(
            groupedAssets.map(async group => {
                const countBaik = await db.assets.count({
                    where: {
                        ruanganId: id,
                        jenisAssetId: group.jenisAssetId,
                        kondisi: 'BAIK',
                    },
                });

                const countRusak = await db.assets.count({
                    where: {
                        ruanganId: id,
                        jenisAssetId: group.jenisAssetId,
                        kondisi: 'RUSAK',
                    },
                });

                return {
                    jenisAssetId: group.jenisAssetId,
                    countBaik,
                    countRusak,
                };
            })
        );

        return results;
    } catch {
        return null;
    }
}

