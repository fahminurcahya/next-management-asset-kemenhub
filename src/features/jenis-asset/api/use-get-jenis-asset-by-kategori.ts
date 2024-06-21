import { client } from "@/lib/hono";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetJenisAssetByKategori = (id?: string) => {
    const querClient = useQueryClient();

    const query = useQuery({
        enabled: !!id,
        queryKey: ["jenisAssetByKategori", { id }],
        queryFn: async () => {
            const response = await client.api["jenis-asset"][":id"]["kategori"].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch jenis asset");
            }

            const { data } = await response.json();
            return data;
        }
    })

    const invalidateJenisAssetQuery = () => {
        querClient.invalidateQueries({ queryKey: ["jenisAssetByKategori"] })
    };

    return {
        ...query,
        invalidateJenisAssetQuery,
    };
}
